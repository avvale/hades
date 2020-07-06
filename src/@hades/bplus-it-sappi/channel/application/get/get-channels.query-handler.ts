import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChannelResponse } from './../../domain/channel.response';
import { GetChannelsQuery } from './get-channels.query';
import { GetChannelsService } from './get-channels.service';

@QueryHandler(GetChannelsQuery)
export class GetChannelsQueryHandler implements IQueryHandler<GetChannelsQuery>
{
    constructor(
        private readonly getChannelsService: GetChannelsService
    ) { }

    async execute(query: GetChannelsQuery): Promise<ChannelResponse[]>
    {
        return (await this.getChannelsService.main(query.queryStatements)).map(channel => new ChannelResponse(
                channel.id.value,
                channel.tenantId.value,
                channel.systemId.value,
                channel.party.value,
                channel.component.value,
                channel.name.value,
                channel.flowParty.value,
                channel.flowComponent.value,
                channel.flowInterfaceName.value,
                channel.flowInterfaceNamespace.value,
                channel.adapterType.value,
                channel.direction.value,
                channel.transportProtocol.value,
                channel.messageProtocol.value,
                channel.adapterEngineName.value,
                channel.url.value,
                channel.username.value,
                channel.remoteHost.value,
                channel.remotePort.value,
                channel.directory.value,
                channel.fileSchema.value,
                channel.proxyHost.value,
                channel.proxyPort.value,
                channel.destination.value,
                channel.adapterStatus.value,
                channel.softwareComponentName.value,
                channel.responsibleUserAccountName.value,
                channel.lastChangeUserAccount.value,
                channel.lastChangedAt.value,
                channel.createdAt.value,
                channel.updatedAt.value,
                channel.deletedAt.value,
                
            ));
    }
}