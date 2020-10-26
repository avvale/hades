import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginatePermissionsQuery } from './paginate-permissions.query';
import { PaginatePermissionsService } from './paginate-permissions.service';

@QueryHandler(PaginatePermissionsQuery)
export class PaginatePermissionsQueryHandler implements IQueryHandler<PaginatePermissionsQuery>
{
    constructor(
        private readonly paginatePermissionsService: PaginatePermissionsService
    ) {}

    async execute(query: PaginatePermissionsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginatePermissionsService.main(query.queryStatement, query.constraint);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}