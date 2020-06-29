import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteJobByIdCommand } from './delete-job-by-id.command';
import { DeleteJobByIdService } from './delete-job-by-id.service';
import { 
    JobId
} from './../../domain/value-objects';

@CommandHandler(DeleteJobByIdCommand)
export class DeleteJobByIdCommandHandler implements ICommandHandler<DeleteJobByIdCommand>
{
    constructor(
        private readonly deleteJobByIdService: DeleteJobByIdService
    ) { }

    async execute(command: DeleteJobByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteJobByIdService.main(
            new JobId(command.id)
        );
    }
}