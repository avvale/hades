import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateAdministrativeAreasLevel1Command
{
    constructor(
        public readonly payload: {
            id: string,
            countryCommonId: string,
            code: string,
            customCode?: string,
            name: string,
            slug: string,
            latitude?: number,
            longitude?: number,
            zoom?: number,
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}