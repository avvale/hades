import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LangResponse } from './../../domain/lang.response';
import { GetLangsQuery } from './get-langs.query';
import { GetLangsService } from './get-langs.service';

@QueryHandler(GetLangsQuery)
export class GetLangsQueryHandler implements IQueryHandler<GetLangsQuery>
{
    constructor(
        private readonly getLangsService: GetLangsService
    ) { }

    async execute(query: GetLangsQuery): Promise<LangResponse[]>
    {
        return (await this.getLangsService.main(query.queryStatements)).map(lang => new LangResponse(
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
                lang.deletedAt.value,
                
            ));
    }
}