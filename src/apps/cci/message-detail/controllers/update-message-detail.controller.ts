import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateMessageDetailDto } from './../dto/update-message-detail.dto';
import { MessageDetailDto } from './../dto/message-detail.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateMessageDetailCommand } from '@hades/cci/message-detail/application/update/update-message-detail.command';
import { FindMessageDetailByIdQuery } from '@hades/cci/message-detail/application/find/find-message-detail-by-id.query';

@ApiTags('[cci] message-detail')
@Controller('cci/message-detail')
@Permissions('cci.messageDetail.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class UpdateMessageDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update message-detail' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: MessageDetailDto})
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Body() payload: UpdateMessageDetailDto, @Body('constraint') constraint?: QueryStatement, )
    {
        await this.commandBus.dispatch(new UpdateMessageDetailCommand(
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
            constraint,
        ));

        return await this.queryBus.ask(new FindMessageDetailByIdQuery(payload.id, constraint));
    }
}