import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteJobDetailByIdCommand } from './delete-job-detail-by-id.command';
import { DeleteJobDetailByIdService } from './delete-job-detail-by-id.service';
import {
    JobDetailId
} from './../../domain/value-objects';

@CommandHandler(DeleteJobDetailByIdCommand)
export class DeleteJobDetailByIdCommandHandler implements ICommandHandler<DeleteJobDetailByIdCommand>
{
    constructor(
        private readonly deleteJobDetailByIdService: DeleteJobDetailByIdService,
    ) {}

    async execute(command: DeleteJobDetailByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteJobDetailByIdService.main(
            new JobDetailId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}