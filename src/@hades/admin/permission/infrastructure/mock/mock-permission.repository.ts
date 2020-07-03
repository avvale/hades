import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IPermissionRepository } from './../../domain/permission.repository';
import { 
    PermissionId, 
    PermissionBoundedContextId, 
    PermissionName, 
    PermissionCreatedAt, 
    PermissionUpdatedAt, 
    PermissionDeletedAt
    
} from '@hades/admin/permission/domain/value-objects';
import { AdminPermission } from './../../domain/permission.aggregate';
import { permissions } from './../seeds/permission.seed';

@Injectable()
export class MockPermissionRepository implements IPermissionRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AdminPermission';
    public collectionSource: AdminPermission[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(permission => permission.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>permissions)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(AdminPermission.register(
                    new PermissionId(itemCollection.id),
                    new PermissionBoundedContextId(itemCollection.boundedContextId),
                    new PermissionName(itemCollection.name),
                    new PermissionCreatedAt(itemCollection.createdAt),
                    new PermissionUpdatedAt(itemCollection.updatedAt),
                    new PermissionDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<AdminPermission>>
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
    
    async create(permission: AdminPermission): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === permission.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${permission.id.value} already exist in database`);

        // create deletedAt null 
        permission.deletedAt = new PermissionDeletedAt(null);

        this.collectionSource.push(permission);
    }

    async insert(permission: AdminPermission[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<AdminPermission> 
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

    async findById(id: UuidValueObject): Promise<AdminPermission>
    {
        const aggregate = this.collectionSource.find(permission => permission.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<AdminPermission[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: AdminPermission): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(permission => {
            if (permission.id.value === aggregate.id.value) return aggregate;
            return permission;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(permission => permission.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}