import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { LangId } from './../../domain/value-objects';
import { ILangRepository } from './../../domain/lang.repository';

@Injectable()
export class DeleteLangService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ILangRepository
    ) {}

    public async main(id: LangId): Promise<void>
    {        
        // get object to delete
        const lang = await this.repository.findById(id);

        await this.repository.delete(id);        
            
        // insert EventBus in object, to be able to apply and commit events
        const langRegister = this.publisher.mergeObjectContext(lang);
        
        langRegister.deleted(lang); // apply event to model events
        langRegister.commit(); // commit all events of model
    }
}