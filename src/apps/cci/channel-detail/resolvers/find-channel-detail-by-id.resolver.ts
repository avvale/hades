import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelDetailByIdQuery } from '@hades/cci/channel-detail/application/find/find-channel-detail-by-id.query';
import { CciChannelDetail } from './../../../../graphql';

@Resolver()
export class FindChannelDetailByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindChannelDetailById')
    async main(@Args('id') id: string): Promise<CciChannelDetail>
    {
        return await this.queryBus.ask(new FindChannelDetailByIdQuery(id));
    }
}