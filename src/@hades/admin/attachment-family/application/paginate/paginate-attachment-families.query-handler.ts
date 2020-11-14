import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateAttachmentFamiliesQuery } from './paginate-attachment-families.query';
import { PaginateAttachmentFamiliesService } from './paginate-attachment-families.service';

@QueryHandler(PaginateAttachmentFamiliesQuery)
export class PaginateAttachmentFamiliesQueryHandler implements IQueryHandler<PaginateAttachmentFamiliesQuery>
{
    constructor(
        private readonly paginateAttachmentFamiliesService: PaginateAttachmentFamiliesService,
    ) {}

    async execute(query: PaginateAttachmentFamiliesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAttachmentFamiliesService.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}