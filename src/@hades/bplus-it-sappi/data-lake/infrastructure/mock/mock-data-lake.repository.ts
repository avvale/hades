import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { 
    DataLakeId, 
    DataLakeData, 
    DataLakeCreatedAt, 
    DataLakeUpdatedAt, 
    DataLakeDeletedAt
    
} from '@hades/bplus-it-sappi/data-lake/domain/value-objects';
import { BplusItSappiDataLake } from './../../domain/data-lake.aggregate';
import { dataLakes } from './../seeds/data-lake.seed';

@Injectable()
export class MockDataLakeRepository implements IDataLakeRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'BplusItSappiDataLake';
    public collectionSource: BplusItSappiDataLake[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(dataLake => dataLake.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>dataLakes)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(BplusItSappiDataLake.register(
                    new DataLakeId(itemCollection.id),
                    new DataLakeData(itemCollection.data),
                    new DataLakeCreatedAt(itemCollection.createdAt),
                    new DataLakeUpdatedAt(itemCollection.updatedAt),
                    new DataLakeDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<BplusItSappiDataLake>>
    {
        let offset  = 0;
        let limit   = this.collectionSource.length;
        for (const queryStatement of queryStatements)
        {
            if (queryStatement.command === Command.OFFSET)  offset = queryStatement.value;
            if (queryStatement.command === Command.LIMIT)   limit = queryStatement.value;
        }
        return { 
            total   : this.collectionSource.length, 
            count   : this.collectionSource.length, 
            rows    : this.collectionSource.slice(offset,limit)
        };
    }
    
    async create(dataLake: BplusItSappiDataLake): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === dataLake.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${dataLake.id.value} already exist in database`);

        // create deletedAt null 
        dataLake.deletedAt = new DataLakeDeletedAt(null);

        this.collectionSource.push(dataLake);
    }

    async insert(dataLake: BplusItSappiDataLake[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiDataLake> 
    {
        const response = this.collectionSource.filter(aggregate => {
            let result = true;
            for (const queryStatement of queryStatements)
            {
                result = aggregate[queryStatement.column].value === queryStatement.value
            }
            return result;
        });

        const aggregate = response[0];

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async findById(id: UuidValueObject): Promise<BplusItSappiDataLake>
    {
        const aggregate = this.collectionSource.find(dataLake => dataLake.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiDataLake[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: BplusItSappiDataLake): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(dataLake => {
            if (dataLake.id.value === aggregate.id.value) return aggregate;
            return dataLake;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(dataLake => dataLake.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}