import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelByIdQuery } from '@hades/bplus-it-sappi/channel/application/find/find-channel-by-id.query';
import { BplusItSappiChannel } from './../../../../graphql';

@Resolver()
export class FindChannelByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindChannelById')
    async main(@Args('id') id: string): Promise<BplusItSappiChannel>
    {
        return await this.queryBus.ask(new FindChannelByIdQuery(id));
    }
}