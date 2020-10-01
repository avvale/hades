import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetUsersQuery } from '@hades/iam/user/application/get/get-users.query';
import { DeleteUsersCommand } from '@hades/iam/user/application/delete/delete-users.command';

@Resolver()
export class DeleteUsersResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamDeleteUsers')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const users = await this.queryBus.ask(new GetUsersQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteUsersCommand(queryStatement));

        return users;
    }
}