import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { 
    MessageDetailId, 
    MessageDetailTenantId, 
    MessageDetailTenantCode, 
    MessageDetailSystemId, 
    MessageDetailSystemName, 
    MessageDetailScenario, 
    MessageDetailExecutionId, 
    MessageDetailExecutionType, 
    MessageDetailExecutionExecutedAt, 
    MessageDetailExecutionMonitoringStartAt, 
    MessageDetailExecutionMonitoringEndAt, 
    MessageDetailFlowId, 
    MessageDetailFlowParty, 
    MessageDetailFlowComponent, 
    MessageDetailFlowInterfaceName, 
    MessageDetailFlowInterfaceNamespace, 
    MessageDetailStatus, 
    MessageDetailDetail, 
    MessageDetailExample, 
    MessageDetailStartTimeAt, 
    MessageDetailDirection, 
    MessageDetailErrorCategory, 
    MessageDetailErrorCode, 
    MessageDetailErrorLabel, 
    MessageDetailNode, 
    MessageDetailProtocol, 
    MessageDetailQualityOfService, 
    MessageDetailReceiverParty, 
    MessageDetailReceiverComponent, 
    MessageDetailReceiverInterface, 
    MessageDetailReceiverInterfaceNamespace, 
    MessageDetailRetries, 
    MessageDetailSize, 
    MessageDetailTimesFailed, 
    MessageDetailCreatedAt, 
    MessageDetailUpdatedAt, 
    MessageDetailDeletedAt
    
} from '@hades/bplus-it-sappi/message-detail/domain/value-objects';
import { BplusItSappiMessageDetail } from './../../domain/message-detail.aggregate';
import { messagesDetail } from './../seeds/message-detail.seed';

@Injectable()
export class MockMessageDetailRepository implements IMessageDetailRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'BplusItSappiMessageDetail';
    public collectionSource: BplusItSappiMessageDetail[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(messageDetail => messageDetail.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>messagesDetail)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(BplusItSappiMessageDetail.register(
                    new MessageDetailId(itemCollection.id),
                    new MessageDetailTenantId(itemCollection.tenantId),
                    new MessageDetailTenantCode(itemCollection.tenantCode),
                    new MessageDetailSystemId(itemCollection.systemId),
                    new MessageDetailSystemName(itemCollection.systemName),
                    new MessageDetailScenario(itemCollection.scenario),
                    new MessageDetailExecutionId(itemCollection.executionId),
                    new MessageDetailExecutionType(itemCollection.executionType),
                    new MessageDetailExecutionExecutedAt(itemCollection.executionExecutedAt),
                    new MessageDetailExecutionMonitoringStartAt(itemCollection.executionMonitoringStartAt),
                    new MessageDetailExecutionMonitoringEndAt(itemCollection.executionMonitoringEndAt),
                    new MessageDetailFlowId(itemCollection.flowId),
                    new MessageDetailFlowParty(itemCollection.flowParty),
                    new MessageDetailFlowComponent(itemCollection.flowComponent),
                    new MessageDetailFlowInterfaceName(itemCollection.flowInterfaceName),
                    new MessageDetailFlowInterfaceNamespace(itemCollection.flowInterfaceNamespace),
                    new MessageDetailStatus(itemCollection.status),
                    new MessageDetailDetail(itemCollection.detail),
                    new MessageDetailExample(itemCollection.example),
                    new MessageDetailStartTimeAt(itemCollection.startTimeAt),
                    new MessageDetailDirection(itemCollection.direction),
                    new MessageDetailErrorCategory(itemCollection.errorCategory),
                    new MessageDetailErrorCode(itemCollection.errorCode),
                    new MessageDetailErrorLabel(itemCollection.errorLabel),
                    new MessageDetailNode(itemCollection.node),
                    new MessageDetailProtocol(itemCollection.protocol),
                    new MessageDetailQualityOfService(itemCollection.qualityOfService),
                    new MessageDetailReceiverParty(itemCollection.receiverParty),
                    new MessageDetailReceiverComponent(itemCollection.receiverComponent),
                    new MessageDetailReceiverInterface(itemCollection.receiverInterface),
                    new MessageDetailReceiverInterfaceNamespace(itemCollection.receiverInterfaceNamespace),
                    new MessageDetailRetries(itemCollection.retries),
                    new MessageDetailSize(itemCollection.size),
                    new MessageDetailTimesFailed(itemCollection.timesFailed),
                    new MessageDetailCreatedAt(itemCollection.createdAt),
                    new MessageDetailUpdatedAt(itemCollection.updatedAt),
                    new MessageDetailDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<BplusItSappiMessageDetail>>
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
    
    async create(messageDetail: BplusItSappiMessageDetail): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === messageDetail.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${messageDetail.id.value} already exist in database`);

        // create deletedAt null 
        messageDetail.deletedAt = new MessageDetailDeletedAt(null);

        this.collectionSource.push(messageDetail);
    }

    async insert(messageDetail: BplusItSappiMessageDetail[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiMessageDetail> 
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

    async findById(id: UuidValueObject): Promise<BplusItSappiMessageDetail>
    {
        const aggregate = this.collectionSource.find(messageDetail => messageDetail.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiMessageDetail[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: BplusItSappiMessageDetail): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(messageDetail => {
            if (messageDetail.id.value === aggregate.id.value) return aggregate;
            return messageDetail;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(messageDetail => messageDetail.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}