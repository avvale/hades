import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateLangCommand } from './update-lang.command';
import { UpdateLangService } from './update-lang.service';
import { 
    LangId, 
    LangName, 
    LangImage, 
    LangIso6392,
    LangIso6393,
    LangIetf,
    LangSort,
    LangIsActive,
    LangCreatedAt,
    LangUpdatedAt,
    LangDeletedAt 
} from './../../domain/value-objects';

@CommandHandler(UpdateLangCommand)
export class UpdateLangCommandHandler implements ICommandHandler<UpdateLangCommand>
{
    constructor(
        private readonly updateLangService: UpdateLangService
    ) { }

    async execute(command: UpdateLangCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateLangService.main(
            new LangId(command.id),
            new LangName(command.name),
            new LangImage(command.image),
            new LangIso6392(command.iso6392),
            new LangIso6393(command.iso6393),
            new LangIetf(command.ietf),
            new LangSort(command.sort),
            new LangIsActive(command.isActive)
        )
    }
}