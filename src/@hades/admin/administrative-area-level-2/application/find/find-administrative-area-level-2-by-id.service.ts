import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IAdministrativeAreaLevel2Repository } from './../../domain/administrative-area-level-2.repository';
import { AdminAdministrativeAreaLevel2 } from './../../domain/administrative-area-level-2.aggregate';
import { AdministrativeAreaLevel2Id } from './../../domain/value-objects';

@Injectable()
export class FindAdministrativeAreaLevel2ByIdService
{
    constructor(
        private readonly repository: IAdministrativeAreaLevel2Repository,
    ) {}

    public async main(id: AdministrativeAreaLevel2Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAdministrativeAreaLevel2>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}