import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SessionResponse } from './../../domain/session.response';
import { SessionMapper } from './../../domain/session.mapper';
import { FindSessionQuery } from './find-session.query';
import { FindSessionService } from './find-session.service';

@QueryHandler(FindSessionQuery)
export class FindSessionQueryHandler implements IQueryHandler<FindSessionQuery>
{
    private readonly mapper: SessionMapper = new SessionMapper();

    constructor(
        private readonly findSessionService: FindSessionService
    ) { }

    async execute(query: FindSessionQuery): Promise<SessionResponse>
    {
        const session = await this.findSessionService.main(query.queryStatements);

        return this.mapper.mapAggregateToResponse(session);
    }
}