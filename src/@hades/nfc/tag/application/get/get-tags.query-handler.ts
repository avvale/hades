import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TagResponse } from './../../domain/tag.response';
import { GetTagsQuery } from './get-tags.query';
import { GetTagsService } from './get-tags.service';

@QueryHandler(GetTagsQuery)
export class GetTagsQueryHandler implements IQueryHandler<GetTagsQuery>
{
    constructor(
        private readonly getTagsService: GetTagsService
    ) { }

    async execute(query: GetTagsQuery): Promise<TagResponse[]>
    {
        return (await this.getTagsService.main(query.queryStatements)).map(tag => new TagResponse(
                tag.id.value,
                tag.code.value,
                tag.tenantId.value,
                tag.tenantCode.value,
                tag.urlBase.value,
                tag.params.value,
                tag.offset.value,
                tag.isSessionRequired.value,
                tag.createdAt.value,
                tag.updatedAt.value,
                tag.deletedAt.value,
                
            ));
    }
}