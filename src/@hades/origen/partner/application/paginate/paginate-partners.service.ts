import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IPartnerRepository } from './../../domain/partner.repository';
import { OrigenPartner } from './../../domain/partner.aggregate';

@Injectable()
export class PaginatePartnersService
{
    constructor(
        private readonly repository: IPartnerRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<OrigenPartner>>
    {
        return await this.repository.paginate(queryStatement, constraint, cQMetadata);
    }
}