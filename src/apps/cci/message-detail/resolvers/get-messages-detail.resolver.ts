import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetMessagesDetailQuery } from '@hades/cci/message-detail/application/get/get-messages-detail.query';
import { CciMessageDetail } from './../../../../graphql';

@Resolver()
export class GetMessagesDetailResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciGetMessagesDetail')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciMessageDetail[]>
    {
        return await this.queryBus.ask(new GetMessagesDetailQuery(queryStatement));
    }
}