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
    JobDetailDetail, 
    JobDetailExample, 
    JobDetailCreatedAt, 
    JobDetailUpdatedAt, 
    JobDetailDeletedAt
    
} from './../../domain/value-objects';
import { IJobDetailRepository } from '../../domain/job-detail.repository';
import { BplusItSappiJobDetail } from './../../domain/job-detail.entity';

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
            detail: JobDetailDetail,
            example: JobDetailExample,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const entityJobsDetail = jobsDetail.map(jobDetail => BplusItSappiJobDetail.register(
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
            jobDetail.detail,
            jobDetail.example,
            new JobDetailCreatedAt(Utils.nowTimestamp()),
            new JobDetailUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(entityJobsDetail);

        // TODO a falta de definir eventos
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        // const jobsDetailRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id)
        // );
        // 
        // jobsDetailRegistered.created(jobsDetail); // apply event to model events
        // jobsDetailRegistered.commit(); // commit all events of model
    }
}