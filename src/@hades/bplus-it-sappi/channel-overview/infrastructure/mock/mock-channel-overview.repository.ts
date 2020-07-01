import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { 
    ChannelOverviewId, 
    ChannelOverviewTenantId, 
    ChannelOverviewSystemId, 
    ChannelOverviewSystemName, 
    ChannelOverviewExecutionId, 
    ChannelOverviewExecutionType, 
    ChannelOverviewExecutionExecutedAt, 
    ChannelOverviewExecutionMonitoringStartAt, 
    ChannelOverviewExecutionMonitoringEndAt, 
    ChannelOverviewError, 
    ChannelOverviewInactive, 
    ChannelOverviewSuccessful, 
    ChannelOverviewStopped, 
    ChannelOverviewUnknown, 
    ChannelOverviewUnregistered, 
    ChannelOverviewCreatedAt, 
    ChannelOverviewUpdatedAt, 
    ChannelOverviewDeletedAt
    
} from '@hades/bplus-it-sappi/channel-overview/domain/value-objects';
import { BplusItSappiChannelOverview } from './../../domain/channel-overview.entity';
import { channelsOverview } from './../seeds/channel-overview.seed';

@Injectable()
export class MockChannelOverviewRepository implements IChannelOverviewRepository
{
    public readonly repository: any;
    public readonly entityName: string = 'BplusItSappiChannelOverview';
    public collectionSource: BplusItSappiChannelOverview[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(channelOverview => channelOverview.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>channelsOverview)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(BplusItSappiChannelOverview.register(
                    new ChannelOverviewId(itemCollection.id),
                    new ChannelOverviewTenantId(itemCollection.tenantId),
                    new ChannelOverviewSystemId(itemCollection.systemId),
                    new ChannelOverviewSystemName(itemCollection.systemName),
                    new ChannelOverviewExecutionId(itemCollection.executionId),
                    new ChannelOverviewExecutionType(itemCollection.executionType),
                    new ChannelOverviewExecutionExecutedAt(itemCollection.executionExecutedAt),
                    new ChannelOverviewExecutionMonitoringStartAt(itemCollection.executionMonitoringStartAt),
                    new ChannelOverviewExecutionMonitoringEndAt(itemCollection.executionMonitoringEndAt),
                    new ChannelOverviewError(itemCollection.error),
                    new ChannelOverviewInactive(itemCollection.inactive),
                    new ChannelOverviewSuccessful(itemCollection.successful),
                    new ChannelOverviewStopped(itemCollection.stopped),
                    new ChannelOverviewUnknown(itemCollection.unknown),
                    new ChannelOverviewUnregistered(itemCollection.unregistered),
                    new ChannelOverviewCreatedAt(itemCollection.createdAt),
                    new ChannelOverviewUpdatedAt(itemCollection.updatedAt),
                    new ChannelOverviewDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<BplusItSappiChannelOverview>>
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
    
    async create(channelOverview: BplusItSappiChannelOverview): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === channelOverview.id.value)) throw new ConflictException(`Error to create ${this.entityName}, the id ${channelOverview.id.value} already exist in database`);

        // create deletedAt null 
        channelOverview.deletedAt = new ChannelOverviewDeletedAt(null);

        this.collectionSource.push(channelOverview);
    }

    async insert(channelOverview: BplusItSappiChannelOverview[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiChannelOverview> 
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

    async findById(id: UuidValueObject): Promise<BplusItSappiChannelOverview>
    {
        const entity = this.collectionSource.find(channelOverview => channelOverview.id.value === id.value);

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        return entity;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiChannelOverview[]> 
    {
        return this.collectionSource;
    }

    async update(entity: BplusItSappiChannelOverview): Promise<void> 
    { 
        // check that entity exist
        await this.findById(entity.id);

        this.collectionSource.map(channelOverview => {
            if (channelOverview.id.value === entity.id.value) return entity;
            return channelOverview;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that entity exist
        await this.findById(id);

        this.collectionSource.filter(channelOverview => channelOverview.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}