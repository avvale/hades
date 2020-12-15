// controllers
import { AdminCreateAttachmentLibraryController } from './controllers/admin-create-attachment-library.controller';
import { AdminCreateAttachmentLibraryController } from './controllers/admin-create-attachment-library.controller';
import { AdminPaginateAttachmentLibraryController } from './controllers/admin-paginate-attachment-library.controller';
import { AdminGetAttachmentLibraryController } from './controllers/admin-get-attachment-library.controller';
import { AdminFindAttachmentLibraryByIdController } from './controllers/admin-find-attachment-library-by-id.controller';
import { AdminFindAttachmentLibraryController } from './controllers/admin-find-attachment-library.controller';
import { AdminUpdateAttachmentLibraryController } from './controllers/admin-update-attachment-library.controller';
import { AdminDeleteAttachmentLibraryByIdController } from './controllers/admin-delete-attachment-library-by-id.controller';
import { AdminDeleteAttachmentLibraryController } from './controllers/admin-delete-attachment-library.controller';

// resolvers
import { AdminCreateAttachmentLibraryResolver } from './resolvers/admin-create-attachment-library.resolver';
import { AdminCreateAttachmentLibraryResolver } from './resolvers/admin-create-attachment-library.resolver';
import { AdminPaginateAttachmentLibraryResolver } from './resolvers/admin-paginate-attachment-library.resolver';
import { AdminGetAttachmentLibraryResolver } from './resolvers/admin-get-attachment-library.resolver';
import { AdminFindAttachmentLibraryResolver } from './resolvers/admin-find-attachment-library.resolver';
import { AdminFindAttachmentLibraryByIdResolver } from './resolvers/admin-find-attachment-library-by-id.resolver';
import { AdminUpdateAttachmentLibraryResolver } from './resolvers/admin-update-attachment-library.resolver';
import { AdminDeleteAttachmentLibraryByIdResolver } from './resolvers/admin-delete-attachment-library-by-id.resolver';
import { AdminDeleteAttachmentLibraryResolver } from './resolvers/admin-delete-attachment-library.resolver';

export const AdminAttachmentLibraryControllers = [
    AdminCreateAttachmentLibraryController,
    AdminCreateAttachmentLibraryController,
    AdminPaginateAttachmentLibraryController,
    AdminGetAttachmentLibraryController,
    AdminFindAttachmentLibraryByIdController,
    AdminFindAttachmentLibraryController,
    AdminUpdateAttachmentLibraryController,
    AdminDeleteAttachmentLibraryByIdController,
    AdminDeleteAttachmentLibraryController,
];

export const AdminAttachmentLibraryResolvers = [
    AdminCreateAttachmentLibraryResolver,
    AdminCreateAttachmentLibraryResolver,
    AdminPaginateAttachmentLibraryResolver,
    AdminGetAttachmentLibraryResolver,
    AdminFindAttachmentLibraryResolver,
    AdminFindAttachmentLibraryByIdResolver,
    AdminUpdateAttachmentLibraryResolver,
    AdminDeleteAttachmentLibraryByIdResolver,
    AdminDeleteAttachmentLibraryResolver,
];