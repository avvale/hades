import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelDetailByIdQuery } from '@hades/bplus-it-sappi/channel-detail/application/find/find-channel-detail-by-id.query';
import { BplusItSappiChannelDetail } from './../../../../graphql';

@Resolver()
export class FindChannelDetailByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindChannelDetailById')
    async main(@Args('id') id: string): Promise<BplusItSappiChannelDetail>
    {
        return await this.queryBus.ask(new FindChannelDetailByIdQuery(id));
    }
}