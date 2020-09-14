import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateClientsQuery } from './paginate-clients.query';
import { PaginateClientsService } from './paginate-clients.service';

@QueryHandler(PaginateClientsQuery)
export class PaginateClientsQueryHandler implements IQueryHandler<PaginateClientsQuery>
{
    constructor(
        private readonly paginateClientsService: PaginateClientsService
    ) { }

    async execute(query: PaginateClientsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateClientsService.main(query.queryStatements, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}