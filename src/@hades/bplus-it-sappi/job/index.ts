// commands
import { CreateJobCommandHandler } from './application/create/create-job.command-handler';
import { InsertJobsCommandHandler } from './application/insert/insert-jobs.command-handler';
import { UpdateJobCommandHandler } from './application/update/update-job.command-handler';
import { DeleteJobByIdCommandHandler } from './application/delete/delete-job-by-id.command-handler';
import { DeleteJobsCommandHandler } from './application/delete/delete-jobs.command-handler';

// queries
import { PaginateJobsQueryHandler } from './application/paginate/paginate-jobs.query-handler';
import { GetJobsQueryHandler } from './application/get/get-jobs.query-handler';
import { FindJobQueryHandler } from './application/find/find-job.query-handler';
import { FindJobByIdQueryHandler } from './application/find/find-job-by-id.query-handler';

// events
import { CreatedJobEventHandler } from './application/events/created-job.event-handler';
import { UpdatedJobEventHandler } from './application/events/updated-job.event-handler';
import { DeletedJobEventHandler } from './application/events/deleted-job.event-handler';

// services
import { CreateJobService } from './application/create/create-job.service';
import { InsertJobsService } from './application/insert/insert-jobs.service';
import { PaginateJobsService } from './application/paginate/paginate-jobs.service';
import { GetJobsService } from './application/get/get-jobs.service';
import { FindJobService } from './application/find/find-job.service';
import { FindJobByIdService } from './application/find/find-job-by-id.service';
import { UpdateJobService } from './application/update/update-job.service';
import { DeleteJobByIdService } from './application/delete/delete-job-by-id.service';
import { DeleteJobsService } from './application/delete/delete-jobs.service';

// models
export { BplusItSappiJobModel } from './infrastructure/sequelize/sequelize-job.model';


// repository
export { IJobRepository } from './domain/job.repository';
export { SequelizeJobRepository } from './infrastructure/sequelize/sequelize-job.repository';

// sagas
export { JobSagas } from './application/sagas/job.sagas';

export const BplusItSappiJobHandlers = [
    // commands
    CreateJobCommandHandler,
    InsertJobsCommandHandler,
    UpdateJobCommandHandler,
    DeleteJobByIdCommandHandler,
    DeleteJobsCommandHandler,

    // queries
    PaginateJobsQueryHandler,
    GetJobsQueryHandler,
    FindJobQueryHandler,
    FindJobByIdQueryHandler,

    // events
    CreatedJobEventHandler,
    UpdatedJobEventHandler,
    DeletedJobEventHandler,
];

export const BplusItSappiJobServices = [
    CreateJobService,
    InsertJobsService,
    PaginateJobsService,
    GetJobsService,
    FindJobService,
    FindJobByIdService,
    UpdateJobService,
    DeleteJobByIdService,
    DeleteJobsService,
];