import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindSystemQuery } from '@hades/bplus-it-sappi/system/application/find/find-system.query';
import { BplusItSappiSystem } from './../../../../graphql';

@Resolver()
export class FindSystemResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindSystem')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiSystem>
    {
        return await this.queryBus.ask(new FindSystemQuery(queryStatements));
    }
}