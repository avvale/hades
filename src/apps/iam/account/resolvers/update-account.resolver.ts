import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamUpdateAccountInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateAccountCommand } from '@hades/iam/account/application/update/update-account.command';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';

@Resolver()
export class UpdateAccountResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamUpdateAccount')
    async main(@Args('payload') payload: IamUpdateAccountInput)
    {
        await this.commandBus.dispatch(new UpdateAccountCommand(
            payload.id,
            payload.type,
            payload.name,
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