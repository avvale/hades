// controllers
import { AdminCreateAttachmentLibraryController } from './controllers/admin-create-attachment-library.controller';
import { AdminCreateAttachmentLibrariesController } from './controllers/admin-create-attachment-libraries.controller';
import { AdminPaginateAttachmentLibrariesController } from './controllers/admin-paginate-attachment-libraries.controller';
import { AdminGetAttachmentLibrariesController } from './controllers/admin-get-attachment-libraries.controller';
import { AdminFindAttachmentLibraryByIdController } from './controllers/admin-find-attachment-library-by-id.controller';
import { AdminFindAttachmentLibraryController } from './controllers/admin-find-attachment-library.controller';
import { AdminUpdateAttachmentLibraryController } from './controllers/admin-update-attachment-library.controller';
import { AdminDeleteAttachmentLibraryByIdController } from './controllers/admin-delete-attachment-library-by-id.controller';
import { AdminDeleteAttachmentLibrariesController } from './controllers/admin-delete-attachment-libraries.controller';

// resolvers
import { AdminCreateAttachmentLibraryResolver } from './resolvers/admin-create-attachment-library.resolver';
import { AdminCreateAttachmentLibrariesResolver } from './resolvers/admin-create-attachment-libraries.resolver';
import { AdminPaginateAttachmentLibrariesResolver } from './resolvers/admin-paginate-attachment-libraries.resolver';
import { AdminGetAttachmentLibrariesResolver } from './resolvers/admin-get-attachment-libraries.resolver';
import { AdminFindAttachmentLibraryByIdResolver } from './resolvers/admin-find-attachment-library-by-id.resolver';
import { AdminFindAttachmentLibraryResolver } from './resolvers/admin-find-attachment-library.resolver';
import { AdminUpdateAttachmentLibraryResolver } from './resolvers/admin-update-attachment-library.resolver';
import { AdminDeleteAttachmentLibraryByIdResolver } from './resolvers/admin-delete-attachment-library-by-id.resolver';
import { AdminDeleteAttachmentLibrariesResolver } from './resolvers/admin-delete-attachment-libraries.resolver';

export const AdminAttachmentLibraryControllers = [
    AdminCreateAttachmentLibraryController,
    AdminCreateAttachmentLibrariesController,
    AdminPaginateAttachmentLibrariesController,
    AdminGetAttachmentLibrariesController,
    AdminFindAttachmentLibraryByIdController,
    AdminFindAttachmentLibraryController,
    AdminUpdateAttachmentLibraryController,
    AdminDeleteAttachmentLibraryByIdController,
    AdminDeleteAttachmentLibrariesController,
];

export const AdminAttachmentLibraryResolvers = [
    AdminCreateAttachmentLibraryResolver,
    AdminCreateAttachmentLibrariesResolver,
    AdminPaginateAttachmentLibrariesResolver,
    AdminGetAttachmentLibrariesResolver,
    AdminFindAttachmentLibraryByIdResolver,
    AdminFindAttachmentLibraryResolver,
    AdminUpdateAttachmentLibraryResolver,
    AdminDeleteAttachmentLibraryByIdResolver,
    AdminDeleteAttachmentLibrariesResolver,
];