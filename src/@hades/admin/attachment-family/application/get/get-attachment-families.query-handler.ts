import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AttachmentFamilyResponse } from './../../domain/attachment-family.response';
import { AttachmentFamilyMapper } from './../../domain/attachment-family.mapper';
import { GetAttachmentFamiliesQuery } from './get-attachment-families.query';
import { GetAttachmentFamiliesService } from './get-attachment-families.service';

@QueryHandler(GetAttachmentFamiliesQuery)
export class GetAttachmentFamiliesQueryHandler implements IQueryHandler<GetAttachmentFamiliesQuery>
{
    private readonly mapper: AttachmentFamilyMapper = new AttachmentFamilyMapper();

    constructor(
        private readonly getAttachmentFamiliesService: GetAttachmentFamiliesService,
    ) {}

    async execute(query: GetAttachmentFamiliesQuery): Promise<AttachmentFamilyResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAttachmentFamiliesService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}