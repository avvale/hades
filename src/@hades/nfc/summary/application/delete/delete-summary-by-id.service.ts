import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { SummaryId } from './../../domain/value-objects';
import { ISummaryRepository } from './../../domain/summary.repository';

@Injectable()
export class DeleteSummaryByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISummaryRepository
    ) {}

    public async main(id: SummaryId): Promise<void>
    {
        // get object to delete
        const summary = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const summaryRegister = this.publisher.mergeObjectContext(summary);
        
        summaryRegister.deleted(summary); // apply event to model events
        summaryRegister.commit(); // commit all events of model
    }
}