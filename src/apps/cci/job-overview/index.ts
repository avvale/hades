// controllers
import { CciCreateJobOverviewController } from './controllers/cci-create-job-overview.controller';
import { CciCreateJobsOverviewController } from './controllers/cci-create-jobs-overview.controller';
import { CciPaginateJobsOverviewController } from './controllers/cci-paginate-jobs-overview.controller';
import { CciGetJobsOverviewController } from './controllers/cci-get-jobs-overview.controller';
import { CciFindJobOverviewByIdController } from './controllers/cci-find-job-overview-by-id.controller';
import { CciFindJobOverviewController } from './controllers/cci-find-job-overview.controller';
import { CciUpdateJobOverviewController } from './controllers/cci-update-job-overview.controller';
import { CciDeleteJobOverviewByIdController } from './controllers/cci-delete-job-overview-by-id.controller';
import { CciDeleteJobsOverviewController } from './controllers/cci-delete-jobs-overview.controller';

// resolvers
import { CciCreateJobOverviewResolver } from './resolvers/cci-create-job-overview.resolver';
import { CciCreateJobsOverviewResolver } from './resolvers/cci-create-jobs-overview.resolver';
import { CciPaginateJobsOverviewResolver } from './resolvers/cci-paginate-jobs-overview.resolver';
import { CciGetJobsOverviewResolver } from './resolvers/cci-get-jobs-overview.resolver';
import { CciFindJobOverviewResolver } from './resolvers/cci-find-job-overview.resolver';
import { CciFindJobOverviewByIdResolver } from './resolvers/cci-find-job-overview-by-id.resolver';
import { CciUpdateJobOverviewResolver } from './resolvers/cci-update-job-overview.resolver';
import { CciDeleteJobOverviewByIdResolver } from './resolvers/cci-delete-job-overview-by-id.resolver';
import { CciDeleteJobsOverviewResolver } from './resolvers/cci-delete-jobs-overview.resolver';

export const CciJobOverviewControllers = [
    CciCreateJobOverviewController,
    CciCreateJobsOverviewController,
    CciPaginateJobsOverviewController,
    CciGetJobsOverviewController,
    CciFindJobOverviewByIdController,
    CciFindJobOverviewController,
    CciUpdateJobOverviewController,
    CciDeleteJobOverviewByIdController,
    CciDeleteJobsOverviewController,
];

export const CciJobOverviewResolvers = [
    CciCreateJobOverviewResolver,
    CciCreateJobsOverviewResolver,
    CciPaginateJobsOverviewResolver,
    CciGetJobsOverviewResolver,
    CciFindJobOverviewResolver,
    CciFindJobOverviewByIdResolver,
    CciUpdateJobOverviewResolver,
    CciDeleteJobOverviewByIdResolver,
    CciDeleteJobsOverviewResolver,
];