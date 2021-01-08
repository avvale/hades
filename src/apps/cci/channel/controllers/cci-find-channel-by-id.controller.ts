import { Controller, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ChannelDto } from './../dto/channel.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindChannelByIdQuery } from '@hades/cci/channel/application/find/find-channel-by-id.query';

@ApiTags('[cci] channel')
@Controller('cci/channel')
@Permissions('cci.channel.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciFindChannelByIdController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find channel by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ChannelDto })
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindChannelByIdQuery(id, constraint, { timezone }));
    }
}