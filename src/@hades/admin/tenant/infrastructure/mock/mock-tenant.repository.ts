import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { ITenantRepository } from './../../domain/tenant.repository';
import { 
    TenantId, 
    TenantName, 
    TenantCode, 
    TenantLogo, 
    TenantIsActive, 
    TenantData, 
    TenantCreatedAt, 
    TenantUpdatedAt, 
    TenantDeletedAt
    
} from '@hades/admin/tenant/domain/value-objects';
import { AdminTenant } from './../../domain/tenant.aggregate';
import { tenants } from './../seeds/tenant.seed';

@Injectable()
export class MockTenantRepository implements ITenantRepository
{
    public readonly repository: any;
    public readonly entityName: string = 'AdminTenant';
    public collectionSource: AdminTenant[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(tenant => tenant.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>tenants)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(AdminTenant.register(
                    new TenantId(itemCollection.id),
                    new TenantName(itemCollection.name),
                    new TenantCode(itemCollection.code),
                    new TenantLogo(itemCollection.logo),
                    new TenantIsActive(itemCollection.isActive),
                    new TenantData(itemCollection.data),
                    new TenantCreatedAt(itemCollection.createdAt),
                    new TenantUpdatedAt(itemCollection.updatedAt),
                    new TenantDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<AdminTenant>>
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
    
    async create(tenant: AdminTenant): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === tenant.id.value)) throw new ConflictException(`Error to create ${this.entityName}, the id ${tenant.id.value} already exist in database`);

        // create deletedAt null 
        tenant.deletedAt = new TenantDeletedAt(null);

        this.collectionSource.push(tenant);
    }

    async insert(tenant: AdminTenant[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<AdminTenant> 
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

    async findById(id: UuidValueObject): Promise<AdminTenant>
    {
        const entity = this.collectionSource.find(tenant => tenant.id.value === id.value);

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        return entity;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<AdminTenant[]> 
    {
        return this.collectionSource;
    }

    async update(entity: AdminTenant): Promise<void> 
    { 
        // check that entity exist
        await this.findById(entity.id);

        this.collectionSource.map(tenant => {
            if (tenant.id.value === entity.id.value) return entity;
            return tenant;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that entity exist
        await this.findById(id);

        this.collectionSource.filter(tenant => tenant.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}