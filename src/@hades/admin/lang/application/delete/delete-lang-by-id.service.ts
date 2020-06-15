import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { LangId } from './../../domain/value-objects';
import { ILangRepository } from './../../domain/lang.repository';

@Injectable()
export class DeleteLangByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ILangRepository
    ) {}

    public async main(id: LangId): Promise<void>
    {        
        // get object to delete
        const lang = await this.repository.findById(id);

        await this.repository.deleteById(id);        
            
        // insert EventBus in object, to be able to apply and commit events
        const langRegistered = this.publisher.mergeObjectContext(lang);
        
        langRegistered.deleted(lang); // apply event to model events
        langRegistered.commit(); // commit all events of model
    }
}