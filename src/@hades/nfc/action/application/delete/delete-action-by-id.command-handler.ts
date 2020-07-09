import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteActionByIdCommand } from './delete-action-by-id.command';
import { DeleteActionByIdService } from './delete-action-by-id.service';
import { 
    ActionId
} from './../../domain/value-objects';

@CommandHandler(DeleteActionByIdCommand)
export class DeleteActionByIdCommandHandler implements ICommandHandler<DeleteActionByIdCommand>
{
    constructor(
        private readonly deleteActionByIdService: DeleteActionByIdService
    ) { }

    async execute(command: DeleteActionByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteActionByIdService.main(
            new ActionId(command.id)
        );
    }
}