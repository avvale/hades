import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindMessageDetailByIdQuery } from '@hades/bplus-it-sappi/message-detail/application/find/find-message-detail-by-id.query';
import { BplusItSappiMessageDetail } from './../../../../graphql';

@Resolver()
export class FindMessageDetailByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindMessageDetailById')
    async main(@Args('id') id: string): Promise<BplusItSappiMessageDetail>
    {
        return await this.queryBus.ask(new FindMessageDetailByIdQuery(id));
    }
}