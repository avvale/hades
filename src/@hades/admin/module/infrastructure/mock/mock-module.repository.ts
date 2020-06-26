import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Uuid } from '@hades/shared/domain/value-objects/uuid';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IModuleRepository } from './../../domain/module.repository';
import { 
    ModuleId, 
    ModuleName, 
    ModuleRoot, 
    ModuleSort, 
    ModuleIsActive, 
    ModuleCreatedAt, 
    ModuleUpdatedAt, 
    ModuleDeletedAt
    
} from '@hades/admin/module/domain/value-objects';
import { AdminModule } from './../../domain/module.entity';
import { modules } from './../seeds/module.seed';

@Injectable()
export class MockModuleRepository implements IModuleRepository
{
    public readonly repository: any;
    public readonly entityName: string = 'AdminModule';
    public collectionSource: AdminModule[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(module => module.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>modules)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(AdminModule.register(
                    new ModuleId(itemCollection.id),
                    new ModuleName(itemCollection.name),
                    new ModuleRoot(itemCollection.root),
                    new ModuleSort(itemCollection.sort),
                    new ModuleIsActive(itemCollection.isActive),
                    new ModuleCreatedAt(itemCollection.createdAt),
                    new ModuleUpdatedAt(itemCollection.updatedAt),
                    new ModuleDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<AdminModule>>
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
    
    async create(module: AdminModule): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === module.id.value)) throw new ConflictException(`Error to create ${this.entityName}, the id ${module.id.value} already exist in database`);

        // create deletedAt null 
        module.deletedAt = new ModuleDeletedAt(null);

        this.collectionSource.push(module);
    }

    async insert(module: AdminModule[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<AdminModule> 
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

    async findById(id: Uuid): Promise<AdminModule>
    {
        const entity = this.collectionSource.find(module => module.id.value === id.value);

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        return entity;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<AdminModule[]> 
    {
        return this.collectionSource;
    }

    async update(entity: AdminModule): Promise<void> 
    { 
        // check that entity exist
        await this.findById(entity.id);

        this.collectionSource.map(module => {
            if (module.id.value === entity.id.value) return entity;
            return module;
        });
    }

    async deleteById(id: Uuid): Promise<void> 
    {
        // check that entity exist
        await this.findById(id);

        this.collectionSource.filter(module => module.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}