import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteContactByIdCommand } from './delete-contact-by-id.command';
import { DeleteContactByIdService } from './delete-contact-by-id.service';
import { 
    ContactId
} from './../../domain/value-objects';

@CommandHandler(DeleteContactByIdCommand)
export class DeleteContactByIdCommandHandler implements ICommandHandler<DeleteContactByIdCommand>
{
    constructor(
        private readonly deleteContactByIdService: DeleteContactByIdService
    ) { }

    async execute(command: DeleteContactByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteContactByIdService.main(
            new ContactId(command.id)
        );
    }
}