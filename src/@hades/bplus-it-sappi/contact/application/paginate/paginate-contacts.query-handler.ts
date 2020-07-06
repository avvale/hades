import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateContactsQuery } from './paginate-contacts.query';
import { PaginateContactsService } from './paginate-contacts.service';

@QueryHandler(PaginateContactsQuery)
export class PaginateContactsQueryHandler implements IQueryHandler<PaginateContactsQuery>
{
    constructor(
        private readonly paginateContactsService: PaginateContactsService
    ) { }

    async execute(query: PaginateContactsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateContactsService.main(query.queryStatements, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}