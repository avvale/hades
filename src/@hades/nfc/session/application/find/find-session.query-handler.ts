import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SessionResponse } from './../../domain/session.response';
import { FindSessionQuery } from './find-session.query';
import { FindSessionService } from './find-session.service';

@QueryHandler(FindSessionQuery)
export class FindSessionQueryHandler implements IQueryHandler<FindSessionQuery>
{
    constructor(
        private readonly findSessionService: FindSessionService
    ) { }

    async execute(query: FindSessionQuery): Promise<SessionResponse>
    {
        const session = await this.findSessionService.main(query.queryStatements);

        return new SessionResponse(
                session.id.value,
                session.ip.value,
                session.tagId.value,
                session.uid.value,
                session.counter.value,
                session.expiredAt.value,
                session.createdAt.value,
                session.updatedAt.value,
                session.deletedAt.value,
                
            );
    }
}