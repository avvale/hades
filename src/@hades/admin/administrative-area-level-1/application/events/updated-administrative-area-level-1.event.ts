export class UpdatedAdministrativeAreaLevel1Event
{
    constructor(
        public readonly id: string,
        public readonly countryCommonId: string,
        public readonly code: string,
        public readonly customCode: string,
        public readonly name: string,
        public readonly slug: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}