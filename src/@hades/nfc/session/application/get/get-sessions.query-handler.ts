import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SessionResponse } from './../../domain/session.response';
import { SessionMapper } from './../../domain/session.mapper';
import { GetSessionsQuery } from './get-sessions.query';
import { GetSessionsService } from './get-sessions.service';

@QueryHandler(GetSessionsQuery)
export class GetSessionsQueryHandler implements IQueryHandler<GetSessionsQuery>
{
    private readonly mapper: SessionMapper = new SessionMapper();

    constructor(
        private readonly getSessionsService: GetSessionsService
    ) { }

    async execute(query: GetSessionsQuery): Promise<SessionResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getSessionsService.main(query.queryStatements));
    }
}