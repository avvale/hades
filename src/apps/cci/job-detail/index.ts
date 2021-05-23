// controllers
import { CciCreateJobDetailController } from './controllers/cci-create-job-detail.controller';
import { CciCreateJobsDetailController } from './controllers/cci-create-jobs-detail.controller';
import { CciPaginateJobsDetailController } from './controllers/cci-paginate-jobs-detail.controller';
import { CciGetJobsDetailController } from './controllers/cci-get-jobs-detail.controller';
import { CciFindJobDetailByIdController } from './controllers/cci-find-job-detail-by-id.controller';
import { CciFindJobDetailController } from './controllers/cci-find-job-detail.controller';
import { CciUpdateJobDetailController } from './controllers/cci-update-job-detail.controller';
import { CciDeleteJobDetailByIdController } from './controllers/cci-delete-job-detail-by-id.controller';
import { CciDeleteJobsDetailController } from './controllers/cci-delete-jobs-detail.controller';

// resolvers
import { CciCreateJobDetailResolver } from './resolvers/cci-create-job-detail.resolver';
import { CciCreateJobsDetailResolver } from './resolvers/cci-create-jobs-detail.resolver';
import { CciPaginateJobsDetailResolver } from './resolvers/cci-paginate-jobs-detail.resolver';
import { CciGetJobsDetailResolver } from './resolvers/cci-get-jobs-detail.resolver';
import { CciFindJobDetailByIdResolver } from './resolvers/cci-find-job-detail-by-id.resolver';
import { CciFindJobDetailResolver } from './resolvers/cci-find-job-detail.resolver';
import { CciUpdateJobDetailResolver } from './resolvers/cci-update-job-detail.resolver';
import { CciDeleteJobDetailByIdResolver } from './resolvers/cci-delete-job-detail-by-id.resolver';
import { CciDeleteJobsDetailResolver } from './resolvers/cci-delete-jobs-detail.resolver';

export const CciJobDetailControllers = [
    CciCreateJobDetailController,
    CciCreateJobsDetailController,
    CciPaginateJobsDetailController,
    CciGetJobsDetailController,
    CciFindJobDetailByIdController,
    CciFindJobDetailController,
    CciUpdateJobDetailController,
    CciDeleteJobDetailByIdController,
    CciDeleteJobsDetailController,
];

export const CciJobDetailResolvers = [
    CciCreateJobDetailResolver,
    CciCreateJobsDetailResolver,
    CciPaginateJobsDetailResolver,
    CciGetJobsDetailResolver,
    CciFindJobDetailByIdResolver,
    CciFindJobDetailResolver,
    CciUpdateJobDetailResolver,
    CciDeleteJobDetailByIdResolver,
    CciDeleteJobsDetailResolver,
];