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
import { CreateFlowsCommand } from '@hades/bplus-it-sappi/flow/application/create/create-flows.command';
import { DeleteModulesCommand } from '@hades/bplus-it-sappi/module/application/delete/delete-modules.command';
import { CreateModulesCommand } from '@hades/bplus-it-sappi/module/application/create/create-modules.command';
import { Utils } from '@hades/shared/domain/lib/utils';
import { CreateCatalogDto } from './../dto/create-catalog.dto';

@ApiTags('[bplus-it-sappi] catalog')
@Controller('bplus-it-sappi/catalog')
export class CreateCatalogController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create or update catalog, flows, channels and modules' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: CreateCatalogDto })
    @ApiBody({ type: CreateCatalogDto })
    async main(@Body() payload: CreateCatalogDto)
    {
        if (!Array.isArray(payload.flows)) throw new BadRequestException(`The property flows does not exist or is not an array`);
        
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


        // create flows
        const channelsWithFlows = [];
        const flowsCatalog = payload.flows.map(flow => {

            // register channels with related id and flow, to complete the rest of the data later
            if (Array.isArray(flow.channels)) 
            {
                for (const channel of flow.channels)
                {
                    channelsWithFlows.push({
                        id: uuidv4(),
                        hash: Utils.sha1(tenant.code + system.name + (channel.party ? channel.party : '') + channel.component + channel.name),
                        tenantId: tenant.id,
                        tenantCode: tenant.code,
                        systemId: system.id,
                        systemName: system.name,
                        party: channel.party,
                        component: channel.component,
                        name: channel.name,
                        flowHash: Utils.sha1(tenant.code + system.name + (flow.party ? flow.party : '') + flow.component + flow.interfaceName + flow.interfaceNamespace),
                        flowParty: flow.party,
                        flowComponent: flow.component,
                        flowInterfaceName: flow.interfaceName,
                        flowInterfaceNamespace: flow.interfaceNamespace,
                    });
                }
            }

            return {
                id: uuidv4(),
                hash: Utils.sha1(tenant.code + system.name + (flow.party ? flow.party : '') + flow.component + flow.interfaceName + flow.interfaceNamespace),
                tenantId: tenant.id,
                tenantCode: tenant.code,
                systemId: system.id,
                systemName: system.name,
                version: flow.version,
                scenario: flow.scenario,
                party: flow.party,
                component: flow.component,
                interfaceName: flow.interfaceName,
                interfaceNamespace: flow.interfaceNamespace,
                iflowName: flow.iflowName,
                responsibleUserAccount: flow.responsibleUserAccount,
                lastChangeUserAccount: flow.lastChangeUserAccount,
                lastChangedAt: flow.lastChangedAt,
                folderPath: flow.folderPath,
                description: flow.description,
                application: flow.application
            }
        });
        await this.commandBus.dispatch(new CreateFlowsCommand(flowsCatalog));


        // create channels
        const channelsCatalog = payload.channels.map(channel => {
            
            const hash              = Utils.sha1(tenant.code + system.name + (channel.party ? channel.party : '') + channel.component + channel.name);
            const channelsWithFlow  = channelsWithFlows.find(channel => channel.hash === hash);

            return {
                id: uuidv4(),
                hash: hash,
                tenantId: tenant.id,
                tenantCode: tenant.code,
                systemId: system.id,
                systemName: system.name,
                party: channel.party,
                component: channel.component,
                name: channel.name,
                flowHash: channelsWithFlow?.flowHash,
                flowParty: channelsWithFlow?.flowParty,
                flowComponent: channelsWithFlow?.flowComponent,
                flowInterfaceName: channelsWithFlow?.flowInterfaceName,
                flowInterfaceNamespace: channelsWithFlow?.flowInterfaceNamespace,
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

            const channelHash       = Utils.sha1(tenant.code + system.name + (module.channelParty ? module.channelParty : '') + module.channelComponent + module.channelName);
            const channelsWithFlow  = channelsWithFlows.find(channel => channel.hash === channelHash);

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
                flowHash: channelsWithFlow?.flowHash,
                flowParty: channelsWithFlow?.flowParty,
                flowComponent: channelsWithFlow?.flowComponent,
                flowInterfaceName: channelsWithFlow?.flowInterfaceName,
                flowInterfaceNamespace: channelsWithFlow?.flowInterfaceNamespace,
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