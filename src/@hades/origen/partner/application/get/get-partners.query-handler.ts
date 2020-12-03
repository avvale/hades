import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PartnerResponse } from './../../domain/partner.response';
import { PartnerMapper } from './../../domain/partner.mapper';
import { GetPartnersQuery } from './get-partners.query';
import { GetPartnersService } from './get-partners.service';

@QueryHandler(GetPartnersQuery)
export class GetPartnersQueryHandler implements IQueryHandler<GetPartnersQuery>
{
    private readonly mapper: PartnerMapper = new PartnerMapper();

    constructor(
        private readonly getPartnersService: GetPartnersService,
    ) {}

    async execute(query: GetPartnersQuery): Promise<PartnerResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getPartnersService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}