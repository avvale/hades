import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetSystemsQuery } from '@hades/cci/system/application/get/get-systems.query';
import { CciSystem } from './../../../../graphql';

@Resolver()
export class GetSystemsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciGetSystems')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciSystem[]>
    {
        return await this.queryBus.ask(new GetSystemsQuery(queryStatement));
    }
}