import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { ISystemRepository } from './../../domain/system.repository';
import { 
    SystemId, 
    SystemTenantId, 
    SystemName, 
    SystemTenantCode, 
    SystemEnvironment, 
    SystemVersion, 
    SystemIsActive, 
    SystemCancelledAt, 
    SystemCreatedAt, 
    SystemUpdatedAt, 
    SystemDeletedAt
    
} from '@hades/bplus-it-sappi/system/domain/value-objects';
import { BplusItSappiSystem } from './../../domain/system.aggregate';
import { systems } from './../seeds/system.seed';

@Injectable()
export class MockSystemRepository implements ISystemRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'BplusItSappiSystem';
    public collectionSource: BplusItSappiSystem[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(system => system.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>systems)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(BplusItSappiSystem.register(
                    new SystemId(itemCollection.id),
                    new SystemTenantId(itemCollection.tenantId),
                    new SystemName(itemCollection.name),
                    new SystemTenantCode(itemCollection.tenantCode),
                    new SystemEnvironment(itemCollection.environment),
                    new SystemVersion(itemCollection.version),
                    new SystemIsActive(itemCollection.isActive),
                    new SystemCancelledAt(itemCollection.cancelledAt),
                    new SystemCreatedAt(itemCollection.createdAt),
                    new SystemUpdatedAt(itemCollection.updatedAt),
                    new SystemDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<BplusItSappiSystem>>
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
    
    async create(system: BplusItSappiSystem): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === system.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${system.id.value} already exist in database`);

        // create deletedAt null 
        system.deletedAt = new SystemDeletedAt(null);

        this.collectionSource.push(system);
    }

    async insert(system: BplusItSappiSystem[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiSystem> 
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

    async findById(id: UuidValueObject): Promise<BplusItSappiSystem>
    {
        const aggregate = this.collectionSource.find(system => system.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiSystem[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: BplusItSappiSystem): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(system => {
            if (system.id.value === aggregate.id.value) return aggregate;
            return system;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(system => system.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}