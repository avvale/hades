import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateAccountsCommand } from '@hades/iam/account/application/create/create-accounts.command';
import { IamCreateAccountInput } from './../../../../graphql';

@Resolver()
@Permissions('iam.account.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateAccountsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamCreateAccounts')
    async main(@Args('payload') payload: IamCreateAccountInput[])
    {
        await this.commandBus.dispatch(new CreateAccountsCommand(payload));
        return true;
    }
}