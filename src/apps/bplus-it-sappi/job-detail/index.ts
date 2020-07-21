// controllers
import { CreateJobDetailController } from './controllers/create-job-detail.controller';
import { CreateJobsDetailController } from './controllers/create-jobs-detail.controller';
import { PaginateJobsDetailController } from './controllers/paginate-jobs-detail.controller';
import { GetJobsDetailController } from './controllers/get-jobs-detail.controller';
import { FindJobDetailByIdController } from './controllers/find-job-detail-by-id.controller';
import { FindJobDetailController } from './controllers/find-job-detail.controller';
import { UpdateJobDetailController } from './controllers/update-job-detail.controller';
import { DeleteJobDetailByIdController } from './controllers/delete-job-detail-by-id.controller';
import { DeleteJobsDetailController } from './controllers/delete-jobs-detail.controller';

// resolvers
import { CreateJobDetailResolver } from './resolvers/create-job-detail.resolver';
import { CreateJobsDetailResolver } from './resolvers/create-jobs-detail.resolver';
import { PaginateJobsDetailResolver } from './resolvers/paginate-jobs-detail.resolver';
import { GetJobsDetailResolver } from './resolvers/get-jobs-detail.resolver';
import { FindJobDetailResolver } from './resolvers/find-job-detail.resolver';
import { FindJobDetailByIdResolver } from './resolvers/find-job-detail-by-id.resolver';
import { UpdateJobDetailResolver } from './resolvers/update-job-detail.resolver';
import { DeleteJobDetailByIdResolver } from './resolvers/delete-job-detail-by-id.resolver';
import { DeleteJobsDetailResolver } from './resolvers/delete-jobs-detail.resolver';

export const BplusItSappiJobDetailControllers = [
    CreateJobDetailController,
    CreateJobsDetailController,
    PaginateJobsDetailController,
    GetJobsDetailController,
    FindJobDetailByIdController,
    FindJobDetailController,
    UpdateJobDetailController,
    DeleteJobDetailByIdController,
    DeleteJobsDetailController,
];

export const BplusItSappiJobDetailResolvers = [
    CreateJobDetailResolver,
    CreateJobsDetailResolver,
    PaginateJobsDetailResolver,
    GetJobsDetailResolver,
    FindJobDetailResolver,
    FindJobDetailByIdResolver,
    UpdateJobDetailResolver,
    DeleteJobDetailByIdResolver,
    DeleteJobsDetailResolver,
];