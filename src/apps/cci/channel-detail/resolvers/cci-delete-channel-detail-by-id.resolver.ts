import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelDetailByIdQuery } from '@hades/cci/channel-detail/application/find/find-channel-detail-by-id.query';
import { DeleteChannelDetailByIdCommand } from '@hades/cci/channel-detail/application/delete/delete-channel-detail-by-id.command';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('cci.channelDetail.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciDeleteChannelDetailByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('cciDeleteChannelDetailById')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const channelDetail = await this.queryBus.ask(new FindChannelDetailByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteChannelDetailByIdCommand(id, constraint, { timezone }));

        return channelDetail;
    }
}