import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateAdministrativeAreasLevel1Command
{
    constructor(
        public readonly payload: {
            id: string,
            countryId: string,
            code: string,
            customCode?: string,
            name: string,
            slug: string,
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}