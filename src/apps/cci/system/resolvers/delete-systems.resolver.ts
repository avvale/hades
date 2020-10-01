import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetSystemsQuery } from '@hades/cci/system/application/get/get-systems.query';
import { DeleteSystemsCommand } from '@hades/cci/system/application/delete/delete-systems.command';

@Resolver()
export class DeleteSystemsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteSystems')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const systems = await this.queryBus.ask(new GetSystemsQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteSystemsCommand(queryStatement));

        return systems;
    }
}