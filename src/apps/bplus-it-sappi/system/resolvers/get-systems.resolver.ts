import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetSystemsQuery } from '@hades/bplus-it-sappi/system/application/get/get-systems.query';
import { BplusItSappiSystem } from './../../../../graphql';

@Resolver()
export class GetSystemsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiGetSystems')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiSystem[]>
    {
        return await this.queryBus.ask(new GetSystemsQuery(queryStatements));
    }
}