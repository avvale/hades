import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginatePartnersQuery } from './paginate-partners.query';
import { PaginatePartnersService } from './paginate-partners.service';

@QueryHandler(PaginatePartnersQuery)
export class PaginatePartnersQueryHandler implements IQueryHandler<PaginatePartnersQuery>
{
    constructor(
        private readonly paginatePartnersService: PaginatePartnersService,
    ) {}

    async execute(query: PaginatePartnersQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginatePartnersService.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}