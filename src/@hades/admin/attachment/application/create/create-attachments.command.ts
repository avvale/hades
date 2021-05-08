import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateAttachmentsCommand
{
    constructor(
        public readonly payload: {
            id: string,
            attachableModel: string,
            attachableId: string,
            familyId?: string,
            sort?: number,
            alt?: string,
            title?: string,
            description?: string,
            excerpt?: string,
            name: string,
            pathname: string,
            filename: string,
            url: string,
            mime: string,
            extension?: string,
            size: number,
            width?: number,
            height?: number,
            libraryId?: string,
            libraryFilename?: string,
            data?: any,
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}