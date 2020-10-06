import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamCreateUserInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateUsersCommand } from '@hades/iam/user/application/create/create-users.command';

@Resolver()
export class CreateUsersResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamCreateUsers')
    async main(@Args('payload') payload: IamCreateUserInput[])
    {
        //await this.commandBus.dispatch(new CreateUsersCommand(payload));
        return true;
    }
}