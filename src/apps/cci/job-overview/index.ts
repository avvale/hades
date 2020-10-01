// controllers
import { CreateJobOverviewController } from './controllers/create-job-overview.controller';
import { CreateJobsOverviewController } from './controllers/create-jobs-overview.controller';
import { PaginateJobsOverviewController } from './controllers/paginate-jobs-overview.controller';
import { GetJobsOverviewController } from './controllers/get-jobs-overview.controller';
import { FindJobOverviewByIdController } from './controllers/find-job-overview-by-id.controller';
import { FindJobOverviewController } from './controllers/find-job-overview.controller';
import { UpdateJobOverviewController } from './controllers/update-job-overview.controller';
import { DeleteJobOverviewByIdController } from './controllers/delete-job-overview-by-id.controller';
import { DeleteJobsOverviewController } from './controllers/delete-jobs-overview.controller';

// resolvers
import { CreateJobOverviewResolver } from './resolvers/create-job-overview.resolver';
import { CreateJobsOverviewResolver } from './resolvers/create-jobs-overview.resolver';
import { PaginateJobsOverviewResolver } from './resolvers/paginate-jobs-overview.resolver';
import { GetJobsOverviewResolver } from './resolvers/get-jobs-overview.resolver';
import { FindJobOverviewResolver } from './resolvers/find-job-overview.resolver';
import { FindJobOverviewByIdResolver } from './resolvers/find-job-overview-by-id.resolver';
import { UpdateJobOverviewResolver } from './resolvers/update-job-overview.resolver';
import { DeleteJobOverviewByIdResolver } from './resolvers/delete-job-overview-by-id.resolver';
import { DeleteJobsOverviewResolver } from './resolvers/delete-jobs-overview.resolver';

export const CciJobOverviewControllers = [
    CreateJobOverviewController,
    CreateJobsOverviewController,
    PaginateJobsOverviewController,
    GetJobsOverviewController,
    FindJobOverviewByIdController,
    FindJobOverviewController,
    UpdateJobOverviewController,
    DeleteJobOverviewByIdController,
    DeleteJobsOverviewController,
];

export const CciJobOverviewResolvers = [
    CreateJobOverviewResolver,
    CreateJobsOverviewResolver,
    PaginateJobsOverviewResolver,
    GetJobsOverviewResolver,
    FindJobOverviewResolver,
    FindJobOverviewByIdResolver,
    UpdateJobOverviewResolver,
    DeleteJobOverviewByIdResolver,
    DeleteJobsOverviewResolver,
];