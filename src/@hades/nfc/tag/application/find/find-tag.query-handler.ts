import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TagResponse } from './../../domain/tag.response';
import { TagMapper } from './../../domain/tag.mapper';
import { FindTagQuery } from './find-tag.query';
import { FindTagService } from './find-tag.service';

@QueryHandler(FindTagQuery)
export class FindTagQueryHandler implements IQueryHandler<FindTagQuery>
{
    private readonly mapper: TagMapper = new TagMapper();

    constructor(
        private readonly findTagService: FindTagService
    ) { }

    async execute(query: FindTagQuery): Promise<TagResponse>
    {
        const tag = await this.findTagService.main(query.queryStatements);

        return this.mapper.mapAggregateToResponse(tag);
    }
}