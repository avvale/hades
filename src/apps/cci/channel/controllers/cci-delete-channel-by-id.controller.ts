import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
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
import { FindChannelByIdQuery } from '@hades/cci/channel/application/find/find-channel-by-id.query';
import { DeleteChannelByIdCommand } from '@hades/cci/channel/application/delete/delete-channel-by-id.command';

@ApiTags('[cci] channel')
@Controller('cci/channel')
@Permissions('cci.channel.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciDeleteChannelByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete channel by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: ChannelDto })
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const channel = await this.queryBus.ask(new FindChannelByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteChannelByIdCommand(id, constraint, { timezone }));

        return channel;
    }
}