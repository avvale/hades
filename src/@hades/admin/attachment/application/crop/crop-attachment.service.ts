import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { ImageManager } from '@hades/shared/domain/lib/image-manager';
import {
    AttachmentId,
    AttachmentCommonId,
    AttachmentLangId,
    AttachmentAttachableModel,
    AttachmentAttachableId,
    AttachmentFamilyId,
    AttachmentSort,
    AttachmentAlt,
    AttachmentTitle,
    AttachmentDescription,
    AttachmentExcerpt,
    AttachmentName,
    AttachmentPathname,
    AttachmentFilename,
    AttachmentUrl,
    AttachmentMime,
    AttachmentExtension,
    AttachmentSize,
    AttachmentWidth,
    AttachmentHeight,
    AttachmentLibraryId,
    AttachmentLibraryFilename,
    AttachmentData,
    AttachmentCreatedAt,
    AttachmentUpdatedAt,
    AttachmentDeletedAt,
    CropHeight,
    CropRotate,
    CropScaleX,
    CropScaleY,
    CropWidth,
    CropX,
    CropY,
    AttachmentIsUploaded,
    AttachmentIsChanged,
} from './../../domain/value-objects';
import { IAttachmentRepository } from './../../domain/attachment.repository';
import { AdminAttachment } from './../../domain/attachment.aggregate';
import { AttachmentLibraryData, AttachmentLibraryExtension, AttachmentLibraryHeight, AttachmentLibraryMime, AttachmentLibraryName, AttachmentLibraryPathname, AttachmentLibrarySize, AttachmentLibraryUrl, AttachmentLibraryWidth } from '@hades/admin/attachment-library/domain/value-objects';
import { AttachmentFamilyName, AttachmentFamilyResourceIds, AttachmentFamilyWidth, AttachmentFamilyHeight, AttachmentFamilyFit, AttachmentFamilySizes, AttachmentFamilyQuality, AttachmentFamilyFormat } from '@hades/admin/attachment-family/domain/value-objects';
import { Utils } from '@hades/shared/domain/lib/utils';

@Injectable()
export class CropAttachmentService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAttachmentRepository,
    ) {}

    public async main(
        crop: {
            x: CropX;
            y: CropY;
            width: CropWidth;
            height: CropHeight;
            rotate: CropRotate;
            scaleX: CropScaleX;
            scaleY: CropScaleY;
        },
        attachmentFamily: {
            id: AttachmentFamilyId;
            name: AttachmentFamilyName;
            resourceIds?: AttachmentFamilyResourceIds;
            width?: AttachmentFamilyWidth;
            height?: AttachmentFamilyHeight;
            fit?: AttachmentFamilyFit;
            sizes?: AttachmentFamilySizes;
            quality?: AttachmentFamilyQuality;
            format?: AttachmentFamilyFormat;
        },
        attachment: {
            id: AttachmentId;
            commonId: AttachmentCommonId;
            langId: AttachmentLangId;
            attachableModel: AttachmentAttachableModel;
            attachableId: AttachmentAttachableId;
            familyId?: AttachmentFamilyId;
            sort?: AttachmentSort;
            alt?: AttachmentAlt;
            title?: AttachmentTitle;
            description?: AttachmentDescription;
            excerpt?: AttachmentExcerpt;
            name: AttachmentName;
            pathname: AttachmentPathname;
            filename: AttachmentFilename;
            url: AttachmentUrl;
            mime: AttachmentMime;
            extension?: AttachmentExtension;
            size: AttachmentSize;
            width?: AttachmentWidth;
            height?: AttachmentHeight;
            libraryId?: AttachmentLibraryId;
            library?: {
                id: AttachmentLibraryId;
                name?: AttachmentLibraryName;
                pathname: AttachmentLibraryPathname;
                filename: AttachmentLibraryFilename;
                url: AttachmentLibraryUrl;
                mime: AttachmentLibraryMime;
                extension?: AttachmentLibraryExtension;
                size: AttachmentLibrarySize;
                width?: AttachmentLibraryWidth;
                height?: AttachmentLibraryHeight;
                data?: AttachmentLibraryData;
            };
            libraryFilename?: AttachmentLibraryFilename;
            data?: AttachmentData;
            isUploaded: AttachmentIsUploaded;
            isChanged: AttachmentIsChanged;
        }
    ): Promise<void>
    {
        attachmentFamily.format.value

        Utils.mimeFromExtension(attachmentFamily.format.value);

        // set image format from attachment family (jpg, png, gif, etc.)
        //if (attachmentFamily.format.value.toLowerCase() !== attachment.extension)
        // {

        // create aggregate with factory pattern
        /* const attachment = AdminAttachment.register(
            payload.id,
            payload.commonId,
            payload.langId,
            payload.attachableModel,
            payload.attachableId,
            payload.familyId,
            payload.sort,
            payload.alt,
            payload.title,
            payload.description,
            payload.excerpt,
            payload.name,
            payload.pathname,
            payload.filename,
            payload.url,
            payload.mime,
            payload.extension,
            payload.size,
            payload.width,
            payload.height,
            payload.libraryId,
            payload.libraryFilename,
            payload.data,
            new AttachmentCreatedAt({currentTimestamp: true}),
            new AttachmentUpdatedAt({currentTimestamp: true}),
            null
        ); */

        // create
        /* await this.repository.create(attachment);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const attachmentRegister = this.publisher.mergeObjectContext(
            attachment
        );

        attachmentRegister.created(attachment); // apply event to model events
        attachmentRegister.commit(); // commit all events of model */
    }
}