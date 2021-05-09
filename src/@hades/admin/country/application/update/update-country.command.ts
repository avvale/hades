// ignored file
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateCountryCommand
{
    constructor(
        public readonly payload: {
            id: string,
            langId?: string,
            iso3166Alpha2?: string,
            iso3166Alpha3?: string,
            iso3166Numeric?: string,
            customCode?: string,
            prefix?: string,
            name?: string,
            slug?: string,
            image?: string,
            sort?: number,
            administrativeAreaLevel1?: string,
            administrativeAreaLevel2?: string,
            administrativeAreaLevel3?: string,
            administrativeAreas?: any,
            latitude?: number,
            longitude?: number,
            zoom?: number,
            dataLang?: any,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}