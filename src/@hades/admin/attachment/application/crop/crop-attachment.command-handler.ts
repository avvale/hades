import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CropAttachmentCommand } from './crop-attachment.command';
import { CropAttachmentService } from './crop-attachment.service';
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
    AttachmentIsChanged,
    AttachmentIsUploaded,
} from './../../domain/value-objects';
import { AttachmentFamilyName, AttachmentFamilyResourceIds, AttachmentFamilyWidth, AttachmentFamilyHeight, AttachmentFamilyFit, AttachmentFamilySizes, AttachmentFamilyQuality, AttachmentFamilyFormat } from '@hades/admin/attachment-family/domain/value-objects';
import { format } from 'path';
import { AttachmentLibraryName, AttachmentLibraryPathname, AttachmentLibraryUrl, AttachmentLibraryMime, AttachmentLibraryExtension, AttachmentLibrarySize, AttachmentLibraryWidth, AttachmentLibraryHeight, AttachmentLibraryData } from '@hades/admin/attachment-library/domain/value-objects';

@CommandHandler(CropAttachmentCommand)
export class CropAttachmentCommandHandler implements ICommandHandler<CropAttachmentCommand>
{
    constructor(
        private readonly cropAttachmentService: CropAttachmentService,
    ) {}

    async execute(command: CropAttachmentCommand): Promise<void>
    {
        console.log(command)
        // call to use case and implements ValueObjects
        await this.cropAttachmentService.main(
            {
                x: new CropX(command.crop.x),
                y: new CropY(command.crop.y),
                width: new CropWidth(command.crop.width),
                height: new CropHeight(command.crop.height),
                rotate: new CropRotate(command.crop.rotate),
                scaleX: new CropScaleX(command.crop.scaleX),
                scaleY: new CropScaleY(command.crop.scaleY),
            },
            {
                id: new AttachmentFamilyId(command.attachmentFamily.id),
                name: new AttachmentFamilyName(command.attachmentFamily.name),
                resourceIds: new AttachmentFamilyResourceIds(command.attachmentFamily.resourceIds),
                width: new AttachmentFamilyWidth(command.attachmentFamily.width),
                height: new AttachmentFamilyHeight(command.attachmentFamily.height),
                fit: new AttachmentFamilyFit(command.attachmentFamily.fit),
                sizes: new AttachmentFamilySizes(command.attachmentFamily.sizes),
                quality: new AttachmentFamilyQuality(command.attachmentFamily.quality),
                format: new AttachmentFamilyFormat(command.attachmentFamily.format),
            },
            {
                id: new AttachmentId(command.attachment.id),
                commonId: new AttachmentCommonId(command.attachment.commonId),
                langId: new AttachmentLangId(command.attachment.langId),
                attachableModel: new AttachmentAttachableModel(command.attachment.attachableModel),
                attachableId: new AttachmentAttachableId(command.attachment.attachableId),
                familyId: new AttachmentFamilyId(command.attachment.familyId),
                sort: new AttachmentSort(command.attachment.sort),
                alt: new AttachmentAlt(command.attachment.alt),
                title: new AttachmentTitle(command.attachment.title),
                description: new AttachmentDescription(command.attachment.description),
                excerpt: new AttachmentExcerpt(command.attachment.excerpt),
                name: new AttachmentName(command.attachment.name),
                pathname: new AttachmentPathname(command.attachment.pathname),
                filename: new AttachmentFilename(command.attachment.filename),
                url: new AttachmentUrl(command.attachment.url),
                mime: new AttachmentMime(command.attachment.mime),
                extension: new AttachmentExtension(command.attachment.extension),
                size: new AttachmentSize(command.attachment.size),
                width: new AttachmentWidth(command.attachment.width),
                height: new AttachmentHeight(command.attachment.height),
                libraryId: new AttachmentLibraryId(command.attachment.libraryId),
                library: {
                    id: new AttachmentLibraryId(command.attachment.library.id),
                    name: new AttachmentLibraryName(command.attachment.library.name),
                    pathname: new AttachmentLibraryPathname(command.attachment.library.pathname),
                    filename: new AttachmentLibraryFilename(command.attachment.library.filename),
                    url: new AttachmentLibraryUrl(command.attachment.library.url),
                    mime: new AttachmentLibraryMime(command.attachment.library.mime),
                    extension: new AttachmentLibraryExtension(command.attachment.library.extension),
                    size: new AttachmentLibrarySize(command.attachment.library.size),
                    width: new AttachmentLibraryWidth(command.attachment.library.width),
                    height: new AttachmentLibraryHeight(command.attachment.library.height),
                    data: new AttachmentLibraryData(command.attachment.library.data),
                },
                libraryFilename: new AttachmentLibraryFilename(command.attachment.libraryFilename),
                data: new AttachmentData(command.attachment.data),
                isUploaded: new AttachmentIsUploaded(command.attachment.isUploaded),
                isChanged: new AttachmentIsChanged(command.attachment.isChanged),
            }
        );
    }
}