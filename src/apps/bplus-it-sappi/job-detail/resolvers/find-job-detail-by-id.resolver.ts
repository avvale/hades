import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindJobDetailByIdQuery } from '@hades/bplus-it-sappi/job-detail/application/find/find-job-detail-by-id.query';
import { BplusItSappiJobDetail } from './../../../../graphql';

@Resolver()
export class FindJobDetailByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindJobDetailById')
    async main(@Args('id') id: string): Promise<BplusItSappiJobDetail>
    {
        return await this.queryBus.ask(new FindJobDetailByIdQuery(id));
    }
}