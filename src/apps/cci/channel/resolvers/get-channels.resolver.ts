import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetChannelsQuery } from '@hades/cci/channel/application/get/get-channels.query';
import { CciChannel } from './../../../../graphql';

@Resolver()
export class GetChannelsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciGetChannels')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciChannel[]>
    {
        return await this.queryBus.ask(new GetChannelsQuery(queryStatement));
    }
}