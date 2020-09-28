import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamCreateAccountInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateAccountCommand } from '@hades/iam/account/application/create/create-account.command';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';

@Resolver()
export class CreateAccountResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamCreateAccount')
    async main(@Args('payload') payload: IamCreateAccountInput)
    {
        await this.commandBus.dispatch(new CreateAccountCommand(
            payload.id,
            payload.type,
            payload.email,
            payload.isActive,
            payload.clientId,
            payload.applicationCodes,
            payload.permissions,
            payload.data,
            payload.roleIds,
            payload.tenantIds,
            
        ));
        
        return await this.queryBus.ask(new FindAccountByIdQuery(payload.id));
    }
}