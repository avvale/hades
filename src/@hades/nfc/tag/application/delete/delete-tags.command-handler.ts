import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTagsCommand } from './delete-tags.command';
import { DeleteTagsService } from './delete-tags.service';

@CommandHandler(DeleteTagsCommand)
export class DeleteTagsCommandHandler implements ICommandHandler<DeleteTagsCommand>
{
    constructor(
        private readonly deleteTagsService: DeleteTagsService
    ) { }

    async execute(command: DeleteTagsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteTagsService.main(command.queryStatements);
    }
}