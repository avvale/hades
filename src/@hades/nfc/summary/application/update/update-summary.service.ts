import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    SummaryId, 
    SummaryTagId, 
    SummaryTenantId, 
    SummaryAccessAt, 
    SummaryCounter, 
    SummaryCreatedAt, 
    SummaryUpdatedAt, 
    SummaryDeletedAt
    
} from './../../domain/value-objects';
import { ISummaryRepository } from './../../domain/summary.repository';
import { NfcSummary } from './../../domain/summary.aggregate';

@Injectable()
export class UpdateSummaryService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISummaryRepository
    ) {}

    public async main(
        id: SummaryId,
        tagId?: SummaryTagId,
        tenantId?: SummaryTenantId,
        accessAt?: SummaryAccessAt,
        counter?: SummaryCounter,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const summary = NfcSummary.register(
            id,
            tagId,
            tenantId,
            accessAt,
            counter,
            null,
            new SummaryUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(summary);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const summaryRegister = this.publisher.mergeObjectContext(
            summary
        );
        
        summaryRegister.updated(summary); // apply event to model events
        summaryRegister.commit(); // commit all events of model
    }
}