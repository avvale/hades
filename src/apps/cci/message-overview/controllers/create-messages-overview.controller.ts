import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { MessageOverviewDto } from './../dto/message-overview.dto';
import { CreateMessageOverviewDto } from './../dto/create-message-overview.dto';

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
import { CreateMessagesOverviewCommand } from '@hades/cci/message-overview/application/create/create-messages-overview.command';

@ApiTags('[cci] message-overview')
@Controller('cci/messages-overview')
@Permissions('cci.messageOverview.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateMessagesOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create messages-overview in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [MessageOverviewDto] })
    @ApiBody({ type: [CreateMessageOverviewDto] })
    @TenantPolicy()
    async main(@CurrentAccount() account: AccountResponse, @Body() payload: CreateMessageOverviewDto[], )
    {
        await this.commandBus.dispatch(new CreateMessagesOverviewCommand(payload));
    }
}