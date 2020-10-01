import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteJobOverviewByIdCommand } from './delete-job-overview-by-id.command';
import { DeleteJobOverviewByIdService } from './delete-job-overview-by-id.service';
import { 
    JobOverviewId
} from './../../domain/value-objects';

@CommandHandler(DeleteJobOverviewByIdCommand)
export class DeleteJobOverviewByIdCommandHandler implements ICommandHandler<DeleteJobOverviewByIdCommand>
{
    constructor(
        private readonly deleteJobOverviewByIdService: DeleteJobOverviewByIdService
    ) { }

    async execute(command: DeleteJobOverviewByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteJobOverviewByIdService.main(
            new JobOverviewId(command.id)
        );
    }
}