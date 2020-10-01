import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MessageOverviewResponse } from './../../domain/message-overview.response';
import { MessageOverviewMapper } from './../../domain/message-overview.mapper';
import { MessageOverviewId } from './../../domain/value-objects';
import { FindMessageOverviewByIdQuery } from './find-message-overview-by-id.query';
import { FindMessageOverviewByIdService } from './find-message-overview-by-id.service';

@QueryHandler(FindMessageOverviewByIdQuery)
export class FindMessageOverviewByIdQueryHandler implements IQueryHandler<FindMessageOverviewByIdQuery>
{
    private readonly mapper: MessageOverviewMapper = new MessageOverviewMapper();

    constructor(
        private readonly findMessageOverviewByIdService: FindMessageOverviewByIdService
    ) { }

    async execute(query: FindMessageOverviewByIdQuery): Promise<MessageOverviewResponse>
    {
        const messageOverview = await this.findMessageOverviewByIdService.main(new MessageOverviewId(query.id));

        return this.mapper.mapAggregateToResponse(messageOverview);
    }
}