import { AggregateRoot } from '@nestjs/cqrs';
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
} from './value-objects';
import { CreatedAttachmentEvent } from './../application/events/created-attachment.event';
import { UpdatedAttachmentEvent } from './../application/events/updated-attachment.event';
import { DeletedAttachmentEvent } from './../application/events/deleted-attachment.event';
import { AdminAttachmentFamily } from '@hades/admin/attachment-family/domain/attachment-family.aggregate';
import { AdminAttachmentLibrary } from '@hades/admin/attachment-library/domain/attachment-library.aggregate';

export class AdminAttachment extends AggregateRoot
{
    id: AttachmentId;
    commonId: AttachmentCommonId;
    langId: AttachmentLangId;
    attachableModel: AttachmentAttachableModel;
    attachableId: AttachmentAttachableId;
    familyId: AttachmentFamilyId;
    sort: AttachmentSort;
    alt: AttachmentAlt;
    title: AttachmentTitle;
    description: AttachmentDescription;
    excerpt: AttachmentExcerpt;
    name: AttachmentName;
    pathname: AttachmentPathname;
    filename: AttachmentFilename;
    url: AttachmentUrl;
    mime: AttachmentMime;
    extension: AttachmentExtension;
    size: AttachmentSize;
    width: AttachmentWidth;
    height: AttachmentHeight;
    libraryId: AttachmentLibraryId;
    libraryFilename: AttachmentLibraryFilename;
    data: AttachmentData;
    createdAt: AttachmentCreatedAt;
    updatedAt: AttachmentUpdatedAt;
    deletedAt: AttachmentDeletedAt;

    // eager relationship
    family: AdminAttachmentFamily;
    library: AdminAttachmentLibrary;

    constructor(
        id: AttachmentId,
        commonId: AttachmentCommonId,
        langId: AttachmentLangId,
        attachableModel: AttachmentAttachableModel,
        attachableId: AttachmentAttachableId,
        familyId: AttachmentFamilyId,
        sort: AttachmentSort,
        alt: AttachmentAlt,
        title: AttachmentTitle,
        description: AttachmentDescription,
        excerpt: AttachmentExcerpt,
        name: AttachmentName,
        pathname: AttachmentPathname,
        filename: AttachmentFilename,
        url: AttachmentUrl,
        mime: AttachmentMime,
        extension: AttachmentExtension,
        size: AttachmentSize,
        width: AttachmentWidth,
        height: AttachmentHeight,
        libraryId: AttachmentLibraryId,
        libraryFilename: AttachmentLibraryFilename,
        data: AttachmentData,
        createdAt: AttachmentCreatedAt,
        updatedAt: AttachmentUpdatedAt,
        deletedAt: AttachmentDeletedAt,
        family?: AdminAttachmentFamily,
        library?: AdminAttachmentLibrary,
    )
    {
        super();

        this.id = id;
        this.commonId = commonId;
        this.langId = langId;
        this.attachableModel = attachableModel;
        this.attachableId = attachableId;
        this.familyId = familyId;
        this.sort = sort;
        this.alt = alt;
        this.title = title;
        this.description = description;
        this.excerpt = excerpt;
        this.name = name;
        this.pathname = pathname;
        this.filename = filename;
        this.url = url;
        this.mime = mime;
        this.extension = extension;
        this.size = size;
        this.width = width;
        this.height = height;
        this.libraryId = libraryId;
        this.libraryFilename = libraryFilename;
        this.data = data;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.family = family;
        this.library = library;
    }

    static register (
        id: AttachmentId,
        commonId: AttachmentCommonId,
        langId: AttachmentLangId,
        attachableModel: AttachmentAttachableModel,
        attachableId: AttachmentAttachableId,
        familyId: AttachmentFamilyId,
        sort: AttachmentSort,
        alt: AttachmentAlt,
        title: AttachmentTitle,
        description: AttachmentDescription,
        excerpt: AttachmentExcerpt,
        name: AttachmentName,
        pathname: AttachmentPathname,
        filename: AttachmentFilename,
        url: AttachmentUrl,
        mime: AttachmentMime,
        extension: AttachmentExtension,
        size: AttachmentSize,
        width: AttachmentWidth,
        height: AttachmentHeight,
        libraryId: AttachmentLibraryId,
        libraryFilename: AttachmentLibraryFilename,
        data: AttachmentData,
        createdAt: AttachmentCreatedAt,
        updatedAt: AttachmentUpdatedAt,
        deletedAt: AttachmentDeletedAt,
        family?: AdminAttachmentFamily,
        library?: AdminAttachmentLibrary,
    ): AdminAttachment
    {
        return new AdminAttachment(
            id,
            commonId,
            langId,
            attachableModel,
            attachableId,
            familyId,
            sort,
            alt,
            title,
            description,
            excerpt,
            name,
            pathname,
            filename,
            url,
            mime,
            extension,
            size,
            width,
            height,
            libraryId,
            libraryFilename,
            data,
            createdAt,
            updatedAt,
            deletedAt,
            family,
            library,
        );
    }

    created(attachment: AdminAttachment): void
    {
        this.apply(
            new CreatedAttachmentEvent(
                attachment.id.value,
                attachment.commonId.value,
                attachment.langId.value,
                attachment.attachableModel.value,
                attachment.attachableId.value,
                attachment.familyId?.value,
                attachment.sort?.value,
                attachment.alt?.value,
                attachment.title?.value,
                attachment.description?.value,
                attachment.excerpt?.value,
                attachment.name.value,
                attachment.pathname.value,
                attachment.filename.value,
                attachment.url.value,
                attachment.mime.value,
                attachment.extension?.value,
                attachment.size.value,
                attachment.width?.value,
                attachment.height?.value,
                attachment.libraryId?.value,
                attachment.libraryFilename?.value,
                attachment.data?.value,
                attachment.createdAt?.value,
                attachment.updatedAt?.value,
                attachment.deletedAt?.value,
            )
        );
    }

    updated(attachment: AdminAttachment): void
    {
        this.apply(
            new UpdatedAttachmentEvent(
                attachment.id.value,
                attachment.commonId?.value,
                attachment.langId?.value,
                attachment.attachableModel?.value,
                attachment.attachableId?.value,
                attachment.familyId?.value,
                attachment.sort?.value,
                attachment.alt?.value,
                attachment.title?.value,
                attachment.description?.value,
                attachment.excerpt?.value,
                attachment.name?.value,
                attachment.pathname?.value,
                attachment.filename?.value,
                attachment.url?.value,
                attachment.mime?.value,
                attachment.extension?.value,
                attachment.size?.value,
                attachment.width?.value,
                attachment.height?.value,
                attachment.libraryId?.value,
                attachment.libraryFilename?.value,
                attachment.data?.value,
                attachment.createdAt?.value,
                attachment.updatedAt?.value,
                attachment.deletedAt?.value,
            )
        );
    }

    deleted(attachment: AdminAttachment): void
    {
        this.apply(
            new DeletedAttachmentEvent(
                attachment.id.value,
                attachment.commonId.value,
                attachment.langId.value,
                attachment.attachableModel.value,
                attachment.attachableId.value,
                attachment.familyId?.value,
                attachment.sort?.value,
                attachment.alt?.value,
                attachment.title?.value,
                attachment.description?.value,
                attachment.excerpt?.value,
                attachment.name.value,
                attachment.pathname.value,
                attachment.filename.value,
                attachment.url.value,
                attachment.mime.value,
                attachment.extension?.value,
                attachment.size.value,
                attachment.width?.value,
                attachment.height?.value,
                attachment.libraryId?.value,
                attachment.libraryFilename?.value,
                attachment.data?.value,
                attachment.createdAt?.value,
                attachment.updatedAt?.value,
                attachment.deletedAt?.value,
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            commonId: this.commonId.value,
            langId: this.langId.value,
            attachableModel: this.attachableModel.value,
            attachableId: this.attachableId.value,
            familyId: this.familyId?.value,
            sort: this.sort?.value,
            alt: this.alt?.value,
            title: this.title?.value,
            description: this.description?.value,
            excerpt: this.excerpt?.value,
            name: this.name.value,
            pathname: this.pathname.value,
            filename: this.filename.value,
            url: this.url.value,
            mime: this.mime.value,
            extension: this.extension?.value,
            size: this.size.value,
            width: this.width?.value,
            height: this.height?.value,
            libraryId: this.libraryId?.value,
            libraryFilename: this.libraryFilename?.value,
            data: this.data?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            family: this.family?.toDTO(),
            library: this.library?.toDTO(),
        }
    }
}
