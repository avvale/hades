import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelByIdQuery } from '@hades/cci/channel/application/find/find-channel-by-id.query';
import { CciChannel } from './../../../../graphql';

@Resolver()
export class FindChannelByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindChannelById')
    async main(@Args('id') id: string): Promise<CciChannel>
    {
        return await this.queryBus.ask(new FindChannelByIdQuery(id));
    }
}