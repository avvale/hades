import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IChannelRepository } from './../../domain/channel.repository';
import { 
    ChannelId, 
    ChannelHash, 
    ChannelTenantId, 
    ChannelTenantCode, 
    ChannelSystemId, 
    ChannelSystemName, 
    ChannelParty, 
    ChannelComponent, 
    ChannelName, 
    ChannelFlowId, 
    ChannelFlowParty, 
    ChannelFlowComponent, 
    ChannelFlowInterfaceName, 
    ChannelFlowInterfaceNamespace, 
    ChannelVersion, 
    ChannelAdapterType, 
    ChannelDirection, 
    ChannelTransportProtocol, 
    ChannelMessageProtocol, 
    ChannelAdapterEngineName, 
    ChannelUrl, 
    ChannelUsername, 
    ChannelRemoteHost, 
    ChannelRemotePort, 
    ChannelDirectory, 
    ChannelFileSchema, 
    ChannelProxyHost, 
    ChannelProxyPort, 
    ChannelDestination, 
    ChannelAdapterStatus, 
    ChannelSoftwareComponentName, 
    ChannelResponsibleUserAccountName, 
    ChannelLastChangeUserAccount, 
    ChannelLastChangedAt, 
    ChannelCreatedAt, 
    ChannelUpdatedAt, 
    ChannelDeletedAt
    
} from '@hades/bplus-it-sappi/channel/domain/value-objects';
import { BplusItSappiChannel } from './../../domain/channel.aggregate';
import { channels } from './../seeds/channel.seed';

@Injectable()
export class MockChannelRepository implements IChannelRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'BplusItSappiChannel';
    public collectionSource: BplusItSappiChannel[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(channel => channel.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>channels)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(BplusItSappiChannel.register(
                    new ChannelId(itemCollection.id),
                    new ChannelHash(itemCollection.hash),
                    new ChannelTenantId(itemCollection.tenantId),
                    new ChannelTenantCode(itemCollection.tenantCode),
                    new ChannelSystemId(itemCollection.systemId),
                    new ChannelSystemName(itemCollection.systemName),
                    new ChannelParty(itemCollection.party),
                    new ChannelComponent(itemCollection.component),
                    new ChannelName(itemCollection.name),
                    new ChannelFlowId(itemCollection.flowId),
                    new ChannelFlowParty(itemCollection.flowParty),
                    new ChannelFlowComponent(itemCollection.flowComponent),
                    new ChannelFlowInterfaceName(itemCollection.flowInterfaceName),
                    new ChannelFlowInterfaceNamespace(itemCollection.flowInterfaceNamespace),
                    new ChannelVersion(itemCollection.version),
                    new ChannelAdapterType(itemCollection.adapterType),
                    new ChannelDirection(itemCollection.direction),
                    new ChannelTransportProtocol(itemCollection.transportProtocol),
                    new ChannelMessageProtocol(itemCollection.messageProtocol),
                    new ChannelAdapterEngineName(itemCollection.adapterEngineName),
                    new ChannelUrl(itemCollection.url),
                    new ChannelUsername(itemCollection.username),
                    new ChannelRemoteHost(itemCollection.remoteHost),
                    new ChannelRemotePort(itemCollection.remotePort),
                    new ChannelDirectory(itemCollection.directory),
                    new ChannelFileSchema(itemCollection.fileSchema),
                    new ChannelProxyHost(itemCollection.proxyHost),
                    new ChannelProxyPort(itemCollection.proxyPort),
                    new ChannelDestination(itemCollection.destination),
                    new ChannelAdapterStatus(itemCollection.adapterStatus),
                    new ChannelSoftwareComponentName(itemCollection.softwareComponentName),
                    new ChannelResponsibleUserAccountName(itemCollection.responsibleUserAccountName),
                    new ChannelLastChangeUserAccount(itemCollection.lastChangeUserAccount),
                    new ChannelLastChangedAt(itemCollection.lastChangedAt),
                    new ChannelCreatedAt(itemCollection.createdAt),
                    new ChannelUpdatedAt(itemCollection.updatedAt),
                    new ChannelDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<BplusItSappiChannel>>
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
    
    async create(channel: BplusItSappiChannel): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === channel.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${channel.id.value} already exist in database`);

        // create deletedAt null 
        channel.deletedAt = new ChannelDeletedAt(null);

        this.collectionSource.push(channel);
    }

    async insert(channel: BplusItSappiChannel[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiChannel> 
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

    async findById(id: UuidValueObject): Promise<BplusItSappiChannel>
    {
        const aggregate = this.collectionSource.find(channel => channel.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiChannel[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: BplusItSappiChannel): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(channel => {
            if (channel.id.value === aggregate.id.value) return aggregate;
            return channel;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(channel => channel.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}