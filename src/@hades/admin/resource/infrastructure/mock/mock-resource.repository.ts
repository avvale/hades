import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IResourceRepository } from './../../domain/resource.repository';
import { 
    ResourceId, 
    ResourceBoundedContextId, 
    ResourceName, 
    ResourceHasCustomFields, 
    ResourceHasAttachments, 
    ResourceCreatedAt, 
    ResourceUpdatedAt, 
    ResourceDeletedAt
    
} from '@hades/admin/resource/domain/value-objects';
import { AdminResource } from './../../domain/resource.aggregate';
import { resources } from './../seeds/resource.seed';

@Injectable()
export class MockResourceRepository implements IResourceRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AdminResource';
    public collectionSource: AdminResource[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(resource => resource.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>resources)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(AdminResource.register(
                    new ResourceId(itemCollection.id),
                    new ResourceBoundedContextId(itemCollection.boundedContextId),
                    new ResourceName(itemCollection.name),
                    new ResourceHasCustomFields(itemCollection.hasCustomFields),
                    new ResourceHasAttachments(itemCollection.hasAttachments),
                    new ResourceCreatedAt(itemCollection.createdAt),
                    new ResourceUpdatedAt(itemCollection.updatedAt),
                    new ResourceDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<AdminResource>>
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
    
    async create(resource: AdminResource): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === resource.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${resource.id.value} already exist in database`);

        // create deletedAt null 
        resource.deletedAt = new ResourceDeletedAt(null);

        this.collectionSource.push(resource);
    }

    async insert(resource: AdminResource[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<AdminResource> 
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

    async findById(id: UuidValueObject): Promise<AdminResource>
    {
        const aggregate = this.collectionSource.find(resource => resource.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<AdminResource[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: AdminResource): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(resource => {
            if (resource.id.value === aggregate.id.value) return aggregate;
            return resource;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(resource => resource.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}