import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamCreateUserInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateUserCommand } from '@hades/iam/user/application/create/create-user.command';
import { FindUserByIdQuery } from '@hades/iam/user/application/find/find-user-by-id.query';

@Resolver()
export class CreateUserResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamCreateUser')
    async main(@Args('payload') payload: IamCreateUserInput)
    {
        await this.commandBus.dispatch(new CreateUserCommand(
            payload.id,
            payload.accountId,
            payload.surname,
            payload.avatar,
            payload.email,
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