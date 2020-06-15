import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertLangsCommand } from './insert-langs.command';
import { InsertLangsService } from './insert-langs.service';
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

@CommandHandler(InsertLangsCommand)
export class InsertLangCommandHandler implements ICommandHandler<InsertLangsCommand>
{
    constructor(
        private readonly insertLangService: InsertLangsService
    ) { }

    async execute(command: InsertLangsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertLangService.main(
            command.langs
                .map(lang => { 
                    return {
                        id: new LangId(lang.id),
                        name: new LangName(lang.name),
                        image: new LangImage(lang.image),
                        iso6392: new LangIso6392(lang.iso6392),
                        iso6393: new LangIso6393(lang.iso6393),
                        ietf: new LangIetf(lang.ietf),
                        sort: new LangSort(lang.sort),
                        isActive: new LangIsActive(lang.isActive),
                    }
                })
        );
    }
}