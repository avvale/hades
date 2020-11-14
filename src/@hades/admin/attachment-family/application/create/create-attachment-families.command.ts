import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateAttachmentFamiliesCommand
{
    constructor(
        public readonly payload: {
            id: string,
            name: string,
            width?: number,
            height?: number,
            fit: string,
            sizes?: any,
            quality?: number,
            format?: string,
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}