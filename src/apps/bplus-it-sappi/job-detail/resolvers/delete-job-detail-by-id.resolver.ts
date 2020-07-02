import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindJobDetailByIdQuery } from '@hades/bplus-it-sappi/job-detail/application/find/find-job-detail-by-id.query';
import { DeleteJobDetailByIdCommand } from '@hades/bplus-it-sappi/job-detail/application/delete/delete-job-detail-by-id.command';

@Resolver()
export class DeleteJobDetailByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteJobDetailById')
    async main(@Args('id') id: string)
    {
        const jobDetail = await this.queryBus.ask(new FindJobDetailByIdQuery(id));

        await this.commandBus.dispatch(new DeleteJobDetailByIdCommand(id));

        return jobDetail;
    }
}