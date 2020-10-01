import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindJobDetailByIdQuery } from '@hades/cci/job-detail/application/find/find-job-detail-by-id.query';
import { DeleteJobDetailByIdCommand } from '@hades/cci/job-detail/application/delete/delete-job-detail-by-id.command';

@Resolver()
export class DeleteJobDetailByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteJobDetailById')
    async main(@Args('id') id: string)
    {
        const jobDetail = await this.queryBus.ask(new FindJobDetailByIdQuery(id));

        await this.commandBus.dispatch(new DeleteJobDetailByIdCommand(id));

        return jobDetail;
    }
}