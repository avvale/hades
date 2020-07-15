import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetMessagesDetailQuery } from '@hades/bplus-it-sappi/message-detail/application/get/get-messages-detail.query';
import { BplusItSappiMessageDetail } from './../../../../graphql';

@Resolver()
export class GetMessagesDetailResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiGetMessagesDetail')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiMessageDetail[]>
    {
        return await this.queryBus.ask(new GetMessagesDetailQuery(queryStatements));
    }
}