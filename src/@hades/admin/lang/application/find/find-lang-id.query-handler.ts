import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import { LangResponse } from './../../domain/lang.response';
import { FindLangIdQuery } from './find-lang-id.query';
import { LangFinderService } from './lang-finder.service';

@QueryHandler(FindLangIdQuery)
export class FindLangIdQueryHandler implements IQueryHandler<FindLangIdQuery>
{
    constructor(
        private readonly langFinderService: LangFinderService
    ) { }

    async execute(query: FindLangIdQuery): Promise<LangResponse>
    {
        const lang = await this.langFinderService.main([
            {
                command:    Command.WHERE,
                column:     'id',
                operator:   Operator.EQUALS,
                value:      query.id
            }
        ]);

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