import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IAdministrativeAreaLevel1Repository } from './../../domain/administrative-area-level-1.repository';
import { AdminAdministrativeAreaLevel1 } from './../../domain/administrative-area-level-1.aggregate';
import { AdministrativeAreaLevel1Id } from './../../domain/value-objects';

@Injectable()
export class FindAdministrativeAreaLevel1ByIdService
{
    constructor(
        private readonly repository: IAdministrativeAreaLevel1Repository,
    ) {}

    public async main(id: AdministrativeAreaLevel1Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAdministrativeAreaLevel1>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}