// controllers
import { AdminCreateCountryController } from './controllers/admin-create-country.controller';
import { AdminCreateCountriesController } from './controllers/admin-create-countries.controller';
import { AdminPaginateCountriesController } from './controllers/admin-paginate-countries.controller';
import { AdminGetCountriesController } from './controllers/admin-get-countries.controller';
import { AdminFindCountryByIdController } from './controllers/admin-find-country-by-id.controller';
import { AdminFindCountryController } from './controllers/admin-find-country.controller';
import { AdminUpdateCountryController } from './controllers/admin-update-country.controller';
import { AdminDeleteCountryByIdController } from './controllers/admin-delete-country-by-id.controller';
import { AdminDeleteCountriesController } from './controllers/admin-delete-countries.controller';

// resolvers
import { AdminCreateCountryResolver } from './resolvers/admin-create-country.resolver';
import { AdminCreateCountriesResolver } from './resolvers/admin-create-countries.resolver';
import { AdminPaginateCountriesResolver } from './resolvers/admin-paginate-countries.resolver';
import { AdminGetCountriesResolver } from './resolvers/admin-get-countries.resolver';
import { AdminFindCountryResolver } from './resolvers/admin-find-country.resolver';
import { AdminFindCountryByIdResolver } from './resolvers/admin-find-country-by-id.resolver';
import { AdminUpdateCountryResolver } from './resolvers/admin-update-country.resolver';
import { AdminDeleteCountryByIdResolver } from './resolvers/admin-delete-country-by-id.resolver';
import { AdminDeleteCountriesResolver } from './resolvers/admin-delete-countries.resolver';

export const AdminCountryControllers = [
    AdminCreateCountryController,
    AdminCreateCountriesController,
    AdminPaginateCountriesController,
    AdminGetCountriesController,
    AdminFindCountryByIdController,
    AdminFindCountryController,
    AdminUpdateCountryController,
    AdminDeleteCountryByIdController,
    AdminDeleteCountriesController,
];

export const AdminCountryResolvers = [
    AdminCreateCountryResolver,
    AdminCreateCountriesResolver,
    AdminPaginateCountriesResolver,
    AdminGetCountriesResolver,
    AdminFindCountryResolver,
    AdminFindCountryByIdResolver,
    AdminUpdateCountryResolver,
    AdminDeleteCountryByIdResolver,
    AdminDeleteCountriesResolver,
];