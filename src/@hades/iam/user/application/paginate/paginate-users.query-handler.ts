import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateUsersQuery } from './paginate-users.query';
import { PaginateUsersService } from './paginate-users.service';

@QueryHandler(PaginateUsersQuery)
export class PaginateUsersQueryHandler implements IQueryHandler<PaginateUsersQuery>
{
    constructor(
        private readonly paginateUsersService: PaginateUsersService
    ) {}

    async execute(query: PaginateUsersQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateUsersService.main(query.queryStatement, query.constraint);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}