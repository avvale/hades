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
import { CreateModulesCommand } from '@hades/bplus-it-sappi/module/application/create/create-modules.command';
import { CreateChannelModuleCatalogDto } from './../dto/create-channel-module-catalog.dto';
import { DeleteModulesCommand } from '@hades/bplus-it-sappi/module/application/delete/delete-modules.command';
import { GetChannelsQuery } from '@hades/bplus-it-sappi/channel/application/get/get-channels.query';
import { Utils } from '@hades/shared/domain/lib/utils';

@ApiTags('[bplus-it-sappi] catalog/channel-module')
@Controller('bplus-it-sappi/catalog/channel-module')
export class CreateChannelModuleCatalogController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create or update catalog channel and modules' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: CreateChannelModuleCatalogDto })
    @ApiBody({ type: CreateChannelModuleCatalogDto })
    async main(@Body() payload: CreateChannelModuleCatalogDto)
    {
        if (!Array.isArray(payload.channels)) throw new BadRequestException(`The property channels does not exist or is not an array`);
        if (!Array.isArray(payload.modules)) throw new BadRequestException(`The property modules does not exist or is not an array`);

        // get tenant
        const tenant = await this.queryBus.ask(new FindTenantQuery(
            [
                {
                    command: Command.WHERE,
                    column: 'code',
                    operator: Operator.EQUALS,
                    value: payload.tenant.code
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
                    value: payload.system.name
                }
            ]
        ));

        // get all channels only with data to relate flows
        const channelsCatalogRecorded = await this.queryBus.ask(new GetChannelsQuery(
            [
                {
                    command: Command.ATTRIBUTES,
                    value: [
                        'id',
                        'hash',
                        'tenantId',
                        'tenantCode',
                        'systemId',
                        'systemName',
                        'component',
                        'name',
                        'flowHash',
                        'flowParty',
                        'flowComponent',
                        'flowInterfaceName',
                        'flowInterfaceNamespace'
                    ]
                }
            ]
        ));

        const channelsCatalog = payload.channels.map(channel => {
            
            const hash                      = Utils.sha1(tenant.code + system.name + (channel.party ? channel.party : '') + channel.component + channel.name);
            const channelCatalogRecorded    = channelsCatalogRecorded.find(channel => channel.hash === hash);

            return {
                id: uuidv4(),
                hash: Utils.sha1(tenant.code + system.name + (channel.party ? channel.party : '') + channel.component + channel.name),
                tenantId: tenant.id,
                tenantCode: tenant.code,
                systemId: system.id,
                systemName: system.name,
                party: channel.party,
                component: channel.component,
                name: channel.name,
                flowHash: channelCatalogRecorded.flowHash,
                flowParty: channelCatalogRecorded.flowParty,
                flowComponent: channelCatalogRecorded.flowComponent,
                flowInterfaceName: channelCatalogRecorded.flowInterfaceName,
                flowInterfaceNamespace: channelCatalogRecorded.flowInterfaceNamespace,
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
        await this.commandBus.dispatch(new CreateChannelsCommand(channelsCatalog));

        // delete all modules from tenant and system
        await this.commandBus.dispatch(new DeleteModulesCommand(
            [
                {
                    command: Command.WHERE,
                    column: 'tenant_code',
                    operator: Operator.EQUALS,
                    value: tenant.code
                },
                {
                    command: Command.WHERE,
                    column: 'system_name',
                    operator: Operator.EQUALS,
                    value: system.name
                }
            ]
        ));

        const modulesCatalog = payload.modules.map(module => {

            const channelHash               = Utils.sha1(tenant.code + system.name + (module.channelParty ? module.channelParty : '') + module.channelComponent + module.channelName);
            const channelCatalogRecorded    = channelsCatalogRecorded.find(channel => channel.hash === channelHash);

            return {
                id: uuidv4(),
                tenantId: tenant.id,
                tenantCode: tenant.code,
                systemId: system.id,
                systemName: system.name,
                channelHash: channelHash,
                channelParty: module.channelParty,
                channelComponent: module.channelComponent,
                channelName: module.channelName,
                flowHash: channelCatalogRecorded.flowHash,
                flowParty: channelCatalogRecorded.flowParty,
                flowComponent: channelCatalogRecorded.flowComponent,
                flowInterfaceName: channelCatalogRecorded.flowInterfaceName,
                flowInterfaceNamespace: channelCatalogRecorded.flowInterfaceNamespace,
                version: module.version,
                parameterGroup: module.parameterGroup,
                name: module.name,
                parameterName: module.parameterName,
                parameterValue: module.parameterValue,
            }
        });
        await this.commandBus.dispatch(new CreateModulesCommand(modulesCatalog));
        
        return {
            statusCode: 200,
            message: 'Flows successfully registered'
        };
    } 
}