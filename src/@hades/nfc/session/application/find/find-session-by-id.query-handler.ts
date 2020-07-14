import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SessionResponse } from './../../domain/session.response';
import { SessionMapper } from './../../domain/session.mapper';
import { SessionId } from './../../domain/value-objects';
import { FindSessionByIdQuery } from './find-session-by-id.query';
import { FindSessionByIdService } from './find-session-by-id.service';

@QueryHandler(FindSessionByIdQuery)
export class FindSessionByIdQueryHandler implements IQueryHandler<FindSessionByIdQuery>
{
    private readonly mapper: SessionMapper = new SessionMapper();

    constructor(
        private readonly findSessionByIdService: FindSessionByIdService
    ) { }

    async execute(query: FindSessionByIdQuery): Promise<SessionResponse>
    {
        const session = await this.findSessionByIdService.main(new SessionId(query.id));

        return this.mapper.mapAggregateToResponse(session);
    }
}