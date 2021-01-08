import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateAttachmentLibrariesCommand
{
    constructor(
        public readonly payload: {
            id: string,
            name?: string,
            pathname: string,
            filename: string,
            url: string,
            mime: string,
            extension?: string,
            size: number,
            width?: number,
            height?: number,
            data?: any,
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}