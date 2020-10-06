import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamAccountType, IamUpdateAccountInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateAccountCommand } from '@hades/iam/account/application/update/update-account.command';
import { UpdateUserCommand } from '@hades/iam/user/application/update/update-user.command';
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
            payload.email,
            payload.isActive,
            payload.clientId,
            payload.applicationCodes,
            payload.permissions,
            payload.data,
            payload.roleIds,
            payload.tenantIds,
            
        ));

        if (payload.type === IamAccountType.USER)
        {
            await this.commandBus.dispatch(new UpdateUserCommand(
                payload.user.id,
                payload.id,
                payload.user.name,
                payload.user.surname,
                payload.user.avatar,
                payload.user.mobile,
                payload.user.langId,
                payload.user.username,
                payload.user.password,
                payload.user.rememberToken,
                payload.user.data,
            ));
        }
        
        return await this.queryBus.ask(new FindAccountByIdQuery(payload.id));
    }
}