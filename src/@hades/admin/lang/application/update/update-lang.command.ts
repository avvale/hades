export class UpdateLangCommand 
{
    constructor(
        public readonly id: string,
        public readonly name?: string,
        public readonly image?: string,
        public readonly iso6392?: string,
        public readonly iso6393?: string,
        public readonly ietf?: string,
        public readonly sort?: number,
        public readonly isActive?: boolean
    ) {}
}