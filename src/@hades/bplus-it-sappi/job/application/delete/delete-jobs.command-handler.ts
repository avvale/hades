import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteJobsCommand } from './delete-jobs.command';
import { DeleteJobsService } from './delete-jobs.service';

@CommandHandler(DeleteJobsCommand)
export class DeleteJobsCommandHandler implements ICommandHandler<DeleteJobsCommand>
{
    constructor(
        private readonly deleteJobsService: DeleteJobsService
    ) { }

    async execute(command: DeleteJobsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteJobsService.main(command.queryStatements);
    }
}