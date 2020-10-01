import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteContactsCommand } from './delete-contacts.command';
import { DeleteContactsService } from './delete-contacts.service';

@CommandHandler(DeleteContactsCommand)
export class DeleteContactsCommandHandler implements ICommandHandler<DeleteContactsCommand>
{
    constructor(
        private readonly deleteContactsService: DeleteContactsService
    ) { }

    async execute(command: DeleteContactsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteContactsService.main(command.queryStatement);
    }
}