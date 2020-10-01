export class CreateLangsCommand
{
    constructor(
        public readonly langs: {
            id: string,
            name: string,
            image?: string,
            iso6392: string,
            iso6393: string,
            ietf: string,
            sort?: number,
            isActive: boolean,
            
        } []
    ) {}
}