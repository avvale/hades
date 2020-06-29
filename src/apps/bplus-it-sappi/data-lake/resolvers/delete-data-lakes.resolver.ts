import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetDataLakesQuery } from '@hades/bplus-it-sappi/data-lake/application/get/get-data-lakes.query';
import { DeleteDataLakesCommand } from '@hades/bplus-it-sappi/data-lake/application/delete/delete-data-lakes.command';

@Resolver()
export class DeleteDataLakesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteDataLakes')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const dataLakes = await this.queryBus.ask(new GetDataLakesQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteDataLakesCommand(queryStatements));

        return dataLakes;
    }
}