import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ChannelDto } from './../dto/channel.dto';
import { CreateChannelDto } from './../dto/create-channel.dto';

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
import { CreateChannelsCommand } from '@hades/cci/channel/application/create/create-channels.command';

@ApiTags('[cci] channel')
@Controller('cci/channels')
@Permissions('cci.channel.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateChannelsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create channels in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ChannelDto] })
    @ApiBody({ type: [CreateChannelDto] })
    @TenantPolicy()
    async main(@CurrentAccount() account: AccountResponse, @Body() payload: CreateChannelDto[], )
    {
        await this.commandBus.dispatch(new CreateChannelsCommand(payload));
    }
}