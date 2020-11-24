import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateAdministrativeAreaLevel1Command
{
    constructor(
        public readonly payload: {
            id: string,
            countryCommonId: string,
            code: string,
            customCode?: string,
            name: string,
            slug: string,
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}