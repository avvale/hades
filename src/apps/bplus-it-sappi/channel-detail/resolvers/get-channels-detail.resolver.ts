import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetChannelsDetailQuery } from '@hades/bplus-it-sappi/channel-detail/application/get/get-channels-detail.query';
import { BplusItSappiChannelDetail } from './../../../../graphql';

@Resolver()
export class GetChannelsDetailResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiGetChannelsDetail')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiChannelDetail[]>
    {
        return await this.queryBus.ask(new GetChannelsDetailQuery(queryStatements));
    }
}