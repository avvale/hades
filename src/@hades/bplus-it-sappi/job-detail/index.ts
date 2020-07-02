// commands
import { CreateJobDetailCommandHandler } from './application/create/create-job-detail.command-handler';
import { InsertJobsDetailCommandHandler } from './application/insert/insert-jobs-detail.command-handler';
import { UpdateJobDetailCommandHandler } from './application/update/update-job-detail.command-handler';
import { DeleteJobDetailByIdCommandHandler } from './application/delete/delete-job-detail-by-id.command-handler';
import { DeleteJobsDetailCommandHandler } from './application/delete/delete-jobs-detail.command-handler';

// queries
import { PaginateJobsDetailQueryHandler } from './application/paginate/paginate-jobs-detail.query-handler';
import { GetJobsDetailQueryHandler } from './application/get/get-jobs-detail.query-handler';
import { FindJobDetailQueryHandler } from './application/find/find-job-detail.query-handler';
import { FindJobDetailByIdQueryHandler } from './application/find/find-job-detail-by-id.query-handler';

// events
import { CreatedJobDetailEventHandler } from './application/events/created-job-detail.event-handler';
import { UpdatedJobDetailEventHandler } from './application/events/updated-job-detail.event-handler';
import { DeletedJobDetailEventHandler } from './application/events/deleted-job-detail.event-handler';

// services
import { CreateJobDetailService } from './application/create/create-job-detail.service';
import { InsertJobsDetailService } from './application/insert/insert-jobs-detail.service';
import { PaginateJobsDetailService } from './application/paginate/paginate-jobs-detail.service';
import { GetJobsDetailService } from './application/get/get-jobs-detail.service';
import { FindJobDetailService } from './application/find/find-job-detail.service';
import { FindJobDetailByIdService } from './application/find/find-job-detail-by-id.service';
import { UpdateJobDetailService } from './application/update/update-job-detail.service';
import { DeleteJobDetailByIdService } from './application/delete/delete-job-detail-by-id.service';
import { DeleteJobsDetailService } from './application/delete/delete-jobs-detail.service';

// models
export { BplusItSappiJobDetailModel } from './infrastructure/sequelize/sequelize-job-detail.model';


// repository
export { IJobDetailRepository } from './domain/job-detail.repository';
export { SequelizeJobDetailRepository } from './infrastructure/sequelize/sequelize-job-detail.repository';

// sagas
export { JobDetailSagas } from './application/sagas/job-detail.sagas';

export const BplusItSappiJobDetailHandlers = [
    // commands
    CreateJobDetailCommandHandler,
    InsertJobsDetailCommandHandler,
    UpdateJobDetailCommandHandler,
    DeleteJobDetailByIdCommandHandler,
    DeleteJobsDetailCommandHandler,

    // queries
    PaginateJobsDetailQueryHandler,
    GetJobsDetailQueryHandler,
    FindJobDetailQueryHandler,
    FindJobDetailByIdQueryHandler,

    // events
    CreatedJobDetailEventHandler,
    UpdatedJobDetailEventHandler,
    DeletedJobDetailEventHandler,
];

export const BplusItSappiJobDetailServices = [
    CreateJobDetailService,
    InsertJobsDetailService,
    PaginateJobsDetailService,
    GetJobsDetailService,
    FindJobDetailService,
    FindJobDetailByIdService,
    UpdateJobDetailService,
    DeleteJobDetailByIdService,
    DeleteJobsDetailService,
];