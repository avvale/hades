import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindModuleQuery } from '@hades/bplus-it-sappi/module/application/find/find-module.query';
import { BplusItSappiModule } from './../../../../graphql';

@Resolver()
export class FindModuleResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindModule')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiModule>
    {
        return await this.queryBus.ask(new FindModuleQuery(queryStatements));
    }
}