import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindMessageDetailQuery } from '@hades/cci/message-detail/application/find/find-message-detail.query';
import { CciMessageDetail } from './../../../../graphql';

@Resolver()
export class FindMessageDetailResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindMessageDetail')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciMessageDetail>
    {
        return await this.queryBus.ask(new FindMessageDetailQuery(queryStatement));
    }
}