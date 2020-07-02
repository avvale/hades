import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IBoundedContextRepository } from './../../domain/bounded-context.repository';
import { 
    BoundedContextId, 
    BoundedContextName, 
    BoundedContextRoot, 
    BoundedContextSort, 
    BoundedContextIsActive, 
    BoundedContextCreatedAt, 
    BoundedContextUpdatedAt, 
    BoundedContextDeletedAt
    
} from '@hades/admin/bounded-context/domain/value-objects';
import { AdminBoundedContext } from './../../domain/bounded-context.aggregate';
import { boundedContexts } from './../seeds/bounded-context.seed';

@Injectable()
export class MockBoundedContextRepository implements IBoundedContextRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AdminBoundedContext';
    public collectionSource: AdminBoundedContext[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(boundedContext => boundedContext.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>boundedContexts)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(AdminBoundedContext.register(
                    new BoundedContextId(itemCollection.id),
                    new BoundedContextName(itemCollection.name),
                    new BoundedContextRoot(itemCollection.root),
                    new BoundedContextSort(itemCollection.sort),
                    new BoundedContextIsActive(itemCollection.isActive),
                    new BoundedContextCreatedAt(itemCollection.createdAt),
                    new BoundedContextUpdatedAt(itemCollection.updatedAt),
                    new BoundedContextDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<AdminBoundedContext>>
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
    
    async create(boundedContext: AdminBoundedContext): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === boundedContext.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${boundedContext.id.value} already exist in database`);

        // create deletedAt null 
        boundedContext.deletedAt = new BoundedContextDeletedAt(null);

        this.collectionSource.push(boundedContext);
    }

    async insert(boundedContext: AdminBoundedContext[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<AdminBoundedContext> 
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

    async findById(id: UuidValueObject): Promise<AdminBoundedContext>
    {
        const aggregate = this.collectionSource.find(boundedContext => boundedContext.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<AdminBoundedContext[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: AdminBoundedContext): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(boundedContext => {
            if (boundedContext.id.value === aggregate.id.value) return aggregate;
            return boundedContext;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(boundedContext => boundedContext.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}