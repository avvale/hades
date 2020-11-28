import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateAdministrativeAreaLevel1Command
{
    constructor(
        public readonly payload: {
            id: string,
            countryCommonId?: string,
            code?: string,
            customCode?: string,
            name?: string,
            slug?: string,
            latitude?: number,
            longitude?: number,
            zoom?: number,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}