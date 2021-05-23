import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateChannelDto } from './../dto/create-channel.dto';
import { ChannelDto } from './../dto/channel.dto';
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
import { FindChannelByIdQuery } from '@hades/cci/channel/application/find/find-channel-by-id.query';
import { CreateChannelCommand } from '@hades/cci/channel/application/create/create-channel.command';

@ApiTags('[cci] channel')
@Controller('cci/channel')
@Permissions('cci.channel.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateChannelController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create channel' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ChannelDto })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateChannelDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateChannelCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindChannelByIdQuery(payload.id, {}, { timezone }));
    }
}