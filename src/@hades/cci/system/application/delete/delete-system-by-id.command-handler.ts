import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSystemByIdCommand } from './delete-system-by-id.command';
import { DeleteSystemByIdService } from './delete-system-by-id.service';
import { 
    SystemId
} from './../../domain/value-objects';

@CommandHandler(DeleteSystemByIdCommand)
export class DeleteSystemByIdCommandHandler implements ICommandHandler<DeleteSystemByIdCommand>
{
    constructor(
        private readonly deleteSystemByIdService: DeleteSystemByIdService
    ) { }

    async execute(command: DeleteSystemByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteSystemByIdService.main(
            new SystemId(command.id)
        );
    }
}