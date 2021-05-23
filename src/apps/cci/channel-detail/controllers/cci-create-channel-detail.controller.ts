import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateChannelDetailDto } from './../dto/create-channel-detail.dto';
import { ChannelDetailDto } from './../dto/channel-detail.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { TenantPolicy } from '@hades/iam/shared/domain/decorators/tenant-policy.decorator';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelDetailByIdQuery } from '@hades/cci/channel-detail/application/find/find-channel-detail-by-id.query';
import { CreateChannelDetailCommand } from '@hades/cci/channel-detail/application/create/create-channel-detail.command';

@ApiTags('[cci] channel-detail')
@Controller('cci/channel-detail')
@Permissions('cci.channelDetail.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateChannelDetailController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create channel-detail' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ChannelDetailDto })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateChannelDetailDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateChannelDetailCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindChannelDetailByIdQuery(payload.id, {}, { timezone }));
    }
}