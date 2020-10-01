import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetChannelsDetailQuery } from '@hades/cci/channel-detail/application/get/get-channels-detail.query';
import { CciChannelDetail } from './../../../../graphql';

@Resolver()
export class GetChannelsDetailResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciGetChannelsDetail')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciChannelDetail[]>
    {
        return await this.queryBus.ask(new GetChannelsDetailQuery(queryStatement));
    }
}