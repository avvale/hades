import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { 
    ChannelDetailId, 
    ChannelDetailTenantId, 
    ChannelDetailTenantCode, 
    ChannelDetailSystemId, 
    ChannelDetailSystemName, 
    ChannelDetailExecutionId, 
    ChannelDetailExecutionType, 
    ChannelDetailExecutionExecutedAt, 
    ChannelDetailExecutionMonitoringStartAt, 
    ChannelDetailExecutionMonitoringEndAt, 
    ChannelDetailStatus, 
    ChannelDetailChannelHash, 
    ChannelDetailChannelSapId, 
    ChannelDetailChannelParty, 
    ChannelDetailChannelComponent, 
    ChannelDetailChannelName, 
    ChannelDetailDetail, 
    ChannelDetailCreatedAt, 
    ChannelDetailUpdatedAt, 
    ChannelDetailDeletedAt
    
} from '@hades/bplus-it-sappi/channel-detail/domain/value-objects';
import { BplusItSappiChannelDetail } from './../../domain/channel-detail.aggregate';
import { channelsDetail } from './../seeds/channel-detail.seed';

@Injectable()
export class MockChannelDetailRepository implements IChannelDetailRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'BplusItSappiChannelDetail';
    public collectionSource: BplusItSappiChannelDetail[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(channelDetail => channelDetail.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>channelsDetail)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(BplusItSappiChannelDetail.register(
                    new ChannelDetailId(itemCollection.id),
                    new ChannelDetailTenantId(itemCollection.tenantId),
                    new ChannelDetailTenantCode(itemCollection.tenantCode),
                    new ChannelDetailSystemId(itemCollection.systemId),
                    new ChannelDetailSystemName(itemCollection.systemName),
                    new ChannelDetailExecutionId(itemCollection.executionId),
                    new ChannelDetailExecutionType(itemCollection.executionType),
                    new ChannelDetailExecutionExecutedAt(itemCollection.executionExecutedAt),
                    new ChannelDetailExecutionMonitoringStartAt(itemCollection.executionMonitoringStartAt),
                    new ChannelDetailExecutionMonitoringEndAt(itemCollection.executionMonitoringEndAt),
                    new ChannelDetailStatus(itemCollection.status),
                    new ChannelDetailChannelHash(itemCollection.channelHash),
                    new ChannelDetailChannelSapId(itemCollection.channelSapId),
                    new ChannelDetailChannelParty(itemCollection.channelParty),
                    new ChannelDetailChannelComponent(itemCollection.channelComponent),
                    new ChannelDetailChannelName(itemCollection.channelName),
                    new ChannelDetailDetail(itemCollection.detail),
                    new ChannelDetailCreatedAt(itemCollection.createdAt),
                    new ChannelDetailUpdatedAt(itemCollection.updatedAt),
                    new ChannelDetailDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<BplusItSappiChannelDetail>>
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
    
    async create(channelDetail: BplusItSappiChannelDetail): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === channelDetail.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${channelDetail.id.value} already exist in database`);

        // create deletedAt null 
        channelDetail.deletedAt = new ChannelDetailDeletedAt(null);

        this.collectionSource.push(channelDetail);
    }

    async insert(channelDetail: BplusItSappiChannelDetail[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiChannelDetail> 
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

    async findById(id: UuidValueObject): Promise<BplusItSappiChannelDetail>
    {
        const aggregate = this.collectionSource.find(channelDetail => channelDetail.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiChannelDetail[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: BplusItSappiChannelDetail): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(channelDetail => {
            if (channelDetail.id.value === aggregate.id.value) return aggregate;
            return channelDetail;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(channelDetail => channelDetail.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}