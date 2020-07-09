import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SessionResponse } from './../../domain/session.response';
import { GetSessionsQuery } from './get-sessions.query';
import { GetSessionsService } from './get-sessions.service';

@QueryHandler(GetSessionsQuery)
export class GetSessionsQueryHandler implements IQueryHandler<GetSessionsQuery>
{
    constructor(
        private readonly getSessionsService: GetSessionsService
    ) { }

    async execute(query: GetSessionsQuery): Promise<SessionResponse[]>
    {
        return (await this.getSessionsService.main(query.queryStatements)).map(session => new SessionResponse(
                session.id.value,
                session.ip.value,
                session.tagId.value,
                session.uid.value,
                session.counter.value,
                session.expiredAt.value,
                session.createdAt.value,
                session.updatedAt.value,
                session.deletedAt.value,
                
            ));
    }
}