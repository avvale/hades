// controllers
import { AdminCreateAttachmentFamilyController } from './controllers/admin-create-attachment-family.controller';
import { AdminCreateAttachmentFamiliesController } from './controllers/admin-create-attachment-families.controller';
import { AdminPaginateAttachmentFamiliesController } from './controllers/admin-paginate-attachment-families.controller';
import { AdminGetAttachmentFamiliesController } from './controllers/admin-get-attachment-families.controller';
import { AdminFindAttachmentFamilyByIdController } from './controllers/admin-find-attachment-family-by-id.controller';
import { AdminFindAttachmentFamilyController } from './controllers/admin-find-attachment-family.controller';
import { AdminUpdateAttachmentFamilyController } from './controllers/admin-update-attachment-family.controller';
import { AdminDeleteAttachmentFamilyByIdController } from './controllers/admin-delete-attachment-family-by-id.controller';
import { AdminDeleteAttachmentFamiliesController } from './controllers/admin-delete-attachment-families.controller';

// resolvers
import { AdminCreateAttachmentFamilyResolver } from './resolvers/admin-create-attachment-family.resolver';
import { AdminCreateAttachmentFamiliesResolver } from './resolvers/admin-create-attachment-families.resolver';
import { AdminPaginateAttachmentFamiliesResolver } from './resolvers/admin-paginate-attachment-families.resolver';
import { AdminGetAttachmentFamiliesResolver } from './resolvers/admin-get-attachment-families.resolver';
import { AdminFindAttachmentFamilyByIdResolver } from './resolvers/admin-find-attachment-family-by-id.resolver';
import { AdminFindAttachmentFamilyResolver } from './resolvers/admin-find-attachment-family.resolver';
import { AdminUpdateAttachmentFamilyResolver } from './resolvers/admin-update-attachment-family.resolver';
import { AdminDeleteAttachmentFamilyByIdResolver } from './resolvers/admin-delete-attachment-family-by-id.resolver';
import { AdminDeleteAttachmentFamiliesResolver } from './resolvers/admin-delete-attachment-families.resolver';

export const AdminAttachmentFamilyControllers = [
    AdminCreateAttachmentFamilyController,
    AdminCreateAttachmentFamiliesController,
    AdminPaginateAttachmentFamiliesController,
    AdminGetAttachmentFamiliesController,
    AdminFindAttachmentFamilyByIdController,
    AdminFindAttachmentFamilyController,
    AdminUpdateAttachmentFamilyController,
    AdminDeleteAttachmentFamilyByIdController,
    AdminDeleteAttachmentFamiliesController,
];

export const AdminAttachmentFamilyResolvers = [
    AdminCreateAttachmentFamilyResolver,
    AdminCreateAttachmentFamiliesResolver,
    AdminPaginateAttachmentFamiliesResolver,
    AdminGetAttachmentFamiliesResolver,
    AdminFindAttachmentFamilyByIdResolver,
    AdminFindAttachmentFamilyResolver,
    AdminUpdateAttachmentFamilyResolver,
    AdminDeleteAttachmentFamilyByIdResolver,
    AdminDeleteAttachmentFamiliesResolver,
];