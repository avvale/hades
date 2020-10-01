import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MessageDetailResponse } from './../../domain/message-detail.response';
import { MessageDetailMapper } from './../../domain/message-detail.mapper';
import { GetMessagesDetailQuery } from './get-messages-detail.query';
import { GetMessagesDetailService } from './get-messages-detail.service';

@QueryHandler(GetMessagesDetailQuery)
export class GetMessagesDetailQueryHandler implements IQueryHandler<GetMessagesDetailQuery>
{
    private readonly mapper: MessageDetailMapper = new MessageDetailMapper();

    constructor(
        private readonly getMessagesDetailService: GetMessagesDetailService
    ) { }

    async execute(query: GetMessagesDetailQuery): Promise<MessageDetailResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getMessagesDetailService.main(query.queryStatement));
    }
}