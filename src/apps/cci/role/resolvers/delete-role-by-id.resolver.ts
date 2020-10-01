import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindRoleByIdQuery } from '@hades/cci/role/application/find/find-role-by-id.query';
import { DeleteRoleByIdCommand } from '@hades/cci/role/application/delete/delete-role-by-id.command';

@Resolver()
export class DeleteRoleByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteRoleById')
    async main(@Args('id') id: string)
    {
        const role = await this.queryBus.ask(new FindRoleByIdQuery(id));

        await this.commandBus.dispatch(new DeleteRoleByIdCommand(id));

        return role;
    }
}