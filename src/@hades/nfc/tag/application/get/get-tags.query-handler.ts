import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TagResponse } from './../../domain/tag.response';
import { TagMapper } from './../../domain/tag.mapper';
import { GetTagsQuery } from './get-tags.query';
import { GetTagsService } from './get-tags.service';

@QueryHandler(GetTagsQuery)
export class GetTagsQueryHandler implements IQueryHandler<GetTagsQuery>
{
    private readonly mapper: TagMapper = new TagMapper();

    constructor(
        private readonly getTagsService: GetTagsService
    ) { }

    async execute(query: GetTagsQuery): Promise<TagResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getTagsService.main(query.queryStatements));
    }
}