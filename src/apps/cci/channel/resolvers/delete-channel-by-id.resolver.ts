import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelByIdQuery } from '@hades/cci/channel/application/find/find-channel-by-id.query';
import { DeleteChannelByIdCommand } from '@hades/cci/channel/application/delete/delete-channel-by-id.command';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('cci.channel.delete')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class DeleteChannelByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteChannelById')
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Args('id') id: string, @Args('constraint') constraint?: QueryStatement, )
    {
        const channel = await this.queryBus.ask(new FindChannelByIdQuery(id, constraint));

        await this.commandBus.dispatch(new DeleteChannelByIdCommand(id, constraint));

        return channel;
    }
}