import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindDataLakeQuery } from '@hades/bplus-it-sappi/data-lake/application/find/find-data-lake.query';
import { BplusItSappiDataLake } from './../../../../graphql';

@Resolver()
export class FindDataLakeResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindDataLake')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiDataLake>
    {
        return await this.queryBus.ask(new FindDataLakeQuery(queryStatements));
    }
}