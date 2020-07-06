import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChannelResponse } from './../../domain/channel.response';
import { ChannelId } from './../../domain/value-objects';
import { FindChannelByIdQuery } from './find-channel-by-id.query';
import { FindChannelByIdService } from './find-channel-by-id.service';

@QueryHandler(FindChannelByIdQuery)
export class FindChannelByIdQueryHandler implements IQueryHandler<FindChannelByIdQuery>
{
    constructor(
        private readonly findChannelByIdService: FindChannelByIdService
    ) { }

    async execute(query: FindChannelByIdQuery): Promise<ChannelResponse>
    {
        const channel = await this.findChannelByIdService.main(new ChannelId(query.id));

        return new ChannelResponse(
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
                
            );
    }
}