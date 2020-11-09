// controllers
import { AdminCreateLangController } from './controllers/admin-create-lang.controller';
import { AdminCreateLangsController } from './controllers/admin-create-langs.controller';
import { AdminPaginateLangsController } from './controllers/admin-paginate-langs.controller';
import { AdminGetLangsController } from './controllers/admin-get-langs.controller';
import { AdminFindLangByIdController } from './controllers/admin-find-lang-by-id.controller';
import { AdminFindLangController } from './controllers/admin-find-lang.controller';
import { AdminUpdateLangController } from './controllers/admin-update-lang.controller';
import { AdminDeleteLangByIdController } from './controllers/admin-delete-lang-by-id.controller';
import { AdminDeleteLangsController } from './controllers/admin-delete-langs.controller';

// resolvers
import { AdminCreateLangResolver } from './resolvers/admin-create-lang.resolver';
import { AdminCreateLangsResolver } from './resolvers/admin-create-langs.resolver';
import { AdminPaginateLangsResolver } from './resolvers/admin-paginate-langs.resolver';
import { AdminGetLangsResolver } from './resolvers/admin-get-langs.resolver';
import { AdminFindLangResolver } from './resolvers/admin-find-lang.resolver';
import { AdminFindLangByIdResolver } from './resolvers/admin-find-lang-by-id.resolver';
import { AdminUpdateLangResolver } from './resolvers/admin-update-lang.resolver';
import { AdminDeleteLangByIdResolver } from './resolvers/admin-delete-lang-by-id.resolver';
import { AdminDeleteLangsResolver } from './resolvers/admin-delete-langs.resolver';

export const AdminLangControllers = [
    AdminCreateLangController,
    AdminCreateLangsController,
    AdminPaginateLangsController,
    AdminGetLangsController,
    AdminFindLangByIdController,
    AdminFindLangController,
    AdminUpdateLangController,
    AdminDeleteLangByIdController,
    AdminDeleteLangsController,
];

export const AdminLangResolvers = [
    AdminCreateLangResolver,
    AdminCreateLangsResolver,
    AdminPaginateLangsResolver,
    AdminGetLangsResolver,
    AdminFindLangResolver,
    AdminFindLangByIdResolver,
    AdminUpdateLangResolver,
    AdminDeleteLangByIdResolver,
    AdminDeleteLangsResolver,
];