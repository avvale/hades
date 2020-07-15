import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindChannelDetailQuery } from '@hades/bplus-it-sappi/channel-detail/application/find/find-channel-detail.query';
import { BplusItSappiChannelDetail } from './../../../../graphql';

@Resolver()
export class FindChannelDetailResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindChannelDetail')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiChannelDetail>
    {
        return await this.queryBus.ask(new FindChannelDetailQuery(queryStatements));
    }
}