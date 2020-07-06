import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { PaginateChannelsQuery } from '@hades/bplus-it-sappi/channel/application/paginate/paginate-channels.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateChannelsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiPaginateChannels')
    async main(@Args('query') queryStatements: QueryStatementInput[], @Args('constraint') constraint: QueryStatementInput[]): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateChannelsQuery(queryStatements, constraint));   
    }
}