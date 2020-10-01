import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindSystemQuery } from '@hades/cci/system/application/find/find-system.query';
import { CciSystem } from './../../../../graphql';

@Resolver()
export class FindSystemResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindSystem')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciSystem>
    {
        return await this.queryBus.ask(new FindSystemQuery(queryStatement));
    }
}