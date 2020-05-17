import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LangResponse } from '../../domain/lang.response';
import { GetLangsQuery } from './get-langs.query';
import { GetLangService } from './get-lang.service';

@QueryHandler(GetLangsQuery)
export class GetLangsQueryHandler implements IQueryHandler<GetLangsQuery>
{
    constructor(
        private readonly getLangService: GetLangService
    ) { }

    async execute(query: GetLangsQuery): Promise<LangResponse[]>
    {
        return (await this.getLangService.main()).map(lang => new LangResponse(
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
            ));
    }
}