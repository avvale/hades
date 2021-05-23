// controllers
import { AdminCreateAdministrativeAreaLevel1Controller } from './controllers/admin-create-administrative-area-level-1.controller';
import { AdminCreateAdministrativeAreasLevel1Controller } from './controllers/admin-create-administrative-areas-level-1.controller';
import { AdminPaginateAdministrativeAreasLevel1Controller } from './controllers/admin-paginate-administrative-areas-level-1.controller';
import { AdminGetAdministrativeAreasLevel1Controller } from './controllers/admin-get-administrative-areas-level-1.controller';
import { AdminFindAdministrativeAreaLevel1ByIdController } from './controllers/admin-find-administrative-area-level-1-by-id.controller';
import { AdminFindAdministrativeAreaLevel1Controller } from './controllers/admin-find-administrative-area-level-1.controller';
import { AdminUpdateAdministrativeAreaLevel1Controller } from './controllers/admin-update-administrative-area-level-1.controller';
import { AdminDeleteAdministrativeAreaLevel1ByIdController } from './controllers/admin-delete-administrative-area-level-1-by-id.controller';
import { AdminDeleteAdministrativeAreasLevel1Controller } from './controllers/admin-delete-administrative-areas-level-1.controller';

// resolvers
import { AdminCreateAdministrativeAreaLevel1Resolver } from './resolvers/admin-create-administrative-area-level-1.resolver';
import { AdminCreateAdministrativeAreasLevel1Resolver } from './resolvers/admin-create-administrative-areas-level-1.resolver';
import { AdminPaginateAdministrativeAreasLevel1Resolver } from './resolvers/admin-paginate-administrative-areas-level-1.resolver';
import { AdminGetAdministrativeAreasLevel1Resolver } from './resolvers/admin-get-administrative-areas-level-1.resolver';
import { AdminFindAdministrativeAreaLevel1ByIdResolver } from './resolvers/admin-find-administrative-area-level-1-by-id.resolver';
import { AdminFindAdministrativeAreaLevel1Resolver } from './resolvers/admin-find-administrative-area-level-1.resolver';
import { AdminUpdateAdministrativeAreaLevel1Resolver } from './resolvers/admin-update-administrative-area-level-1.resolver';
import { AdminDeleteAdministrativeAreaLevel1ByIdResolver } from './resolvers/admin-delete-administrative-area-level-1-by-id.resolver';
import { AdminDeleteAdministrativeAreasLevel1Resolver } from './resolvers/admin-delete-administrative-areas-level-1.resolver';

export const AdminAdministrativeAreaLevel1Controllers = [
    AdminCreateAdministrativeAreaLevel1Controller,
    AdminCreateAdministrativeAreasLevel1Controller,
    AdminPaginateAdministrativeAreasLevel1Controller,
    AdminGetAdministrativeAreasLevel1Controller,
    AdminFindAdministrativeAreaLevel1ByIdController,
    AdminFindAdministrativeAreaLevel1Controller,
    AdminUpdateAdministrativeAreaLevel1Controller,
    AdminDeleteAdministrativeAreaLevel1ByIdController,
    AdminDeleteAdministrativeAreasLevel1Controller,
];

export const AdminAdministrativeAreaLevel1Resolvers = [
    AdminCreateAdministrativeAreaLevel1Resolver,
    AdminCreateAdministrativeAreasLevel1Resolver,
    AdminPaginateAdministrativeAreasLevel1Resolver,
    AdminGetAdministrativeAreasLevel1Resolver,
    AdminFindAdministrativeAreaLevel1ByIdResolver,
    AdminFindAdministrativeAreaLevel1Resolver,
    AdminUpdateAdministrativeAreaLevel1Resolver,
    AdminDeleteAdministrativeAreaLevel1ByIdResolver,
    AdminDeleteAdministrativeAreasLevel1Resolver,
];