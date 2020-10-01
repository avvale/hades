import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindTenantQuery } from '@hades/admin/tenant/application/find/find-tenant.query';
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
        // guard clause
        if (!Array.isArray(payload.messagesDetail)) throw new BadRequestException(`The property messagesDetail does not exist or is not an array`);
        if (!Array.isArray(payload.channelsDetail)) throw new BadRequestException(`The property channelsDetail does not exist or is not an array`);
        if (!Array.isArray(payload.jobsDetail)) throw new BadRequestException(`The property jobsDetail does not exist or is not an array`);

        const tenant = await this.queryBus.ask(new FindTenantQuery({
            where: { 
                code: payload.tenant.code
            }
        }));

        const system = await this.queryBus.ask(new FindSystemQuery({
            where: { 
                name: payload.system.name
            }
        }));

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

        await this.commandBus.dispatch(new CreateDataLakeCommand(
            uuidv4(),
            tenant.id,
            executionId,
            tenant.code,
            payload
        ))

        const messageOverviewId = uuidv4();
        await this.commandBus.dispatch(new CreateMessageOverviewCommand(
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
        await this.commandBus.dispatch(new CreateChannelOverviewCommand(
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
        await this.commandBus.dispatch(new CreateJobOverviewCommand(
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
        }));
        await this.commandBus.dispatch(new CreateMessagesDetailCommand(messagesDetail))

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
        }));
        await this.commandBus.dispatch(new CreateChannelsDetailCommand(channelsDetail));

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
        await this.commandBus.dispatch(new DeleteJobsDetailCommand({
            where: { 
                tenantId: tenant.id,
                systemId: system.id,
                createdAt: {
                    [Operator.lt]: Utils.now().subtract(3, 'days').format('YYYY-MM-DD')
                }
            },
            limit: 15000
        }));
        await this.commandBus.dispatch(new CreateJobsDetailCommand(jobsDetail));

        return {
            statusCode: 200,
            message: 'Snapshot successfully registered'
        };
    } 
}