import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IModuleRepository } from './../../domain/module.repository';
import { 
    ModuleId, 
    ModuleTenantId, 
    ModuleTenantCode, 
    ModuleSystemId, 
    ModuleSystemName, 
    ModuleChannelId, 
    ModuleChannelParty, 
    ModuleChannelComponent, 
    ModuleChannelName, 
    ModuleFlowHash, 
    ModuleFlowParty, 
    ModuleFlowComponent, 
    ModuleFlowInterfaceName, 
    ModuleFlowInterfaceNamespace, 
    ModuleVersion, 
    ModuleParameterGroup, 
    ModuleName, 
    ModuleParameterName, 
    ModuleParameterValue, 
    ModuleCreatedAt, 
    ModuleUpdatedAt, 
    ModuleDeletedAt
    
} from '@hades/bplus-it-sappi/module/domain/value-objects';
import { BplusItSappiModule } from './../../domain/module.aggregate';
import { modules } from './../seeds/module.seed';

@Injectable()
export class MockModuleRepository implements IModuleRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'BplusItSappiModule';
    public collectionSource: BplusItSappiModule[];
    
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
            
            this.collectionSource.push(BplusItSappiModule.register(
                    new ModuleId(itemCollection.id),
                    new ModuleTenantId(itemCollection.tenantId),
                    new ModuleTenantCode(itemCollection.tenantCode),
                    new ModuleSystemId(itemCollection.systemId),
                    new ModuleSystemName(itemCollection.systemName),
                    new ModuleChannelId(itemCollection.channelId),
                    new ModuleChannelParty(itemCollection.channelParty),
                    new ModuleChannelComponent(itemCollection.channelComponent),
                    new ModuleChannelName(itemCollection.channelName),
                    new ModuleFlowHash(itemCollection.flowHash),
                    new ModuleFlowParty(itemCollection.flowParty),
                    new ModuleFlowComponent(itemCollection.flowComponent),
                    new ModuleFlowInterfaceName(itemCollection.flowInterfaceName),
                    new ModuleFlowInterfaceNamespace(itemCollection.flowInterfaceNamespace),
                    new ModuleVersion(itemCollection.version),
                    new ModuleParameterGroup(itemCollection.parameterGroup),
                    new ModuleName(itemCollection.name),
                    new ModuleParameterName(itemCollection.parameterName),
                    new ModuleParameterValue(itemCollection.parameterValue),
                    new ModuleCreatedAt(itemCollection.createdAt),
                    new ModuleUpdatedAt(itemCollection.updatedAt),
                    new ModuleDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<BplusItSappiModule>>
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
    
    async create(module: BplusItSappiModule): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === module.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${module.id.value} already exist in database`);

        // create deletedAt null 
        module.deletedAt = new ModuleDeletedAt(null);

        this.collectionSource.push(module);
    }

    async insert(module: BplusItSappiModule[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiModule> 
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

    async findById(id: UuidValueObject): Promise<BplusItSappiModule>
    {
        const aggregate = this.collectionSource.find(module => module.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiModule[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: BplusItSappiModule): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(module => {
            if (module.id.value === aggregate.id.value) return aggregate;
            return module;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(module => module.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}