import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLangCommand } from './create-lang.command';
import { CreateLangService } from './create-lang.service';
import { 
    LangId,
    LangName,
    LangImage,
    LangIso6392,
    LangIso6393,
    LangIetf,
    LangSort,
    LangIsActive
    
} from './../../domain/value-objects';

@CommandHandler(CreateLangCommand)
export class CreateLangCommandHandler implements ICommandHandler<CreateLangCommand>
{
    constructor(
        private readonly createLangService: CreateLangService
    ) { }

    async execute(command: CreateLangCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createLangService.main(
            new LangId(command.id),
            new LangName(command.name),
            new LangImage(command.image),
            new LangIso6392(command.iso6392),
            new LangIso6393(command.iso6393),
            new LangIetf(command.ietf),
            new LangSort(command.sort),
            new LangIsActive(command.isActive),
        );
    }
}