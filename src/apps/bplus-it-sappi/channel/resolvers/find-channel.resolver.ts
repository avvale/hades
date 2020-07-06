import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindChannelQuery } from '@hades/bplus-it-sappi/channel/application/find/find-channel.query';
import { BplusItSappiChannel } from './../../../../graphql';

@Resolver()
export class FindChannelResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindChannel')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiChannel>
    {
        return await this.queryBus.ask(new FindChannelQuery(queryStatements));
    }
}