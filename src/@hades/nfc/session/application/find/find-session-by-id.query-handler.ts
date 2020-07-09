import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SessionResponse } from './../../domain/session.response';
import { SessionId } from './../../domain/value-objects';
import { FindSessionByIdQuery } from './find-session-by-id.query';
import { FindSessionByIdService } from './find-session-by-id.service';

@QueryHandler(FindSessionByIdQuery)
export class FindSessionByIdQueryHandler implements IQueryHandler<FindSessionByIdQuery>
{
    constructor(
        private readonly findSessionByIdService: FindSessionByIdService
    ) { }

    async execute(query: FindSessionByIdQuery): Promise<SessionResponse>
    {
        const session = await this.findSessionByIdService.main(new SessionId(query.id));

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