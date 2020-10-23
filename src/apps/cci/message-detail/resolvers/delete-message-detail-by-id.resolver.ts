import { Resolver, Args, Mutation } from '@nestjs/graphql';

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
import { FindMessageDetailByIdQuery } from '@hades/cci/message-detail/application/find/find-message-detail-by-id.query';
import { DeleteMessageDetailByIdCommand } from '@hades/cci/message-detail/application/delete/delete-message-detail-by-id.command';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('cci.messageDetail.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class DeleteMessageDetailByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteMessageDetailById')
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Args('id') id: string, @Args('constraint') constraint?: QueryStatement, )
    {
        const messageDetail = await this.queryBus.ask(new FindMessageDetailByIdQuery(id, constraint));

        await this.commandBus.dispatch(new DeleteMessageDetailByIdCommand(id, constraint));

        return messageDetail;
    }
}