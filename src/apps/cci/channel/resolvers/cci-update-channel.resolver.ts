import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
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
import { CciUpdateChannelInput } from './../../../../graphql';

@Resolver()
@Permissions('cci.channel.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciUpdateChannelResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('cciUpdateChannel')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('payload') payload: CciUpdateChannelInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateChannelCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindChannelByIdQuery(payload.id, constraint, { timezone }));
    }
}