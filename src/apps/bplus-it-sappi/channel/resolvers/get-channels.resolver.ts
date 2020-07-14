import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetChannelsQuery } from '@hades/bplus-it-sappi/channel/application/get/get-channels.query';
import { BplusItSappiChannel } from './../../../../graphql';

@Resolver()
export class GetChannelsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiGetChannels')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiChannel[]>
    {
        return await this.queryBus.ask(new GetChannelsQuery(queryStatements));
    }
}