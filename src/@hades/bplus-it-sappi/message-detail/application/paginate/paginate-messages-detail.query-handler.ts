import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateMessagesDetailQuery } from './paginate-messages-detail.query';
import { PaginateMessagesDetailService } from './paginate-messages-detail.service';

@QueryHandler(PaginateMessagesDetailQuery)
export class PaginateMessagesDetailQueryHandler implements IQueryHandler<PaginateMessagesDetailQuery>
{
    constructor(
        private readonly paginateMessagesDetailService: PaginateMessagesDetailService
    ) { }

    async execute(query: PaginateMessagesDetailQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateMessagesDetailService.main(query.queryStatements, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}