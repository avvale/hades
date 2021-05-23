import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
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
import { CreateContactsCommand } from '@hades/cci/contact/application/create/create-contacts.command';
import { CciCreateContactInput } from './../../../../graphql';

@Resolver()
@Permissions('cci.contact.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateContactsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('cciCreateContacts')
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('payload') payload: CciCreateContactInput[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateContactsCommand(payload, { timezone }));
        return true;
    }
}