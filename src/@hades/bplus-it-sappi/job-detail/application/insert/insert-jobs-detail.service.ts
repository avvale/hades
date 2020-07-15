import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    JobDetailId, 
    JobDetailTenantId, 
    JobDetailSystemId, 
    JobDetailSystemName, 
    JobDetailExecutionId, 
    JobDetailExecutionType, 
    JobDetailExecutionExecutedAt, 
    JobDetailExecutionMonitoringStartAt, 
    JobDetailExecutionMonitoringEndAt, 
    JobDetailStatus, 
    JobDetailName, 
    JobDetailReturnCode, 
    JobDetailNode, 
    JobDetailUser, 
    JobDetailCreatedAt, 
    JobDetailUpdatedAt, 
    JobDetailDeletedAt
    
} from './../../domain/value-objects';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { BplusItSappiJobDetail } from './../../domain/job-detail.aggregate';

@Injectable()
export class InsertJobsDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobDetailRepository
    ) {}

    public async main(
        jobsDetail: {
            id: JobDetailId,
            tenantId: JobDetailTenantId,
            systemId: JobDetailSystemId,
            systemName: JobDetailSystemName,
            executionId: JobDetailExecutionId,
            executionType: JobDetailExecutionType,
            executionExecutedAt: JobDetailExecutionExecutedAt,
            executionMonitoringStartAt: JobDetailExecutionMonitoringStartAt,
            executionMonitoringEndAt: JobDetailExecutionMonitoringEndAt,
            status: JobDetailStatus,
            name: JobDetailName,
            returnCode: JobDetailReturnCode,
            node: JobDetailNode,
            user: JobDetailUser,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateJobsDetail = jobsDetail.map(jobDetail => BplusItSappiJobDetail.register(
            jobDetail.id,
            jobDetail.tenantId,
            jobDetail.systemId,
            jobDetail.systemName,
            jobDetail.executionId,
            jobDetail.executionType,
            jobDetail.executionExecutedAt,
            jobDetail.executionMonitoringStartAt,
            jobDetail.executionMonitoringEndAt,
            jobDetail.status,
            jobDetail.name,
            jobDetail.returnCode,
            jobDetail.node,
            jobDetail.user,
            new JobDetailCreatedAt(Utils.nowTimestamp()),
            new JobDetailUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateJobsDetail);

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const jobsDetailRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id) // there may be cases where the database object is direct to the command, for example in the update, only one field can be updated
        // );
        // 
        // jobsDetailRegistered.created(jobsDetail); // apply event to model events
        // jobsDetailRegistered.commit(); // commit all events of model
    }
}