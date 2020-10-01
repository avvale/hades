import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindChannelDetailQuery } from '@hades/cci/channel-detail/application/find/find-channel-detail.query';
import { CciChannelDetail } from './../../../../graphql';

@Resolver()
export class FindChannelDetailResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindChannelDetail')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciChannelDetail>
    {
        return await this.queryBus.ask(new FindChannelDetailQuery(queryStatement));
    }
}