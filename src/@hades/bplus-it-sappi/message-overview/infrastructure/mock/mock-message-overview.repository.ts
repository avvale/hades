import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { 
    MessageOverviewId, 
    MessageOverviewTenantId, 
    MessageOverviewSystemId, 
    MessageOverviewSystemName, 
    MessageOverviewExecutionId, 
    MessageOverviewExecutionType, 
    MessageOverviewExecutionExecutedAt, 
    MessageOverviewExecutionMonitoringStartAt, 
    MessageOverviewExecutionMonitoringEndAt, 
    MessageOverviewNumberMax, 
    MessageOverviewNumberDays, 
    MessageOverviewSuccess, 
    MessageOverviewCancelled, 
    MessageOverviewDelivering, 
    MessageOverviewError, 
    MessageOverviewHolding, 
    MessageOverviewToBeDelivered, 
    MessageOverviewWaiting, 
    MessageOverviewCreatedAt, 
    MessageOverviewUpdatedAt, 
    MessageOverviewDeletedAt
    
} from '@hades/bplus-it-sappi/message-overview/domain/value-objects';
import { BplusItSappiMessageOverview } from './../../domain/message-overview.entity';
import { messagesOverview } from './../seeds/message-overview.seed';

@Injectable()
export class MockMessageOverviewRepository implements IMessageOverviewRepository
{
    public readonly repository: any;
    public readonly entityName: string = 'BplusItSappiMessageOverview';
    public collectionSource: BplusItSappiMessageOverview[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(messageOverview => messageOverview.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>messagesOverview)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(BplusItSappiMessageOverview.register(
                    new MessageOverviewId(itemCollection.id),
                    new MessageOverviewTenantId(itemCollection.tenantId),
                    new MessageOverviewSystemId(itemCollection.systemId),
                    new MessageOverviewSystemName(itemCollection.systemName),
                    new MessageOverviewExecutionId(itemCollection.executionId),
                    new MessageOverviewExecutionType(itemCollection.executionType),
                    new MessageOverviewExecutionExecutedAt(itemCollection.executionExecutedAt),
                    new MessageOverviewExecutionMonitoringStartAt(itemCollection.executionMonitoringStartAt),
                    new MessageOverviewExecutionMonitoringEndAt(itemCollection.executionMonitoringEndAt),
                    new MessageOverviewNumberMax(itemCollection.numberMax),
                    new MessageOverviewNumberDays(itemCollection.numberDays),
                    new MessageOverviewSuccess(itemCollection.success),
                    new MessageOverviewCancelled(itemCollection.cancelled),
                    new MessageOverviewDelivering(itemCollection.delivering),
                    new MessageOverviewError(itemCollection.error),
                    new MessageOverviewHolding(itemCollection.holding),
                    new MessageOverviewToBeDelivered(itemCollection.toBeDelivered),
                    new MessageOverviewWaiting(itemCollection.waiting),
                    new MessageOverviewCreatedAt(itemCollection.createdAt),
                    new MessageOverviewUpdatedAt(itemCollection.updatedAt),
                    new MessageOverviewDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<BplusItSappiMessageOverview>>
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
    
    async create(messageOverview: BplusItSappiMessageOverview): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === messageOverview.id.value)) throw new ConflictException(`Error to create ${this.entityName}, the id ${messageOverview.id.value} already exist in database`);

        // create deletedAt null 
        messageOverview.deletedAt = new MessageOverviewDeletedAt(null);

        this.collectionSource.push(messageOverview);
    }

    async insert(messageOverview: BplusItSappiMessageOverview[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiMessageOverview> 
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

    async findById(id: UuidValueObject): Promise<BplusItSappiMessageOverview>
    {
        const entity = this.collectionSource.find(messageOverview => messageOverview.id.value === id.value);

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        return entity;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiMessageOverview[]> 
    {
        return this.collectionSource;
    }

    async update(entity: BplusItSappiMessageOverview): Promise<void> 
    { 
        // check that entity exist
        await this.findById(entity.id);

        this.collectionSource.map(messageOverview => {
            if (messageOverview.id.value === entity.id.value) return entity;
            return messageOverview;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that entity exist
        await this.findById(id);

        this.collectionSource.filter(messageOverview => messageOverview.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}