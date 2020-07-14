import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetModulesQuery } from '@hades/bplus-it-sappi/module/application/get/get-modules.query';
import { DeleteModulesCommand } from '@hades/bplus-it-sappi/module/application/delete/delete-modules.command';

@Resolver()
export class DeleteModulesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteModules')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const modules = await this.queryBus.ask(new GetModulesQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteModulesCommand(queryStatements));

        return modules;
    }
}