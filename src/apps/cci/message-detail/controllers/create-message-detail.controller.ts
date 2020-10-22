import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateMessageDetailDto } from './../dto/create-message-detail.dto';
import { MessageDetailDto } from './../dto/message-detail.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantPolicy } from './../../../shared/decorators/tenant-policy.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindMessageDetailByIdQuery } from '@hades/cci/message-detail/application/find/find-message-detail-by-id.query';
import { CreateMessageDetailCommand } from '@hades/cci/message-detail/application/create/create-message-detail.command';

@ApiTags('[cci] message-detail')
@Controller('cci/message-detail')
@Permissions('cci.messageDetail.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateMessageDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create message-detail' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: MessageDetailDto })
    @TenantPolicy()
    async main(@CurrentAccount() account: AccountResponse, @Body() payload: CreateMessageDetailDto)
    {
        await this.commandBus.dispatch(new CreateMessageDetailCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.scenario,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.flowHash,
            payload.flowParty,
            payload.flowReceiverParty,
            payload.flowComponent,
            payload.flowReceiverComponent,
            payload.flowInterfaceName,
            payload.flowInterfaceNamespace,
            payload.status,
            payload.refMessageId,
            payload.detail,
            payload.example,
            payload.startTimeAt,
            payload.direction,
            payload.errorCategory,
            payload.errorCode,
            payload.errorLabel,
            payload.node,
            payload.protocol,
            payload.qualityOfService,
            payload.receiverParty,
            payload.receiverComponent,
            payload.receiverInterface,
            payload.receiverInterfaceNamespace,
            payload.retries,
            payload.size,
            payload.timesFailed,
            payload.numberMax,
            payload.numberDays,
            
        ));

        return await this.queryBus.ask(new FindMessageDetailByIdQuery(payload.id));
    }
}