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
import { FindContactByIdQuery } from '@hades/cci/contact/application/find/find-contact-by-id.query';
import { DeleteContactByIdCommand } from '@hades/cci/contact/application/delete/delete-contact-by-id.command';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('cci.contact.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciDeleteContactByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('cciDeleteContactById')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const contact = await this.queryBus.ask(new FindContactByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteContactByIdCommand(id, constraint, { timezone }));

        return contact;
    }
}