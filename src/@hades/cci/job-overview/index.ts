// commands
import { CreateJobOverviewCommandHandler } from './application/create/create-job-overview.command-handler';
import { CreateJobsOverviewCommandHandler } from './application/create/create-jobs-overview.command-handler';
import { UpdateJobOverviewCommandHandler } from './application/update/update-job-overview.command-handler';
import { DeleteJobOverviewByIdCommandHandler } from './application/delete/delete-job-overview-by-id.command-handler';
import { DeleteJobsOverviewCommandHandler } from './application/delete/delete-jobs-overview.command-handler';

// queries
import { PaginateJobsOverviewQueryHandler } from './application/paginate/paginate-jobs-overview.query-handler';
import { GetJobsOverviewQueryHandler } from './application/get/get-jobs-overview.query-handler';
import { FindJobOverviewQueryHandler } from './application/find/find-job-overview.query-handler';
import { FindJobOverviewByIdQueryHandler } from './application/find/find-job-overview-by-id.query-handler';

// events
import { CreatedJobOverviewEventHandler } from './application/events/created-job-overview.event-handler';
import { CreatedJobsOverviewEventHandler } from './application/events/created-jobs-overview.event-handler';
import { UpdatedJobOverviewEventHandler } from './application/events/updated-job-overview.event-handler';
import { DeletedJobOverviewEventHandler } from './application/events/deleted-job-overview.event-handler';
import { DeletedJobsOverviewEventHandler } from './application/events/deleted-jobs-overview.event-handler';

// services
import { CreateJobOverviewService } from './application/create/create-job-overview.service';
import { CreateJobsOverviewService } from './application/create/create-jobs-overview.service';
import { PaginateJobsOverviewService } from './application/paginate/paginate-jobs-overview.service';
import { GetJobsOverviewService } from './application/get/get-jobs-overview.service';
import { FindJobOverviewService } from './application/find/find-job-overview.service';
import { FindJobOverviewByIdService } from './application/find/find-job-overview-by-id.service';
import { UpdateJobOverviewService } from './application/update/update-job-overview.service';
import { DeleteJobOverviewByIdService } from './application/delete/delete-job-overview-by-id.service';
import { DeleteJobsOverviewService } from './application/delete/delete-jobs-overview.service';

// models
export { CciJobOverviewModel } from './infrastructure/sequelize/sequelize-job-overview.model';


// repository
export { IJobOverviewRepository } from './domain/job-overview.repository';
export { SequelizeJobOverviewRepository } from './infrastructure/sequelize/sequelize-job-overview.repository';

// sagas
export { JobOverviewSagas } from './application/sagas/job-overview.sagas';

export const CciJobOverviewHandlers = [
    // commands
    CreateJobOverviewCommandHandler,
    CreateJobsOverviewCommandHandler,
    UpdateJobOverviewCommandHandler,
    DeleteJobOverviewByIdCommandHandler,
    DeleteJobsOverviewCommandHandler,

    // queries
    PaginateJobsOverviewQueryHandler,
    GetJobsOverviewQueryHandler,
    FindJobOverviewQueryHandler,
    FindJobOverviewByIdQueryHandler,

    // events
    CreatedJobOverviewEventHandler,
    CreatedJobsOverviewEventHandler,
    UpdatedJobOverviewEventHandler,
    DeletedJobOverviewEventHandler,
    DeletedJobsOverviewEventHandler,
];

export const CciJobOverviewServices = [
    CreateJobOverviewService,
    CreateJobsOverviewService,
    PaginateJobsOverviewService,
    GetJobsOverviewService,
    FindJobOverviewService,
    FindJobOverviewByIdService,
    UpdateJobOverviewService,
    DeleteJobOverviewByIdService,
    DeleteJobsOverviewService,
];