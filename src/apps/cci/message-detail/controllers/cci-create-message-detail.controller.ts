import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateMessageDetailDto } from './../dto/create-message-detail.dto';
import { MessageDetailDto } from './../dto/message-detail.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

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
export class CciCreateMessageDetailController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create message-detail' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: MessageDetailDto })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateMessageDetailDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateMessageDetailCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindMessageDetailByIdQuery(payload.id, {}, { timezone }));
    }
}