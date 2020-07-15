import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MessageDetailResponse } from './../../domain/message-detail.response';
import { MessageDetailMapper } from './../../domain/message-detail.mapper';
import { FindMessageDetailQuery } from './find-message-detail.query';
import { FindMessageDetailService } from './find-message-detail.service';

@QueryHandler(FindMessageDetailQuery)
export class FindMessageDetailQueryHandler implements IQueryHandler<FindMessageDetailQuery>
{
    private readonly mapper: MessageDetailMapper = new MessageDetailMapper();

    constructor(
        private readonly findMessageDetailService: FindMessageDetailService
    ) { }

    async execute(query: FindMessageDetailQuery): Promise<MessageDetailResponse>
    {
        const messageDetail = await this.findMessageDetailService.main(query.queryStatements);

        return this.mapper.mapAggregateToResponse(messageDetail);
    }
}