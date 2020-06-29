import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindJobByIdQuery } from '@hades/bplus-it-sappi/job/application/find/find-job-by-id.query';
import { DeleteJobByIdCommand } from '@hades/bplus-it-sappi/job/application/delete/delete-job-by-id.command';

@Resolver()
export class DeleteJobByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteJobById')
    async main(@Args('id') id: string)
    {
        const job = await this.queryBus.ask(new FindJobByIdQuery(id));

        await this.commandBus.dispatch(new DeleteJobByIdCommand(id));

        return job;
    }
}