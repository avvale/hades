import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTagByIdCommand } from './delete-tag-by-id.command';
import { DeleteTagByIdService } from './delete-tag-by-id.service';
import { 
    TagId
} from './../../domain/value-objects';

@CommandHandler(DeleteTagByIdCommand)
export class DeleteTagByIdCommandHandler implements ICommandHandler<DeleteTagByIdCommand>
{
    constructor(
        private readonly deleteTagByIdService: DeleteTagByIdService
    ) { }

    async execute(command: DeleteTagByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteTagByIdService.main(
            new TagId(command.id)
        );
    }
}