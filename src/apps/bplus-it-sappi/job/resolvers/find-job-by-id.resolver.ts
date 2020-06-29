import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindJobByIdQuery } from '@hades/bplus-it-sappi/job/application/find/find-job-by-id.query';
import { BplusItSappiJob } from './../../../../graphql';

@Resolver()
export class FindJobByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindJobById')
    async main(@Args('id') id: string): Promise<BplusItSappiJob>
    {
        return await this.queryBus.ask(new FindJobByIdQuery(id));
    }
}