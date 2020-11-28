// controllers
import { AdminCreateAdministrativeAreaLevel3Controller } from './controllers/admin-create-administrative-area-level-3.controller';
import { AdminCreateAdministrativeAreasLevel3Controller } from './controllers/admin-create-administrative-areas-level-3.controller';
import { AdminPaginateAdministrativeAreasLevel3Controller } from './controllers/admin-paginate-administrative-areas-level-3.controller';
import { AdminGetAdministrativeAreasLevel3Controller } from './controllers/admin-get-administrative-areas-level-3.controller';
import { AdminFindAdministrativeAreaLevel3ByIdController } from './controllers/admin-find-administrative-area-level-3-by-id.controller';
import { AdminFindAdministrativeAreaLevel3Controller } from './controllers/admin-find-administrative-area-level-3.controller';
import { AdminUpdateAdministrativeAreaLevel3Controller } from './controllers/admin-update-administrative-area-level-3.controller';
import { AdminDeleteAdministrativeAreaLevel3ByIdController } from './controllers/admin-delete-administrative-area-level-3-by-id.controller';
import { AdminDeleteAdministrativeAreasLevel3Controller } from './controllers/admin-delete-administrative-areas-level-3.controller';

// resolvers
import { AdminCreateAdministrativeAreaLevel3Resolver } from './resolvers/admin-create-administrative-area-level-3.resolver';
import { AdminCreateAdministrativeAreasLevel3Resolver } from './resolvers/admin-create-administrative-areas-level-3.resolver';
import { AdminPaginateAdministrativeAreasLevel3Resolver } from './resolvers/admin-paginate-administrative-areas-level-3.resolver';
import { AdminGetAdministrativeAreasLevel3Resolver } from './resolvers/admin-get-administrative-areas-level-3.resolver';
import { AdminFindAdministrativeAreaLevel3Resolver } from './resolvers/admin-find-administrative-area-level-3.resolver';
import { AdminFindAdministrativeAreaLevel3ByIdResolver } from './resolvers/admin-find-administrative-area-level-3-by-id.resolver';
import { AdminUpdateAdministrativeAreaLevel3Resolver } from './resolvers/admin-update-administrative-area-level-3.resolver';
import { AdminDeleteAdministrativeAreaLevel3ByIdResolver } from './resolvers/admin-delete-administrative-area-level-3-by-id.resolver';
import { AdminDeleteAdministrativeAreasLevel3Resolver } from './resolvers/admin-delete-administrative-areas-level-3.resolver';

export const AdminAdministrativeAreaLevel3Controllers = [
    AdminCreateAdministrativeAreaLevel3Controller,
    AdminCreateAdministrativeAreasLevel3Controller,
    AdminPaginateAdministrativeAreasLevel3Controller,
    AdminGetAdministrativeAreasLevel3Controller,
    AdminFindAdministrativeAreaLevel3ByIdController,
    AdminFindAdministrativeAreaLevel3Controller,
    AdminUpdateAdministrativeAreaLevel3Controller,
    AdminDeleteAdministrativeAreaLevel3ByIdController,
    AdminDeleteAdministrativeAreasLevel3Controller,
];

export const AdminAdministrativeAreaLevel3Resolvers = [
    AdminCreateAdministrativeAreaLevel3Resolver,
    AdminCreateAdministrativeAreasLevel3Resolver,
    AdminPaginateAdministrativeAreasLevel3Resolver,
    AdminGetAdministrativeAreasLevel3Resolver,
    AdminFindAdministrativeAreaLevel3Resolver,
    AdminFindAdministrativeAreaLevel3ByIdResolver,
    AdminUpdateAdministrativeAreaLevel3Resolver,
    AdminDeleteAdministrativeAreaLevel3ByIdResolver,
    AdminDeleteAdministrativeAreasLevel3Resolver,
];