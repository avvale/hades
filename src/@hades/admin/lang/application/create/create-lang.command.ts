import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateLangCommand
{
    constructor(
        public readonly payload: {
            id: string,
            name: string,
            image?: string,
            iso6392: string,
            iso6393: string,
            ietf: string,
            sort?: number,
            isActive: boolean,
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}