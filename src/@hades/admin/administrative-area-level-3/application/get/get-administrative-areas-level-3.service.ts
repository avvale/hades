import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IAdministrativeAreaLevel3Repository } from './../../domain/administrative-area-level-3.repository';
import { AdminAdministrativeAreaLevel3 } from './../../domain/administrative-area-level-3.aggregate';

@Injectable()
export class GetAdministrativeAreasLevel3Service
{
    constructor(
        private readonly repository: IAdministrativeAreaLevel3Repository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAdministrativeAreaLevel3[]>
    {
        return await this.repository.get(queryStatement, constraint, cQMetadata);
    }
}