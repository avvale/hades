import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetModulesQuery } from '@hades/bplus-it-sappi/module/application/get/get-modules.query';
import { BplusItSappiModule } from './../../../../graphql';

@Resolver()
export class GetModulesResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiGetModules')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiModule[]>
    {
        return await this.queryBus.ask(new GetModulesQuery(queryStatements));
    }
}