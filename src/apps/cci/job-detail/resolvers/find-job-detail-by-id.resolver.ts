import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindJobDetailByIdQuery } from '@hades/cci/job-detail/application/find/find-job-detail-by-id.query';
import { CciJobDetail } from './../../../../graphql';

@Resolver()
export class FindJobDetailByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindJobDetailById')
    async main(@Args('id') id: string): Promise<CciJobDetail>
    {
        return await this.queryBus.ask(new FindJobDetailByIdQuery(id));
    }
}