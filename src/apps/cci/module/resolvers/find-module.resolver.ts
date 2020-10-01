import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindModuleQuery } from '@hades/cci/module/application/find/find-module.query';
import { CciModule } from './../../../../graphql';

@Resolver()
export class FindModuleResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindModule')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciModule>
    {
        return await this.queryBus.ask(new FindModuleQuery(queryStatement));
    }
}