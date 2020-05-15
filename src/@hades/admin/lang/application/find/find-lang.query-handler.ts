import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { LangResponse } from './../../domain/lang.response';
import { FindLangQuery } from './find-lang.query';
import { LangFinderService } from './lang-finder.service';

@QueryHandler(FindLangQuery)
export class FindLangQueryHandler implements IQueryHandler<FindLangQuery>
{
    constructor(
        private readonly langFinderService: LangFinderService
    ) { }

    async execute(query: FindLangQuery): Promise<LangResponse>
    {
        const lang = await this.langFinderService.main(query.queryStatements);

        if (!lang) throw new NotFoundException('Lang not found');

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