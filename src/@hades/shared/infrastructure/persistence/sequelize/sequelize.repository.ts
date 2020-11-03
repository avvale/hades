import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Model } from 'sequelize-typescript';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { QueryMetadata, HookResponse } from '@hades/shared/domain/lib/hades.types';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IMapper } from '@hades/shared/domain/lib/mapper';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { AggregateBase } from '@hades/shared/domain/lib/aggregate-base';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import * as _ from 'lodash';
const cleanDeep = require('clean-deep');

export abstract class SequelizeRepository<Aggregate extends AggregateBase, ModelClass>
{
    public readonly repository: any;
    public readonly criteria: ICriteria;
    public readonly aggregateName: string;
    public readonly mapper: IMapper;
    public readonly timezoneColumns: string[];

    async paginate(queryStatement?: QueryStatement, constraint?: QueryStatement, queryMetadata?: QueryMetadata): Promise<Pagination<Aggregate>>
    {
        // manage hook count paginate
        const hookCountResponse = this.countStatementPaginateHook(constraint, Object.assign({}, {timezoneColumns: this.timezoneColumns}, queryMetadata));

        // get count total records from sql service library
        const total = await this.repository.count(
            this.criteria.implements(hookCountResponse.queryStatement, hookCountResponse.queryMetadata)
        );

        // manage hook compose paginate
        const hookComposeResponse = this.composeStatementPaginateHook(_.merge(queryStatement, constraint), Object.assign({}, {timezoneColumns: this.timezoneColumns}, queryMetadata));

        // get records
        const { count, rows } = await this.repository.findAndCountAll(
            this.criteria.implements(hookComposeResponse.queryStatement, hookComposeResponse.queryMetadata)
        );

        return {
            total,
            count,
            rows: <Aggregate[]>this.mapper.mapModelsToAggregates(rows, queryMetadata) // map values to create value objects
        };
    }

    // hook to add findOptions
    countStatementPaginateHook(queryStatement?: QueryStatement, queryMetadata?: QueryMetadata): HookResponse { return { queryStatement, queryMetadata }; }

    // hook to add findOptions
    composeStatementPaginateHook(queryStatement?: QueryStatement, queryMetadata?: QueryMetadata): HookResponse { return { queryStatement, queryMetadata }; }

    async find(query?: QueryStatement, constraint?: QueryStatement, queryMetadata?: QueryMetadata): Promise<Aggregate>
    {
        // manage hook
        const hookResponse = this.composeStatementFindHook(_.merge(query, constraint), Object.assign({}, {timezoneColumns: this.timezoneColumns}, queryMetadata));

        const model = await this.repository.findOne(
            this.criteria.implements(hookResponse.queryStatement, hookResponse.queryMetadata)
        );

        if (!model) throw new NotFoundException(`${this.aggregateName} not found`);

        // map value to create value objects
        return <Aggregate>this.mapper.mapModelToAggregate(model, queryMetadata);
    }

    // hook to add findOptions
    composeStatementFindHook(queryStatement?: QueryStatement, queryMetadata?: QueryMetadata): HookResponse { return { queryStatement, queryMetadata }; }

    async findById(id: UuidValueObject, constraint?: QueryStatement, queryMetadata?: QueryMetadata): Promise<Aggregate>
    {
        // manage hook
        const hookResponse = this.composeStatementFindByIdHook(
            _.merge({
                where: {
                    id: id.value
                }
            }, constraint),
            Object.assign({}, {timezoneColumns: this.timezoneColumns}, queryMetadata)
        );

        // value is already mapped
        const model = await this.repository.findOne(
            this.criteria.implements(hookResponse.queryStatement, hookResponse.queryMetadata)
        );

        if (!model) throw new NotFoundException(`${this.aggregateName} with id: ${id.value}, not found`);

        return <Aggregate>this.mapper.mapModelToAggregate(model, queryMetadata);
    }

    // hook to add findOptions
    composeStatementFindByIdHook(queryStatement: QueryStatement, queryMetadata?: QueryMetadata): HookResponse { return { queryStatement, queryMetadata }; }

    // get multiple records
    async get(queryStatement?: QueryStatement, constraint?: QueryStatement, queryMetadata?: QueryMetadata): Promise<Aggregate[]>
    {
        // manage hook
        const hookResponse = this.composeStatementGetHook(_.merge(queryStatement, constraint), Object.assign({}, {timezoneColumns: this.timezoneColumns}, queryMetadata));

        const models = await this.repository.findAll(
            this.criteria.implements(hookResponse.queryStatement, hookResponse.queryMetadata)
        );

        // map values to create value objects
        return <Aggregate[]>this.mapper.mapModelsToAggregates(models, queryMetadata);
    }

    // hook to add findOptions
    composeStatementGetHook(queryStatement?: QueryStatement, queryMetadata?: QueryMetadata): HookResponse { return { queryStatement, queryMetadata }; }

    // ******************
    // ** side effects **
    // ******************

    async create(aggregate: Aggregate): Promise<void>
    {
        // check if exist object in database, if allow save aggregate with the same uuid, update this aggregate in database instead of create it
        const modelInDB = await this.repository.findOne(
            {
                where: {
                    id: aggregate['id']['value']
                }
            }
        );

        if (modelInDB) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${aggregate['id']['value']} already exist in database`);

        try
        {
            const model = await this.repository.create(aggregate.toDTO());

            this.createdAggregateHook(aggregate, model);
        }
        catch (error)
        {
            throw new ConflictException(error.message);
        }
    }

    // hook called after create aggregate
    async createdAggregateHook(aggregate: Aggregate, model: Model<ModelClass>) {}

    async insert(aggregates: Aggregate[], options: object = {}): Promise<void>
    {
        await this.repository.bulkCreate(aggregates.map(item => item.toDTO()), options);

        this.insertedAggregateHook(aggregates);
    }

    // hook called after insert aggregates
    async insertedAggregateHook(aggregates: Aggregate[]) {}

    async update(aggregate: Aggregate, constraint?: QueryStatement, queryMetadata?: QueryMetadata): Promise<void>
    {
        // check that model exist
        const modelInDB = await this.repository.findOne(
            this.criteria.implements(
                _.merge({
                    where: {
                        id: aggregate['id']['value']
                    }
                }, constraint),
                queryMetadata
            )
        );

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        // clean undefined fields
        const objectLiteral = cleanDeep(aggregate.toDTO(), {
            nullValues: false,
            emptyStrings: false,
            emptyObjects: false,
            emptyArrays: false
        })

        const model = await modelInDB.update(objectLiteral);

        this.updatedAggregateHook(aggregate, model);
    }

    // hook called after update aggregate
    async updatedAggregateHook(aggregate: Aggregate, model: Model<ModelClass>) {}

    async deleteById(id: UuidValueObject, constraint?: QueryStatement): Promise<void>
    {
        // check that aggregate exist
        const model = await this.repository.findOne(
            _.merge(
                {
                    where: {
                        id: id.value
                    }
                }, constraint
            )
        );

        if (!model) throw new NotFoundException(`${this.aggregateName} not found`);

        await model.destroy();
    }

    async delete(query?: QueryStatement, constraint?: QueryStatement, queryMetadata?: QueryMetadata): Promise<void>
    {
        if (!query || !query.where) throw new BadRequestException(`To delete multiple records, you must define a where statement`);

        // check that aggregate exist
        await this.repository.destroy(
            this.criteria.implements(_.merge(query, constraint), queryMetadata)
        );
    }
}