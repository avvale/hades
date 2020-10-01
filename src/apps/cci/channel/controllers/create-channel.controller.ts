import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateChannelDto } from './../dto/create-channel.dto';
import { ChannelDto } from './../dto/channel.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelByIdQuery } from '@hades/cci/channel/application/find/find-channel-by-id.query';
import { CreateChannelCommand } from '@hades/cci/channel/application/create/create-channel.command';

@ApiTags('[cci] channel')
@Controller('cci/channel')
export class CreateChannelController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create channel' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ChannelDto })
    async main(@Body() payload: CreateChannelDto)
    {
        await this.commandBus.dispatch(new CreateChannelCommand(
            payload.id,
            payload.hash,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.party,
            payload.component,
            payload.name,
            payload.flowHash,
            payload.flowParty,
            payload.flowReceiverParty,
            payload.flowComponent,
            payload.flowReceiverComponent,
            payload.flowInterfaceName,
            payload.flowInterfaceNamespace,
            payload.version,
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
            payload.riInterfaceName,
            payload.riInterfaceNamespace,
            
        ));

        return await this.queryBus.ask(new FindChannelByIdQuery(payload.id));
    }
}