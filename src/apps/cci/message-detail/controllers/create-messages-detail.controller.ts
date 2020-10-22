import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { MessageDetailDto } from './../dto/message-detail.dto';
import { CreateMessageDetailDto } from './../dto/create-message-detail.dto';

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
import { CreateMessagesDetailCommand } from '@hades/cci/message-detail/application/create/create-messages-detail.command';

@ApiTags('[cci] message-detail')
@Controller('cci/messages-detail')
@Permissions('cci.messageDetail.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateMessagesDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create messages-detail in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [MessageDetailDto] })
    @ApiBody({ type: [CreateMessageDetailDto] })
    @TenantPolicy()
    async main(@CurrentAccount() account: AccountResponse, @Body() payload: CreateMessageDetailDto[], )
    {
        await this.commandBus.dispatch(new CreateMessagesDetailCommand(payload));
    }
}