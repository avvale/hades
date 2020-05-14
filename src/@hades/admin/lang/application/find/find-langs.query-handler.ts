import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LangResponse } from './../../domain/lang.response';
import { FindLangsQuery } from './find-langs.query';
import { LangFinderService } from './lang-finder.service';

@QueryHandler(FindLangsQuery)
export class FindLangsQueryHandler implements IQueryHandler<FindLangsQuery>
{
    constructor(
        private readonly langFinderService: LangFinderService
    ) { }

    async execute(query: FindLangsQuery): Promise<LangResponse>
    {
        const lang = await this.langFinderService.main();
        return new LangResponse(
                lang.id.value, 
                lang.name.value, 
                lang.image.value, 
                lang.iso6392.value, 
                lang.iso6393.value, 
                lang.ietf.value, 
                lang.sort.value, 
                lang.isActive.value, 
                lang.createdAt.value, 
                lang.updatedAt.value,
                lang.deletedAt.value
            );
    }
}