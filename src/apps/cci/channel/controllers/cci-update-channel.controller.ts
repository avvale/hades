import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateChannelDto } from './../dto/update-channel.dto';
import { ChannelDto } from './../dto/channel.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { TenantConstraint } from '@hades/iam/shared/domain/decorators/tenant-constraint.decorator';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateChannelCommand } from '@hades/cci/channel/application/update/update-channel.command';
import { FindChannelByIdQuery } from '@hades/cci/channel/application/find/find-channel-by-id.query';

@ApiTags('[cci] channel')
@Controller('cci/channel')
@Permissions('cci.channel.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciUpdateChannelController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update channel' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: ChannelDto})
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: UpdateChannelDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateChannelCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindChannelByIdQuery(payload.id, constraint, { timezone }));
    }
}