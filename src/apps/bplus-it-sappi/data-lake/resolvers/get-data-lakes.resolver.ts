import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetDataLakesQuery } from '@hades/bplus-it-sappi/data-lake/application/get/get-data-lakes.query';
import { BplusItSappiDataLake } from './../../../../graphql';

@Resolver()
export class GetDataLakesResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiGetDataLakes')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiDataLake[]>
    {
        return await this.queryBus.ask(new GetDataLakesQuery(queryStatements));
    }
}