import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AttachmentResponse } from './../../domain/attachment.response';
import { AttachmentMapper } from './../../domain/attachment.mapper';
import { GetAttachmentsQuery } from './get-attachments.query';
import { GetAttachmentsService } from './get-attachments.service';

@QueryHandler(GetAttachmentsQuery)
export class GetAttachmentsQueryHandler implements IQueryHandler<GetAttachmentsQuery>
{
    private readonly mapper: AttachmentMapper = new AttachmentMapper();

    constructor(
        private readonly getAttachmentsService: GetAttachmentsService,
    ) {}

    async execute(query: GetAttachmentsQuery): Promise<AttachmentResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAttachmentsService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}