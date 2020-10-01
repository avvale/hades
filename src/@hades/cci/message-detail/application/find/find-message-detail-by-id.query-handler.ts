import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MessageDetailResponse } from './../../domain/message-detail.response';
import { MessageDetailMapper } from './../../domain/message-detail.mapper';
import { MessageDetailId } from './../../domain/value-objects';
import { FindMessageDetailByIdQuery } from './find-message-detail-by-id.query';
import { FindMessageDetailByIdService } from './find-message-detail-by-id.service';

@QueryHandler(FindMessageDetailByIdQuery)
export class FindMessageDetailByIdQueryHandler implements IQueryHandler<FindMessageDetailByIdQuery>
{
    private readonly mapper: MessageDetailMapper = new MessageDetailMapper();

    constructor(
        private readonly findMessageDetailByIdService: FindMessageDetailByIdService
    ) { }

    async execute(query: FindMessageDetailByIdQuery): Promise<MessageDetailResponse>
    {
        const messageDetail = await this.findMessageDetailByIdService.main(new MessageDetailId(query.id));

        return this.mapper.mapAggregateToResponse(messageDetail);
    }
}