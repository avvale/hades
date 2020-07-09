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
export class InsertSummariesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISummaryRepository
    ) {}

    public async main(
        summaries: {
            id: SummaryId,
            tagId: SummaryTagId,
            tenantId: SummaryTenantId,
            accessAt: SummaryAccessAt,
            counter: SummaryCounter,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateSummaries = summaries.map(summary => NfcSummary.register(
            summary.id,
            summary.tagId,
            summary.tenantId,
            summary.accessAt,
            summary.counter,
            new SummaryCreatedAt(Utils.nowTimestamp()),
            new SummaryUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateSummaries);

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const summariesRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id) // there may be cases where the database object is direct to the command, for example in the update, only one field can be updated
        // );
        // 
        // summariesRegistered.created(summaries); // apply event to model events
        // summariesRegistered.commit(); // commit all events of model
    }
}