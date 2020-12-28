import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CropAttachmentCommand
{
    constructor(
        public readonly crop: {
            x: number;
            y: number;
            width: number;
            height: number;
            rotate: number;
            scaleX: number;
            scaleY: number;
        },
        public readonly attachmentFamily: {
            id: string;
            name: string;
            resourceIds?: string[];
            width?: number;
            height?: number;
            fit?: string;
            sizes?: JSON;
            quality?: number;
            format?: string;
        },
        public readonly attachment: {
            id: string;
            commonId: string;
            langId: string;
            attachableModel: string;
            attachableId: string;
            familyId?: string;
            sort?: number;
            alt?: string;
            title?: string;
            description?: string;
            excerpt?: string;
            name: string;
            pathname: string;
            filename: string;
            url: string;
            mime: string;
            extension?: string;
            size: number;
            width?: number;
            height?: number;
            libraryId?: string;
            library?: {
                id: string;
                name?: string;
                pathname: string;
                filename: string;
                url: string;
                mime: string;
                extension?: string;
                size: number;
                width?: number;
                height?: number;
                data?: any;
            };
            libraryFilename?: string;
            data?: any;
            isUploaded: boolean;
            isChanged: boolean;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}