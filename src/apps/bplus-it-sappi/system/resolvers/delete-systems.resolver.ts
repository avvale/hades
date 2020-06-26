import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetSystemsQuery } from '@hades/bplus-it-sappi/system/application/get/get-systems.query';
import { DeleteSystemsCommand } from '@hades/bplus-it-sappi/system/application/delete/delete-systems.command';

@Resolver()
export class DeleteSystemsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteSystems')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const systems = await this.queryBus.ask(new GetSystemsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteSystemsCommand(queryStatements));

        return systems;
    }
}