import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PartnerResponse } from './../../domain/partner.response';
import { PartnerMapper } from './../../domain/partner.mapper';
import { FindPartnerQuery } from './find-partner.query';
import { FindPartnerService } from './find-partner.service';

@QueryHandler(FindPartnerQuery)
export class FindPartnerQueryHandler implements IQueryHandler<FindPartnerQuery>
{
    private readonly mapper: PartnerMapper = new PartnerMapper();

    constructor(
        private readonly findPartnerService: FindPartnerService,
    ) {}

    async execute(query: FindPartnerQuery): Promise<PartnerResponse>
    {
        const partner = await this.findPartnerService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(partner);
    }
}