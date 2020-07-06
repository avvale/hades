import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IFlowRepository } from './../../domain/flow.repository';
import { 
    FlowId, 
    FlowTenantId, 
    FlowSystemId, 
    FlowSystemName, 
    FlowScenario, 
    FlowParty, 
    FlowComponent, 
    FlowInterfaceName, 
    FlowInterfaceNamespace, 
    FlowIflowName, 
    FlowResponsibleUserAccount, 
    FlowLastChangeUserAccount, 
    FlowLastChangedAt, 
    FlowFolderPath, 
    FlowDescription, 
    FlowApplication, 
    FlowIsCritical, 
    FlowIsComplex, 
    FlowFieldGroupId, 
    FlowData, 
    FlowCreatedAt, 
    FlowUpdatedAt, 
    FlowDeletedAt
    
} from '@hades/bplus-it-sappi/flow/domain/value-objects';
import { BplusItSappiFlow } from './../../domain/flow.aggregate';
import { flows } from './../seeds/flow.seed';

@Injectable()
export class MockFlowRepository implements IFlowRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'BplusItSappiFlow';
    public collectionSource: BplusItSappiFlow[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(flow => flow.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>flows)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(BplusItSappiFlow.register(
                    new FlowId(itemCollection.id),
                    new FlowTenantId(itemCollection.tenantId),
                    new FlowSystemId(itemCollection.systemId),
                    new FlowSystemName(itemCollection.systemName),
                    new FlowScenario(itemCollection.scenario),
                    new FlowParty(itemCollection.party),
                    new FlowComponent(itemCollection.component),
                    new FlowInterfaceName(itemCollection.interfaceName),
                    new FlowInterfaceNamespace(itemCollection.interfaceNamespace),
                    new FlowIflowName(itemCollection.iflowName),
                    new FlowResponsibleUserAccount(itemCollection.responsibleUserAccount),
                    new FlowLastChangeUserAccount(itemCollection.lastChangeUserAccount),
                    new FlowLastChangedAt(itemCollection.lastChangedAt),
                    new FlowFolderPath(itemCollection.folderPath),
                    new FlowDescription(itemCollection.description),
                    new FlowApplication(itemCollection.application),
                    new FlowIsCritical(itemCollection.isCritical),
                    new FlowIsComplex(itemCollection.isComplex),
                    new FlowFieldGroupId(itemCollection.fieldGroupId),
                    new FlowData(itemCollection.data),
                    new FlowCreatedAt(itemCollection.createdAt),
                    new FlowUpdatedAt(itemCollection.updatedAt),
                    new FlowDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<BplusItSappiFlow>>
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
    
    async create(flow: BplusItSappiFlow): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === flow.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${flow.id.value} already exist in database`);

        // create deletedAt null 
        flow.deletedAt = new FlowDeletedAt(null);

        this.collectionSource.push(flow);
    }

    async insert(flow: BplusItSappiFlow[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiFlow> 
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

    async findById(id: UuidValueObject): Promise<BplusItSappiFlow>
    {
        const aggregate = this.collectionSource.find(flow => flow.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiFlow[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: BplusItSappiFlow): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(flow => {
            if (flow.id.value === aggregate.id.value) return aggregate;
            return flow;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(flow => flow.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}