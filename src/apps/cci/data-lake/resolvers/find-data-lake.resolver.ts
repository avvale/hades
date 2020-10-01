import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindDataLakeQuery } from '@hades/cci/data-lake/application/find/find-data-lake.query';
import { CciDataLake } from './../../../../graphql';

@Resolver()
export class FindDataLakeResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindDataLake')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciDataLake>
    {
        return await this.queryBus.ask(new FindDataLakeQuery(queryStatement));
    }
}