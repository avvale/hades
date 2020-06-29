// controllers
import { CreateJobController } from './controllers/create-job.controller';
import { InsertJobsController } from './controllers/insert-jobs.controller';
import { PaginateJobsController } from './controllers/paginate-jobs.controller';
import { GetJobsController } from './controllers/get-jobs.controller';
import { FindJobByIdController } from './controllers/find-job-by-id.controller';
import { FindJobController } from './controllers/find-job.controller';
import { UpdateJobController } from './controllers/update-job.controller';
import { DeleteJobByIdController } from './controllers/delete-job-by-id.controller';
import { DeleteJobsController } from './controllers/delete-jobs.controller';

// resolvers
import { CreateJobResolver } from './resolvers/create-job.resolver';
import { InsertJobsResolver } from './resolvers/insert-jobs.resolver';
import { PaginateJobsResolver } from './resolvers/paginate-jobs.resolver';
import { GetJobsResolver } from './resolvers/get-jobs.resolver';
import { FindJobResolver } from './resolvers/find-job.resolver';
import { FindJobByIdResolver } from './resolvers/find-job-by-id.resolver';
import { UpdateJobResolver } from './resolvers/update-job.resolver';
import { DeleteJobByIdResolver } from './resolvers/delete-job-by-id.resolver';
import { DeleteJobsResolver } from './resolvers/delete-jobs.resolver';

export const BplusItSappiJobControllers = [
    CreateJobController,
    InsertJobsController,
    PaginateJobsController,
    GetJobsController,
    FindJobByIdController,
    FindJobController,
    UpdateJobController,
    DeleteJobByIdController,
    DeleteJobsController,
];

export const BplusItSappiJobResolvers = [
    CreateJobResolver,
    InsertJobsResolver,
    PaginateJobsResolver,
    GetJobsResolver,
    FindJobResolver,
    FindJobByIdResolver,
    UpdateJobResolver,
    DeleteJobByIdResolver,
    DeleteJobsResolver,
];