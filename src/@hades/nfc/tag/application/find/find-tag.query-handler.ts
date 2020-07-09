import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TagResponse } from './../../domain/tag.response';
import { FindTagQuery } from './find-tag.query';
import { FindTagService } from './find-tag.service';

@QueryHandler(FindTagQuery)
export class FindTagQueryHandler implements IQueryHandler<FindTagQuery>
{
    constructor(
        private readonly findTagService: FindTagService
    ) { }

    async execute(query: FindTagQuery): Promise<TagResponse>
    {
        const tag = await this.findTagService.main(query.queryStatements);

        return new TagResponse(
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
                
            );
    }
}