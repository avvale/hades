import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ILangRepository } from './../../domain/lang.repository';
import { LangsEventCreator } from './../../domain/langs.event-creator';

@Injectable()
export class DeleteLangsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ILangRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const langs = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);        

        // create LangsEventCreator to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const langsRegistered = this.publisher.mergeObjectContext(new LangsEventCreator(langs));

        langsRegistered.deleted(); // apply event to model events
        langsRegistered.commit(); // commit all events of model
    }
}