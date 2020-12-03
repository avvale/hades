import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PartnerResponse } from './../../domain/partner.response';
import { PartnerMapper } from './../../domain/partner.mapper';
import { PartnerId } from './../../domain/value-objects';
import { FindPartnerByIdQuery } from './find-partner-by-id.query';
import { FindPartnerByIdService } from './find-partner-by-id.service';

@QueryHandler(FindPartnerByIdQuery)
export class FindPartnerByIdQueryHandler implements IQueryHandler<FindPartnerByIdQuery>
{
    private readonly mapper: PartnerMapper = new PartnerMapper();

    constructor(
        private readonly findPartnerByIdService: FindPartnerByIdService,
    ) {}

    async execute(query: FindPartnerByIdQuery): Promise<PartnerResponse>
    {
        const partner = await this.findPartnerByIdService.main(
            new PartnerId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(partner);
    }
}