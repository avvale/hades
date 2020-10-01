import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetModulesQuery } from '@hades/cci/module/application/get/get-modules.query';
import { DeleteModulesCommand } from '@hades/cci/module/application/delete/delete-modules.command';

@Resolver()
export class DeleteModulesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteModules')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const modules = await this.queryBus.ask(new GetModulesQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteModulesCommand(queryStatement));

        return modules;
    }
}