import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateChannelDto } from './../dto/update-channel.dto';
import { ChannelDto } from './../dto/channel.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateChannelCommand } from '@hades/bplus-it-sappi/channel/application/update/update-channel.command';
import { FindChannelByIdQuery } from '@hades/bplus-it-sappi/channel/application/find/find-channel-by-id.query';

@ApiTags('[bplus-it-sappi] channel')
@ApiCreatedResponse({ description: 'The record has been successfully updated.', type: ChannelDto})
@Controller('bplus-it-sappi/channel')
export class UpdateChannelController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update channel' })
    async main(@Body() payload: UpdateChannelDto)
    {
        await this.commandBus.dispatch(new UpdateChannelCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
            payload.party,
            payload.component,
            payload.name,
            payload.flowParty,
            payload.flowComponent,
            payload.flowInterfaceName,
            payload.flowInterfaceNamespace,
            payload.adapterType,
            payload.direction,
            payload.transportProtocol,
            payload.messageProtocol,
            payload.adapterEngineName,
            payload.url,
            payload.username,
            payload.remoteHost,
            payload.remotePort,
            payload.directory,
            payload.fileSchema,
            payload.proxyHost,
            payload.proxyPort,
            payload.destination,
            payload.adapterStatus,
            payload.softwareComponentName,
            payload.responsibleUserAccountName,
            payload.lastChangeUserAccount,
            payload.lastChangedAt,
            
        ));

        return await this.queryBus.ask(new FindChannelByIdQuery(payload.id));
    }
}