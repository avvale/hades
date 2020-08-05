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
import { CreateFlowsCommand } from '@hades/bplus-it-sappi/flow/application/create/create-flows.command';
import { Utils } from '@hades/shared/domain/lib/utils';
import { CreateFlowCatalogDto } from './../dto/create-flow-catalog.dto';

@ApiTags('[bplus-it-sappi] catalog/flow')
@Controller('bplus-it-sappi/catalog/flow')
export class CreateFlowCatalogController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create or update catalog flow' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: CreateFlowCatalogDto })
    @ApiBody({ type: CreateFlowCatalogDto })
    async main(@Body() payload: CreateFlowCatalogDto)
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

        const flowsCatalog = payload.flows.map(flow => {
            return {
                id: uuidv4(),
                hash: Utils.sha1(tenant.code + system.name + flow.party + flow.component + flow.interfaceName + flow.interfaceNamespace),
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
        
        return {
            statusCode: 200,
            message: 'Flows successfully registered'
        };
    } 
}