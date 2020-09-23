import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { FindOptions } from 'sequelize/types';
import { Model } from 'sequelize-typescript';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IMapper } from '@hades/shared/domain/lib/mapper';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { AggregateBase } from '@hades/shared/domain/lib/aggregate-base';
import { Pagination } from '@hades/shared/domain/lib/pagination';
const cleanDeep = require('clean-deep');

export abstract class SequelizeRepository<Aggregate extends AggregateBase, ModelClass>
{
    public readonly repository: any;
    public readonly criteria: ICriteria;
    public readonly aggregateName: string;
    public readonly mapper: IMapper;

    async paginate(queryStatement?: QueryStatement, constraint?: QueryStatement): Promise<Pagination<Aggregate>>
    {
        // get count total records from sql service library
        const total = await this.repository.count(
            this.criteria.implements(constraint)
        );

        // get records
        const { count, rows } = await this.repository.findAndCountAll(
            this.criteria.implements(
                this.composeStatementPaginateHook(queryStatement)
            )
        );

        return { 
            total, 
            count, 
            rows: <Aggregate[]>this.mapper.mapModelsToAggregates(rows) // map values to create value objects
        };
    }

    // hook to add findOptions
    composeStatementPaginateHook(queryStatement?: QueryStatement): QueryStatement { return queryStatement; }

    async find(queryStatement?: QueryStatement): Promise<Aggregate> 
    {
        const model = await this.repository.findOne(
            this.criteria.implements(
                this.composeStatementFindHook(queryStatement)
            )
        );

        if (!model) throw new NotFoundException(`${this.aggregateName} not found`);

        // map value to create value objects
        return <Aggregate>this.mapper.mapModelToAggregate(model);
    }

    // hook to add findOptions
    composeStatementFindHook(queryStatement?: QueryStatement): QueryStatement { return queryStatement; }

    async findById(id: UuidValueObject): Promise<Aggregate>
    {
        // value is already mapped
        const model = await this.repository.findOne(
            this.criteria.implements(
                this.composeStatementFindByIdHook({ where: { id: id.value }})
            )
        );

        if (!model) throw new NotFoundException(`${this.aggregateName} with id: ${id.value}, not found`);

        return <Aggregate>this.mapper.mapModelToAggregate(model);
    }

    // hook to add findOptions
    composeStatementFindByIdHook(findOptions: FindOptions): FindOptions { return findOptions; }

    // get multiple records
    async get(queryStatement?: QueryStatement): Promise<Aggregate[]> 
    {
        const models = await this.repository.findAll(
            this.criteria.implements(
                this.composeStatementGetHook(queryStatement)
            )
        );

        // map values to create value objects
        return <Aggregate[]>this.mapper.mapModelsToAggregates(models);
    }

    // hook to add findOptions
    composeStatementGetHook(queryStatement?: QueryStatement): QueryStatement { return queryStatement; }

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

    async update(aggregate: Aggregate): Promise<void> 
    { 
        // check that model exist
        const modelInDB = await this.repository.findOne(
            {
                where: {
                    id: aggregate['id']['value']
                }
            }
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

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        const model = await this.repository.findOne(
            {
                where: {
                    id: id.value
                }
            }
        );

        if (!model) throw new NotFoundException(`${this.aggregateName} not found`);

        await model.destroy();
    }

    async delete(queryStatement?: QueryStatement): Promise<void> 
    {
        if (!queryStatement || !queryStatement.where) throw new BadRequestException(`To delete multiple records, you must define a where statement`);

        // check that aggregate exist
        await this.repository.destroy(
            this.criteria.implements(queryStatement)
        );
    }
}