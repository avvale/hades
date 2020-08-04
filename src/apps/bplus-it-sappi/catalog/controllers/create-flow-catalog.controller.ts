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
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: [CreateFlowCatalogDto] })
    @ApiBody({ type: [CreateFlowCatalogDto] })
    async main(@Body() payload: CreateFlowCatalogDto[])
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

        const flowCatalog = payload.map(flow => {
            return {
                id: uuidv4(),
                hash: Utils.sha1(flow.tenantCode + flow.systemName + flow.party + flow.component + flow.interfaceName + flow.interfaceNamespace),
                tenantId: tenant.id,
                tenantCode: flow.tenantCode,
                systemId: system.id,
                systemName: flow.systemName,
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
        await this.commandBus.dispatch(new CreateFlowsCommand(flowCatalog))
        
        return {
            statusCode: 200,
            message: 'Flows successfully registered'
        };
    } 
}