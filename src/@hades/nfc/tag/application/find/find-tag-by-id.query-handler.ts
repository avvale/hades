import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TagResponse } from './../../domain/tag.response';
import { TagMapper } from './../../domain/tag.mapper';
import { TagId } from './../../domain/value-objects';
import { FindTagByIdQuery } from './find-tag-by-id.query';
import { FindTagByIdService } from './find-tag-by-id.service';

@QueryHandler(FindTagByIdQuery)
export class FindTagByIdQueryHandler implements IQueryHandler<FindTagByIdQuery>
{
    private readonly mapper: TagMapper = new TagMapper();

    constructor(
        private readonly findTagByIdService: FindTagByIdService
    ) { }

    async execute(query: FindTagByIdQuery): Promise<TagResponse>
    {
        const tag = await this.findTagByIdService.main(new TagId(query.id));

        return this.mapper.mapAggregateToResponse(tag);
    }
}