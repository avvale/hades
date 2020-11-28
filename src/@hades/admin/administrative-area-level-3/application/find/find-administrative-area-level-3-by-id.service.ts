import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IAdministrativeAreaLevel3Repository } from './../../domain/administrative-area-level-3.repository';
import { AdminAdministrativeAreaLevel3 } from './../../domain/administrative-area-level-3.aggregate';
import { AdministrativeAreaLevel3Id } from './../../domain/value-objects';

@Injectable()
export class FindAdministrativeAreaLevel3ByIdService
{
    constructor(
        private readonly repository: IAdministrativeAreaLevel3Repository,
    ) {}

    public async main(id: AdministrativeAreaLevel3Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAdministrativeAreaLevel3>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}