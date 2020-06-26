import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetModulesQuery } from '@hades/admin/module/application/get/get-modules.query';
import { DeleteModulesCommand } from '@hades/admin/module/application/delete/delete-modules.command';

@Resolver()
export class DeleteModulesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminDeleteModules')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const modules = await this.queryBus.ask(new GetModulesQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteModulesCommand(queryStatements));

        return modules;
    }
}