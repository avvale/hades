import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSessionByIdCommand } from './delete-session-by-id.command';
import { DeleteSessionByIdService } from './delete-session-by-id.service';
import { 
    SessionId
} from './../../domain/value-objects';

@CommandHandler(DeleteSessionByIdCommand)
export class DeleteSessionByIdCommandHandler implements ICommandHandler<DeleteSessionByIdCommand>
{
    constructor(
        private readonly deleteSessionByIdService: DeleteSessionByIdService
    ) { }

    async execute(command: DeleteSessionByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteSessionByIdService.main(
            new SessionId(command.id)
        );
    }
}