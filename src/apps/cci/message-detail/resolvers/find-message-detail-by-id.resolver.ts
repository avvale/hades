import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindMessageDetailByIdQuery } from '@hades/cci/message-detail/application/find/find-message-detail-by-id.query';
import { CciMessageDetail } from './../../../../graphql';

@Resolver()
export class FindMessageDetailByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindMessageDetailById')
    async main(@Args('id') id: string): Promise<CciMessageDetail>
    {
        return await this.queryBus.ask(new FindMessageDetailByIdQuery(id));
    }
}