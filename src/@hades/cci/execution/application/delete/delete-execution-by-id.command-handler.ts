import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteExecutionByIdCommand } from './delete-execution-by-id.command';
import { DeleteExecutionByIdService } from './delete-execution-by-id.service';
import {
    ExecutionId
} from './../../domain/value-objects';

@CommandHandler(DeleteExecutionByIdCommand)
export class DeleteExecutionByIdCommandHandler implements ICommandHandler<DeleteExecutionByIdCommand>
{
    constructor(
        private readonly deleteExecutionByIdService: DeleteExecutionByIdService,
    ) {}

    async execute(command: DeleteExecutionByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteExecutionByIdService.main(
            new ExecutionId(command.id)
        );
    }
}