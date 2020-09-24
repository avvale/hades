import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateAccountsQuery } from './paginate-accounts.query';
import { PaginateAccountsService } from './paginate-accounts.service';

@QueryHandler(PaginateAccountsQuery)
export class PaginateAccountsQueryHandler implements IQueryHandler<PaginateAccountsQuery>
{
    constructor(
        private readonly paginateAccountsService: PaginateAccountsService
    ) { }

    async execute(query: PaginateAccountsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAccountsService.main(query.queryStatement, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}