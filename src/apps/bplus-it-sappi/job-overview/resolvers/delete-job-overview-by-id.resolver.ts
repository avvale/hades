import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindJobOverviewByIdQuery } from '@hades/bplus-it-sappi/job-overview/application/find/find-job-overview-by-id.query';
import { DeleteJobOverviewByIdCommand } from '@hades/bplus-it-sappi/job-overview/application/delete/delete-job-overview-by-id.command';

@Resolver()
export class DeleteJobOverviewByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteJobOverviewById')
    async main(@Args('id') id: string)
    {
        const jobOverview = await this.queryBus.ask(new FindJobOverviewByIdQuery(id));

        await this.commandBus.dispatch(new DeleteJobOverviewByIdCommand(id));

        return jobOverview;
    }
}