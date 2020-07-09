import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TagResponse } from './../../domain/tag.response';
import { TagId } from './../../domain/value-objects';
import { FindTagByIdQuery } from './find-tag-by-id.query';
import { FindTagByIdService } from './find-tag-by-id.service';

@QueryHandler(FindTagByIdQuery)
export class FindTagByIdQueryHandler implements IQueryHandler<FindTagByIdQuery>
{
    constructor(
        private readonly findTagByIdService: FindTagByIdService
    ) { }

    async execute(query: FindTagByIdQuery): Promise<TagResponse>
    {
        const tag = await this.findTagByIdService.main(new TagId(query.id));

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