export class DeletedPartnerEvent
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
    ) {}
}