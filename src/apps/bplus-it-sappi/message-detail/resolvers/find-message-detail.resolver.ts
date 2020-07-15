import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindMessageDetailQuery } from '@hades/bplus-it-sappi/message-detail/application/find/find-message-detail.query';
import { BplusItSappiMessageDetail } from './../../../../graphql';

@Resolver()
export class FindMessageDetailResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindMessageDetail')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiMessageDetail>
    {
        return await this.queryBus.ask(new FindMessageDetailQuery(queryStatements));
    }
}