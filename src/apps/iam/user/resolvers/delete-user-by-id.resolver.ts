import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindUserByIdQuery } from '@hades/iam/user/application/find/find-user-by-id.query';
import { DeleteUserByIdCommand } from '@hades/iam/user/application/delete/delete-user-by-id.command';

@Resolver()
export class DeleteUserByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamDeleteUserById')
    async main(@Args('id') id: string)
    {
        const user = await this.queryBus.ask(new FindUserByIdQuery(id));

        await this.commandBus.dispatch(new DeleteUserByIdCommand(id));

        return user;
    }
}