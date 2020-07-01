import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IPermissionRepository } from './../../domain/permission.repository';
import { 
    PermissionId, 
    PermissionModuleId, 
    PermissionName, 
    PermissionCreatedAt, 
    PermissionUpdatedAt, 
    PermissionDeletedAt
    
} from '@hades/admin/permission/domain/value-objects';
import { AdminPermission } from './../../domain/permission.entity';
import { permissions } from './../seeds/permission.seed';

@Injectable()
export class MockPermissionRepository implements IPermissionRepository
{
    public readonly repository: any;
    public readonly entityName: string = 'AdminPermission';
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
                    new PermissionModuleId(itemCollection.moduleId),
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
        if (this.collectionSource.find(item => item.id.value === permission.id.value)) throw new ConflictException(`Error to create ${this.entityName}, the id ${permission.id.value} already exist in database`);

        // create deletedAt null 
        permission.deletedAt = new PermissionDeletedAt(null);

        this.collectionSource.push(permission);
    }

    async insert(permission: AdminPermission[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<AdminPermission> 
    {
        const response = this.collectionSource.filter(entity => {
            let result = true;
            for (const queryStatement of queryStatements)
            {
                result = entity[queryStatement.column].value === queryStatement.value
            }
            return result;
        });

        const entity = response[0];

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        return entity;
    }

    async findById(id: UuidValueObject): Promise<AdminPermission>
    {
        const entity = this.collectionSource.find(permission => permission.id.value === id.value);

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        return entity;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<AdminPermission[]> 
    {
        return this.collectionSource;
    }

    async update(entity: AdminPermission): Promise<void> 
    { 
        // check that entity exist
        await this.findById(entity.id);

        this.collectionSource.map(permission => {
            if (permission.id.value === entity.id.value) return entity;
            return permission;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that entity exist
        await this.findById(id);

        this.collectionSource.filter(permission => permission.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}