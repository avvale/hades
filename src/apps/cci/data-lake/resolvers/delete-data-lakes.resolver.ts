import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetDataLakesQuery } from '@hades/cci/data-lake/application/get/get-data-lakes.query';
import { DeleteDataLakesCommand } from '@hades/cci/data-lake/application/delete/delete-data-lakes.command';

@Resolver()
export class DeleteDataLakesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteDataLakes')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const dataLakes = await this.queryBus.ask(new GetDataLakesQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteDataLakesCommand(queryStatement));

        return dataLakes;
    }
}