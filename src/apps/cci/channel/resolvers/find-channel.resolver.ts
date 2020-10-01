import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindChannelQuery } from '@hades/cci/channel/application/find/find-channel.query';
import { CciChannel } from './../../../../graphql';

@Resolver()
export class FindChannelResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindChannel')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciChannel>
    {
        return await this.queryBus.ask(new FindChannelQuery(queryStatement));
    }
}