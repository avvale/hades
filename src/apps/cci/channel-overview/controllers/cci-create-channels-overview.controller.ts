import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ChannelOverviewDto } from './../dto/channel-overview.dto';
import { CreateChannelOverviewDto } from './../dto/create-channel-overview.dto';
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
import { CreateChannelsOverviewCommand } from '@hades/cci/channel-overview/application/create/create-channels-overview.command';

@ApiTags('[cci] channel-overview')
@Controller('cci/channels-overview')
@Permissions('cci.channelOverview.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateChannelsOverviewController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create channels-overview in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ChannelOverviewDto] })
    @ApiBody({ type: [CreateChannelOverviewDto] })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateChannelOverviewDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateChannelsOverviewCommand(payload, { timezone }));
    }
}