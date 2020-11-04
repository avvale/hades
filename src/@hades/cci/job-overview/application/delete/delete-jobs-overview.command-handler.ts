import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteJobsOverviewCommand } from './delete-jobs-overview.command';
import { DeleteJobsOverviewService } from './delete-jobs-overview.service';

@CommandHandler(DeleteJobsOverviewCommand)
export class DeleteJobsOverviewCommandHandler implements ICommandHandler<DeleteJobsOverviewCommand>
{
    constructor(
        private readonly deleteJobsOverviewService: DeleteJobsOverviewService,
    ) {}

    async execute(command: DeleteJobsOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteJobsOverviewService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}