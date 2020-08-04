import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindTenantQuery } from '@hades/admin/tenant/application/find/find-tenant.query';
import { FindSystemQuery } from '@hades/bplus-it-sappi/system/application/find/find-system.query';
import { CreateChannelsCommand } from '@hades/bplus-it-sappi/channel/application/create/create-channels.command';
import { Utils } from '@hades/shared/domain/lib/utils';
import { CreateChannelCatalogDto } from './../dto/create-channel-catalog.dto';

@ApiTags('[bplus-it-sappi] catalog/channel')
@Controller('bplus-it-sappi/catalog/channel')
export class CreateChannelCatalogController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create or update catalog channel and modules' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: [CreateChannelCatalogDto] })
    @ApiBody({ type: [CreateChannelCatalogDto] })
    async main(@Body() payload: CreateChannelCatalogDto[])
    {
        if (!Array.isArray(payload)) throw new BadRequestException(`The payload is not an array`);
        if (payload.length === 0) throw new BadRequestException(`The payload is empty`);

        // get tenant
        const tenant = await this.queryBus.ask(new FindTenantQuery(
            [
                {
                    command: Command.WHERE,
                    column: 'code',
                    operator: Operator.EQUALS,
                    value: payload[0].tenantCode
                }
            ]
        ));

        // get system
        const system = await this.queryBus.ask(new FindSystemQuery(
            [
                {
                    command: Command.WHERE,
                    column: 'name',
                    operator: Operator.EQUALS,
                    value: payload[0].systemName
                }
            ]
        ));

        const channelCatalog = payload.map(channel => {
            return {
                id: uuidv4(),
                hash: Utils.sha1(channel.tenantCode + channel.systemName + channel.party + channel.component + channel.name),
                tenantId: tenant.id,
                tenantCode: channel.tenantCode,
                systemId: system.id,
                systemName: channel.systemName,
                party: channel.party,
                component: channel.component,
                name: channel.name,
                // flowHash: '',
                flowParty: channel.flowParty,
                flowComponent: channel.flowComponent,
                flowInterfaceName: channel.flowInterfaceName,
                flowInterfaceNamespace: channel.flowInterfaceNamespace,
                version: channel.version,
                adapterType: channel.adapterType,
                direction: channel.direction,
                transportProtocol: channel.transportProtocol,
                messageProtocol: channel.messageProtocol,
                adapterEngineName: channel.adapterEngineName,
                url: channel.url,
                username: channel.username,
                remoteHost: channel.remoteHost,
                remotePort: channel.remotePort,
                directory: channel.directory,
                fileSchema: channel.fileSchema,
                proxyHost: channel.proxyHost,
                proxyPort: channel.proxyPort,
                destination: channel.destination,
                adapterStatus: channel.adapterStatus,
                softwareComponentName: channel.softwareComponentName,
                responsibleUserAccountName: channel.responsibleUserAccountName,
                lastChangeUserAccount: channel.lastChangeUserAccount,
                lastChangedAt: channel.lastChangedAt
            }
        });
        await this.commandBus.dispatch(new CreateChannelsCommand(channelCatalog))

        // borrar y crear módulos
        
        return {
            statusCode: 200,
            message: 'Flows successfully registered'
        };
    } 
}