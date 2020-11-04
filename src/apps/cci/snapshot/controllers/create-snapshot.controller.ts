import { Controller, Post, Body, BadRequestException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from './../../../shared/decorators/timezone.decorator';
import * as _ from 'lodash';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindTenantQuery } from '@hades/iam/tenant/application/find/find-tenant.query';
import { FindSystemQuery } from '@hades/cci/system/application/find/find-system.query';
import { CreateMessageOverviewCommand } from '@hades/cci/message-overview/application/create/create-message-overview.command';
import { CreateExecutionCommand } from '@hades/cci/execution/application/create/create-execution.command';
import { CreateChannelOverviewCommand } from '@hades/cci/channel-overview/application/create/create-channel-overview.command';
import { CreateSnapshotDto } from './../dto/create-snapshot.dto';
import { CreateJobOverviewCommand } from '@hades/cci/job-overview/application/create/create-job-overview.command';
import { DeleteMessagesDetailCommand } from '@hades/cci/message-detail/application/delete/delete-messages-detail.command';
import { CreateMessagesDetailCommand } from '@hades/cci/message-detail/application/create/create-messages-detail.command';
import { CreateChannelsDetailCommand } from '@hades/cci/channel-detail/application/create/create-channels-detail.command';
import { CreateJobsDetailCommand } from '@hades/cci/job-detail/application/create/create-jobs-detail.command';
import { DeleteJobsDetailCommand } from '@hades/cci/job-detail/application/delete/delete-jobs-detail.command';
import { DeleteChannelsDetailCommand } from '@hades/cci/channel-detail/application/delete/delete-channels-detail.command';
import { Operator } from '@hades/shared/domain/persistence/sql-statement/operator';
import { CreateDataLakeCommand } from '@hades/cci/data-lake/application/create/create-data-lake.command';
import { Utils } from '@hades/shared/domain/lib/utils';

@ApiTags('[cci] snapshot')
@Controller('cci/snapshot')
@Permissions('cci.snapshot.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateSnapshotController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create snapshot' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: CreateSnapshotDto })
    async main(@Body() payload: CreateSnapshotDto, @Timezone() timezone?: string)
    {
        // guard clause
        if (!Array.isArray(payload.messagesDetail)) throw new BadRequestException(`The property messagesDetail does not exist or is not an array`);
        if (!Array.isArray(payload.channelsDetail)) throw new BadRequestException(`The property channelsDetail does not exist or is not an array`);
        if (!Array.isArray(payload.jobsDetail)) throw new BadRequestException(`The property jobsDetail does not exist or is not an array`);

        const tenant = await this.queryBus.ask(new FindTenantQuery({
            where: {
                code: payload.tenant.code
            }
        }, {}, { timezone }));

        const system = await this.queryBus.ask(new FindSystemQuery({
            where: {
                name: payload.system.name
            }
        }, {}, { timezone }));

        const executionId = Utils.uuid();
        await this.commandBus.dispatch(new CreateExecutionCommand(
            {
                id: executionId,
                tenantId: tenant.id,
                tenantCode: tenant.code,
                systemId: system.id,
                systemName: system.name,
                version: payload.execution.version,
                type: payload.execution.type,
                executedAt: payload.execution.executedAt,
                monitoringStartAt: payload.execution.monitoringStartAt,
                monitoringEndAt: payload.execution.monitoringEndAt,
            }, { timezone }
        ));

        await this.commandBus.dispatch(new CreateDataLakeCommand(
            {
                id: Utils.uuid(),
                tenantId: tenant.id,
                executionId: executionId,
                tenantCode: tenant.code,
                payload: payload
            }, { timezone }
        ));

        const messageOverviewId = Utils.uuid();
        await this.commandBus.dispatch(new CreateMessageOverviewCommand(
            {
                id: messageOverviewId,
                tenantId: tenant.id,
                tenantCode: tenant.code,
                systemId: system.id,
                systemName: system.name,
                executionId: executionId,
                executionType: payload.execution.type,
                executionExecutedAt: payload.execution.executedAt,
                executionMonitoringStartAt: payload.execution.monitoringStartAt,
                executionMonitoringEndAt: payload.execution.monitoringEndAt,
                numberMax: payload.messageOverview.numberMax,
                numberDays: payload.messageOverview.numberDays,
                success: payload.messageOverview.success,
                cancelled: payload.messageOverview.cancelled,
                delivering: payload.messageOverview.delivering,
                error: payload.messageOverview.error,
                holding: payload.messageOverview.holding,
                toBeDelivered: payload.messageOverview.toBeDelivered,
                waiting: payload.messageOverview.waiting
            }, { timezone }
        ));

        const channelOverviewId = Utils.uuid();
        await this.commandBus.dispatch(new CreateChannelOverviewCommand(
            {
                id: channelOverviewId,
                tenantId: tenant.id,
                tenantCode: tenant.code,
                systemId: system.id,
                systemName: system.name,
                executionId: executionId,
                executionType: payload.execution.type,
                executionExecutedAt: payload.execution.executedAt,
                executionMonitoringStartAt: payload.execution.monitoringStartAt,
                executionMonitoringEndAt: payload.execution.monitoringEndAt,
                error: payload.channelOverview.error,
                inactive: payload.channelOverview.inactive,
                successful: payload.channelOverview.successful,
                stopped: payload.channelOverview.stopped,
                unknown: payload.channelOverview.unknown,
                unregistered: payload.channelOverview.unregistered
            }, { timezone }
        ));

        const jobOverviewId = Utils.uuid();
        await this.commandBus.dispatch(new CreateJobOverviewCommand(
            {
                id: jobOverviewId,
                tenantId: tenant.id,
                tenantCode: tenant.code,
                systemId: system.id,
                systemName: system.name,
                executionId: executionId,
                executionType: payload.execution.type,
                executionExecutedAt: payload.execution.executedAt,
                executionMonitoringStartAt: payload.execution.monitoringStartAt,
                executionMonitoringEndAt: payload.execution.monitoringEndAt,
                cancelled: payload.jobOverview.cancelled,
                completed: payload.jobOverview.completed,
                error: payload.jobOverview.error
            }, { timezone }
        ));

        const messagesDetail = payload.messagesDetail.map(message => {
            return {
                id: Utils.uuid(),
                tenantId: tenant.id,
                tenantCode: tenant.code,
                systemId: system.id,
                systemName: system.name,
                scenario: message.scenario,
                executionId: executionId,
                executionType: payload.execution.type,
                executionExecutedAt: payload.execution.executedAt,
                executionMonitoringStartAt: payload.execution.monitoringStartAt,
                executionMonitoringEndAt: payload.execution.monitoringEndAt,
                flowHash: Utils.sha1(
                    tenant.code +
                    system.name +
                    (message.flowParty ? message.flowParty : '') +
                    (message.flowReceiverParty ? message.flowReceiverParty : '') +
                    message.flowComponent +
                    (message.flowReceiverComponent ? message.flowReceiverComponent : '') +
                    message.flowInterfaceName +
                    message.flowInterfaceNamespace
                ),
                flowParty: message.flowParty,
                flowReceiverParty: message.flowReceiverParty,
                flowComponent: message.flowComponent,
                flowReceiverComponent: message.flowReceiverComponent,
                flowInterfaceName: message.flowInterfaceName,
                flowInterfaceNamespace: message.flowInterfaceNamespace,
                status: message.status,
                detail: Utils.base64Decode(message.detail),
                example: message.example,
                startTimeAt: message.startTimeAt,
                direction: message.direction,
                errorCategory: message.errorCategory,
                errorCode: message.errorCode,
                errorLabel: message.errorLabel,
                node: message.node,
                protocol: message.protocol,
                qualityOfService: message.qualityOfService,
                receiverParty: message.receiverParty,
                receiverComponent: message.receiverComponent,
                receiverInterface: message.receiverInterface,
                receiverInterfaceNamespace: message.receiverInterfaceNamespace,
                retries: message.retries,
                size: message.size,
                timesFailed: message.timesFailed,
                numberMax: payload.messageOverview.numberMax,
                numberDays: payload.messageOverview.numberDays,
            }
        });
        await this.commandBus.dispatch(new DeleteMessagesDetailCommand({
            where: {
                tenantId: tenant.id,
                systemId: system.id,
                createdAt: {
                    [Operator.lt]: Utils.now().subtract(3, 'days').format('YYYY-MM-DD')
                }
            },
            limit: 15000
        }, {}, { timezone }));
        await this.commandBus.dispatch(new CreateMessagesDetailCommand(messagesDetail, { timezone }))

        const channelsDetail = payload.channelsDetail.map(channel => {
            return {
                id: Utils.uuid(),
                tenantId: tenant.id,
                tenantCode: tenant.code,
                systemId: system.id,
                systemName: system.name,
                executionId: executionId,
                executionType: payload.execution.type,
                executionExecutedAt: payload.execution.executedAt,
                executionMonitoringStartAt: payload.execution.monitoringStartAt,
                executionMonitoringEndAt: payload.execution.monitoringEndAt,
                status: channel.status,
                channelHash: Utils.sha1(
                    tenant.code +
                    system.name +
                    (channel.channelParty ? channel.channelParty : '') +
                    channel.channelComponent +
                    channel.channelName
                ),
                channelSapId: channel.channelSapId,
                channelParty: channel.channelParty,
                channelComponent: channel.channelComponent,
                channelName: channel.channelName,
                detail: Utils.base64Decode(channel.detail)
            }
        });
        await this.commandBus.dispatch(new DeleteChannelsDetailCommand({
            where: {
                tenantId: tenant.id,
                systemId: system.id,
                createdAt: {
                    [Operator.lt]: Utils.now().subtract(3, 'days').format('YYYY-MM-DD')
                }
            },
            limit: 15000
        }, {}, { timezone }));
        await this.commandBus.dispatch(new CreateChannelsDetailCommand(channelsDetail, { timezone }));

        const jobsDetail = payload.jobsDetail.map(job => {
            return {
                id: Utils.uuid(),
                tenantId: tenant.id,
                tenantCode: tenant.code,
                systemId: system.id,
                systemName: system.name,
                executionId: executionId,
                executionType: payload.execution.type,
                executionExecutedAt: payload.execution.executedAt,
                executionMonitoringStartAt: payload.execution.monitoringStartAt,
                executionMonitoringEndAt: payload.execution.monitoringEndAt,
                status: job.status,
                name: job.name,
                returnCode: job.returnCode,
                node: job.node,
                user: job.user,
                startAt: job.startAt,
                endAt: job.endAt
            }
        });
        await this.commandBus.dispatch(new DeleteJobsDetailCommand({
            where: {
                tenantId: tenant.id,
                systemId: system.id,
                createdAt: {
                    [Operator.lt]: Utils.now().subtract(3, 'days').format('YYYY-MM-DD')
                }
            },
            limit: 15000
        }, {}, { timezone }));
        await this.commandBus.dispatch(new CreateJobsDetailCommand(jobsDetail, { timezone }));

        return {
            statusCode: 200,
            message: 'Snapshot successfully registered'
        };
    }
}