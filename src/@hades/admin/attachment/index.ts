// commands
import { CreateAttachmentCommandHandler } from './application/create/create-attachment.command-handler';
import { CreateAttachmentsCommandHandler } from './application/create/create-attachments.command-handler';
import { UpdateAttachmentCommandHandler } from './application/update/update-attachment.command-handler';
import { DeleteAttachmentByIdCommandHandler } from './application/delete/delete-attachment-by-id.command-handler';
import { DeleteAttachmentsCommandHandler } from './application/delete/delete-attachments.command-handler';
import { CropAttachmentCommandHandler } from './application/crop/crop-attachment.command-handler';

// queries
import { PaginateAttachmentsQueryHandler } from './application/paginate/paginate-attachments.query-handler';
import { GetAttachmentsQueryHandler } from './application/get/get-attachments.query-handler';
import { FindAttachmentQueryHandler } from './application/find/find-attachment.query-handler';
import { FindAttachmentByIdQueryHandler } from './application/find/find-attachment-by-id.query-handler';

// events
import { CreatedAttachmentEventHandler } from './application/events/created-attachment.event-handler';
import { CreatedAttachmentsEventHandler } from './application/events/created-attachments.event-handler';
import { UpdatedAttachmentEventHandler } from './application/events/updated-attachment.event-handler';
import { DeletedAttachmentEventHandler } from './application/events/deleted-attachment.event-handler';
import { DeletedAttachmentsEventHandler } from './application/events/deleted-attachments.event-handler';

// services
import { CreateAttachmentService } from './application/create/create-attachment.service';
import { CreateAttachmentsService } from './application/create/create-attachments.service';
import { PaginateAttachmentsService } from './application/paginate/paginate-attachments.service';
import { GetAttachmentsService } from './application/get/get-attachments.service';
import { FindAttachmentService } from './application/find/find-attachment.service';
import { FindAttachmentByIdService } from './application/find/find-attachment-by-id.service';
import { UpdateAttachmentService } from './application/update/update-attachment.service';
import { DeleteAttachmentByIdService } from './application/delete/delete-attachment-by-id.service';
import { DeleteAttachmentsService } from './application/delete/delete-attachments.service';
import { CropAttachmentService } from './application/crop/crop-attachment.service';

// models
export { AdminAttachmentModel } from './infrastructure/sequelize/sequelize-attachment.model';

// repository
export { IAttachmentRepository } from './domain/attachment.repository';
export { SequelizeAttachmentRepository } from './infrastructure/sequelize/sequelize-attachment.repository';

// sagas
export { AttachmentSagas } from './application/sagas/attachment.sagas';

export const AdminAttachmentHandlers = [
    // commands
    CreateAttachmentCommandHandler,
    CreateAttachmentsCommandHandler,
    UpdateAttachmentCommandHandler,
    DeleteAttachmentByIdCommandHandler,
    DeleteAttachmentsCommandHandler,
    CropAttachmentCommandHandler,

    // queries
    PaginateAttachmentsQueryHandler,
    GetAttachmentsQueryHandler,
    FindAttachmentQueryHandler,
    FindAttachmentByIdQueryHandler,

    // events
    CreatedAttachmentEventHandler,
    CreatedAttachmentsEventHandler,
    UpdatedAttachmentEventHandler,
    DeletedAttachmentEventHandler,
    DeletedAttachmentsEventHandler,
];

export const AdminAttachmentServices = [
    CreateAttachmentService,
    CreateAttachmentsService,
    PaginateAttachmentsService,
    GetAttachmentsService,
    FindAttachmentService,
    FindAttachmentByIdService,
    UpdateAttachmentService,
    DeleteAttachmentByIdService,
    DeleteAttachmentsService,
    CropAttachmentService,
];