import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteJobsDetailCommand } from './delete-jobs-detail.command';
import { DeleteJobsDetailService } from './delete-jobs-detail.service';

@CommandHandler(DeleteJobsDetailCommand)
export class DeleteJobsDetailCommandHandler implements ICommandHandler<DeleteJobsDetailCommand>
{
    constructor(
        private readonly deleteJobsDetailService: DeleteJobsDetailService,
    ) {}

    async execute(command: DeleteJobsDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteJobsDetailService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}