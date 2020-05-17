import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteLangCommand } from './delete-lang.command';
import { DeleteLangService } from './delete-lang.service';
import { 
    LangId
} from './../../domain/value-objects';

@CommandHandler(DeleteLangCommand)
export class DeleteLangCommandHandler implements ICommandHandler<DeleteLangCommand>
{
    constructor(
        private readonly deleteLangService: DeleteLangService
    ) { }

    async execute(command: DeleteLangCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteLangService.main(
            new LangId(command.id)
        )
    }
}