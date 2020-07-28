import { CreateDataLakeCommand } from './../../../../@hades/bplus-it-sappi/data-lake/application/create/create-data-lake.command';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';
declare const Buffer;

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindTenantQuery } from '@hades/admin/tenant/application/find/find-tenant.query';
import { FindSystemQuery } from '@hades/bplus-it-sappi/system/application/find/find-system.query';
import { CreateMessageOverviewCommand } from '@hades/bplus-it-sappi/message-overview/application/create/create-message-overview.command';
import { CreateExecutionCommand } from '@hades/bplus-it-sappi/execution/application/create/create-execution.command';
import { CreateChannelOverviewCommand } from '@hades/bplus-it-sappi/channel-overview/application/create/create-channel-overview.command';
import { CreateSnapshotDto } from './../dto/create-snapshot.dto';
import { CreateJobOverviewCommand } from '@hades/bplus-it-sappi/job-overview/application/create/create-job-overview.command';
import { CreateMessagesDetailCommand } from '@hades/bplus-it-sappi/message-detail/application/create/create-messages-detail.command';
import { CreateChannelsDetailCommand } from '@hades/bplus-it-sappi/channel-detail/application/create/create-channels-detail.command';
import { CreateJobsDetailCommand } from '@hades/bplus-it-sappi/job-detail/application/create/create-jobs-detail.command';

@ApiTags('[bplus-it-sappi] snapshot')
@Controller('bplus-it-sappi/snapshot')
export class CreateSnapshotController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create snapshot' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: CreateSnapshotDto })
    async main(@Body() payload: CreateSnapshotDto)
    {
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

        const executionId = uuidv4();
        await this.commandBus.dispatch(new CreateExecutionCommand(
            executionId,
            tenant.id,
            tenant.code,
            system.id,
            system.name,
            payload.execution.version,
            payload.execution.type,
            payload.execution.executedAt,
            payload.execution.monitoringStartAt,
            payload.execution.monitoringEndAt
        ));

        this.commandBus.dispatch(new CreateDataLakeCommand(
            uuidv4(),
            executionId,
            tenant.id,
            tenant.code,
            payload
        ))

        const messageOverviewId = uuidv4();
        this.commandBus.dispatch(new CreateMessageOverviewCommand(
            messageOverviewId,
            tenant.id,
            tenant.code,
            system.id,
            system.name,
            executionId,
            payload.execution.type,
            payload.execution.executedAt,
            payload.execution.monitoringStartAt,
            payload.execution.monitoringEndAt,
            payload.messageOverview.numberMax,
            payload.messageOverview.numberDays,
            payload.messageOverview.success,
            payload.messageOverview.cancelled,
            payload.messageOverview.delivering,
            payload.messageOverview.error,
            payload.messageOverview.holding,
            payload.messageOverview.toBeDelivered,
            payload.messageOverview.waiting
        ));

        const channelOverviewId = uuidv4();
        this.commandBus.dispatch(new CreateChannelOverviewCommand(
            channelOverviewId,
            tenant.id,
            tenant.code,
            system.id,
            system.name,
            executionId,
            payload.execution.type,
            payload.execution.executedAt,
            payload.execution.monitoringStartAt,
            payload.execution.monitoringEndAt,
            payload.channelOverview.error,
            payload.channelOverview.inactive,
            payload.channelOverview.successful,
            payload.channelOverview.stopped,
            payload.channelOverview.unknown,
            payload.channelOverview.unregistered
        ));

        const jobOverviewId = uuidv4();
        this.commandBus.dispatch(new CreateJobOverviewCommand(
            jobOverviewId,
            tenant.id,
            tenant.code,
            system.id,
            system.name,
            executionId,
            payload.execution.type,
            payload.execution.executedAt,
            payload.execution.monitoringStartAt,
            payload.execution.monitoringEndAt,
            payload.jobOverview.cancelled,
            payload.jobOverview.completed,
            payload.jobOverview.error
        ));

        const messagesDetail = payload.messagesDetail.map(message => {
            return {
                id: uuidv4(),
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
                flowId: null,
                flowParty: message.flowParty,
                flowComponent: message.flowComponent,
                flowInterfaceName: message.flowInterfaceName,
                flowInterfaceNamespace: message.flowInterfaceNamespace,
                status: message.status,
                detail: Buffer.from(message.detail, 'base64').toString('utf-8'),
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
            }
        });
        this.commandBus.dispatch(new CreateMessagesDetailCommand(messagesDetail))

        const channelsDetail = payload.channelsDetail.map(channel => {
            return {
                id: uuidv4(),
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
                channelId: null,
                channelSapId: channel.channelSapId,
                channelParty: channel.channelParty,
                channelComponent: channel.channelComponent,
                channelName: channel.channelName,
                detail: Buffer.from(channel.detail, 'base64').toString('utf-8')
            }
        });
        this.commandBus.dispatch(new CreateChannelsDetailCommand(channelsDetail));

        const jobsDetail = payload.jobsDetail.map(job => {
            return {
                id: uuidv4(),
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
        this.commandBus.dispatch(new CreateJobsDetailCommand(jobsDetail));

        return {
            code: 200,
            status: ''
        };
    } 
}