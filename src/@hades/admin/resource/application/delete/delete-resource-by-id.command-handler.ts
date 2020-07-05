import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteResourceByIdCommand } from './delete-resource-by-id.command';
import { DeleteResourceByIdService } from './delete-resource-by-id.service';
import { 
    ResourceId
} from './../../domain/value-objects';

@CommandHandler(DeleteResourceByIdCommand)
export class DeleteResourceByIdCommandHandler implements ICommandHandler<DeleteResourceByIdCommand>
{
    constructor(
        private readonly deleteResourceByIdService: DeleteResourceByIdService
    ) { }

    async execute(command: DeleteResourceByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteResourceByIdService.main(
            new ResourceId(command.id)
        );
    }
}