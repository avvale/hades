import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IPartnerRepository } from './../../domain/partner.repository';
import { OriginPartner } from './../../domain/partner.aggregate';
import { PartnerId } from './../../domain/value-objects';

@Injectable()
export class FindPartnerByIdService
{
    constructor(
        private readonly repository: IPartnerRepository,
    ) {}

    public async main(id: PartnerId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OriginPartner>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}