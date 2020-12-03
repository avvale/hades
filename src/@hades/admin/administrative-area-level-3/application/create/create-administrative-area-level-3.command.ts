import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateAdministrativeAreaLevel3Command
{
    constructor(
        public readonly payload: {
            id: string,
            countryCommonId: string,
            administrativeAreaLevel1Id: string,
            administrativeAreaLevel2Id: string,
            code: string,
            customCode?: string,
            name: string,
            slug: string,
            latitude?: number,
            longitude?: number,
            zoom?: number,
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}