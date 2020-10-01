// controllers
import { CreateApplicationController } from './controllers/create-application.controller';
import { CreateApplicationsController } from './controllers/create-applications.controller';
import { PaginateApplicationsController } from './controllers/paginate-applications.controller';
import { GetApplicationsController } from './controllers/get-applications.controller';
import { FindApplicationByIdController } from './controllers/find-application-by-id.controller';
import { FindApplicationController } from './controllers/find-application.controller';
import { UpdateApplicationController } from './controllers/update-application.controller';
import { DeleteApplicationByIdController } from './controllers/delete-application-by-id.controller';
import { DeleteApplicationsController } from './controllers/delete-applications.controller';

// resolvers
import { CreateApplicationResolver } from './resolvers/create-application.resolver';
import { CreateApplicationsResolver } from './resolvers/create-applications.resolver';
import { PaginateApplicationsResolver } from './resolvers/paginate-applications.resolver';
import { GetApplicationsResolver } from './resolvers/get-applications.resolver';
import { FindApplicationResolver } from './resolvers/find-application.resolver';
import { FindApplicationByIdResolver } from './resolvers/find-application-by-id.resolver';
import { UpdateApplicationResolver } from './resolvers/update-application.resolver';
import { DeleteApplicationByIdResolver } from './resolvers/delete-application-by-id.resolver';
import { DeleteApplicationsResolver } from './resolvers/delete-applications.resolver';

export const OAuthApplicationControllers = [
    CreateApplicationController,
    CreateApplicationsController,
    PaginateApplicationsController,
    GetApplicationsController,
    FindApplicationByIdController,
    FindApplicationController,
    UpdateApplicationController,
    DeleteApplicationByIdController,
    DeleteApplicationsController,
];

export const OAuthApplicationResolvers = [
    CreateApplicationResolver,
    CreateApplicationsResolver,
    PaginateApplicationsResolver,
    GetApplicationsResolver,
    FindApplicationResolver,
    FindApplicationByIdResolver,
    UpdateApplicationResolver,
    DeleteApplicationByIdResolver,
    DeleteApplicationsResolver,
];