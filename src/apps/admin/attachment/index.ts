// controllers
import { AdminCreateAttachmentController } from './controllers/admin-create-attachment.controller';
import { AdminCreateAttachmentsController } from './controllers/admin-create-attachments.controller';
import { AdminPaginateAttachmentsController } from './controllers/admin-paginate-attachments.controller';
import { AdminGetAttachmentsController } from './controllers/admin-get-attachments.controller';
import { AdminFindAttachmentByIdController } from './controllers/admin-find-attachment-by-id.controller';
import { AdminFindAttachmentController } from './controllers/admin-find-attachment.controller';
import { AdminUpdateAttachmentController } from './controllers/admin-update-attachment.controller';
import { AdminDeleteAttachmentByIdController } from './controllers/admin-delete-attachment-by-id.controller';
import { AdminDeleteAttachmentsController } from './controllers/admin-delete-attachments.controller';

// resolvers
import { AdminCreateAttachmentResolver } from './resolvers/admin-create-attachment.resolver';
import { AdminCreateAttachmentsResolver } from './resolvers/admin-create-attachments.resolver';
import { AdminPaginateAttachmentsResolver } from './resolvers/admin-paginate-attachments.resolver';
import { AdminGetAttachmentsResolver } from './resolvers/admin-get-attachments.resolver';
import { AdminFindAttachmentResolver } from './resolvers/admin-find-attachment.resolver';
import { AdminFindAttachmentByIdResolver } from './resolvers/admin-find-attachment-by-id.resolver';
import { AdminUpdateAttachmentResolver } from './resolvers/admin-update-attachment.resolver';
import { AdminDeleteAttachmentByIdResolver } from './resolvers/admin-delete-attachment-by-id.resolver';
import { AdminDeleteAttachmentsResolver } from './resolvers/admin-delete-attachments.resolver';

// custom
import { AdminCropAttachmentResolver } from './resolvers/admin-crop-attachment.resolver';

export const AdminAttachmentControllers = [
    AdminCreateAttachmentController,
    AdminCreateAttachmentsController,
    AdminPaginateAttachmentsController,
    AdminGetAttachmentsController,
    AdminFindAttachmentByIdController,
    AdminFindAttachmentController,
    AdminUpdateAttachmentController,
    AdminDeleteAttachmentByIdController,
    AdminDeleteAttachmentsController,
];

export const AdminAttachmentResolvers = [
    AdminCreateAttachmentResolver,
    AdminCreateAttachmentsResolver,
    AdminPaginateAttachmentsResolver,
    AdminGetAttachmentsResolver,
    AdminFindAttachmentResolver,
    AdminFindAttachmentByIdResolver,
    AdminUpdateAttachmentResolver,
    AdminDeleteAttachmentByIdResolver,
    AdminDeleteAttachmentsResolver,

    // custom
    AdminCropAttachmentResolver
];