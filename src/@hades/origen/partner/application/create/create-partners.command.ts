import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreatePartnersCommand
{
    constructor(
        public readonly payload: {
            id: string,
            name: string,
            socialNetworks?: any,
            description?: string,
            excerpt?: string,
            email?: string,
            phone?: string,
            fax?: string,
            countryCommonId: string,
            administrativeAreaLevel1Id?: string,
            administrativeAreaLevel2Id?: string,
            administrativeAreaLevel3Id?: string,
            zip?: string,
            locality?: string,
            address?: string,
            latitude?: number,
            longitude?: number,
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}