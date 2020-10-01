import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetDataLakesQuery } from '@hades/cci/data-lake/application/get/get-data-lakes.query';
import { CciDataLake } from './../../../../graphql';

@Resolver()
export class GetDataLakesResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciGetDataLakes')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciDataLake[]>
    {
        return await this.queryBus.ask(new GetDataLakesQuery(queryStatement));
    }
}