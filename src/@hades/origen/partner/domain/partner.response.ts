import { CountryResponse } from '@hades/admin/country/domain/country.response';
import { AdministrativeAreaLevel1Response } from '@hades/admin/administrative-area-level-1/domain/administrative-area-level-1.response';
import { AdministrativeAreaLevel2Response } from '@hades/admin/administrative-area-level-2/domain/administrative-area-level-2.response';
import { AdministrativeAreaLevel3Response } from '@hades/admin/administrative-area-level-3/domain/administrative-area-level-3.response';
import { AttachmentResponse } from '@hades/admin/attachment/domain/attachment.response';

export class PartnerResponse
{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly socialNetworks: any,
        public readonly description: string,
        public readonly excerpt: string,
        public readonly email: string,
        public readonly phone: string,
        public readonly fax: string,
        public readonly countryCommonId: string,
        public readonly administrativeAreaLevel1Id: string,
        public readonly administrativeAreaLevel2Id: string,
        public readonly administrativeAreaLevel3Id: string,
        public readonly zip: string,
        public readonly locality: string,
        public readonly address: string,
        public readonly latitude: number,
        public readonly longitude: number,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly country: CountryResponse,
        public readonly administrativeAreaLevel1: AdministrativeAreaLevel1Response,
        public readonly administrativeAreaLevel2: AdministrativeAreaLevel2Response,
        public readonly administrativeAreaLevel3: AdministrativeAreaLevel3Response,
        public readonly attachments: AttachmentResponse[],
    ) {}
}