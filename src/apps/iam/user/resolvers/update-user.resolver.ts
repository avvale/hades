import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamUpdateUserInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateUserCommand } from '@hades/iam/user/application/update/update-user.command';
import { FindUserByIdQuery } from '@hades/iam/user/application/find/find-user-by-id.query';

@Resolver()
export class UpdateUserResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamUpdateUser')
    async main(@Args('payload') payload: IamUpdateUserInput)
    {
        await this.commandBus.dispatch(new UpdateUserCommand(
            payload.id,
            payload.accountId,
            payload.name,
            payload.surname,
            payload.avatar,
            payload.mobile,
            payload.langId,
            payload.username,
            payload.password,
            payload.rememberToken,
            payload.data,
            
        ));
        
        return await this.queryBus.ask(new FindUserByIdQuery(payload.id));
    }
}