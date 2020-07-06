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
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { BplusItSappiJobDetail } from './../../domain/job-detail.aggregate';

@Injectable()
export class UpdateJobDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobDetailRepository
    ) {}

    public async main(
        id: JobDetailId,
        tenantId?: JobDetailTenantId,
        systemId?: JobDetailSystemId,
        systemName?: JobDetailSystemName,
        executionId?: JobDetailExecutionId,
        executionType?: JobDetailExecutionType,
        executionExecutedAt?: JobDetailExecutionExecutedAt,
        executionMonitoringStartAt?: JobDetailExecutionMonitoringStartAt,
        executionMonitoringEndAt?: JobDetailExecutionMonitoringEndAt,
        status?: JobDetailStatus,
        detail?: JobDetailDetail,
        example?: JobDetailExample,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const jobDetail = BplusItSappiJobDetail.register(
            id,
            tenantId,
            systemId,
            systemName,
            executionId,
            executionType,
            executionExecutedAt,
            executionMonitoringStartAt,
            executionMonitoringEndAt,
            status,
            detail,
            example,
            null,
            new JobDetailUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(jobDetail);        
            
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const jobDetailRegister = this.publisher.mergeObjectContext(
            await this.repository.findById(id)
        );
        
        jobDetailRegister.updated(jobDetail); // apply event to model events
        jobDetailRegister.commit(); // commit all events of model
    }
}