import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ITagRepository } from './../../domain/tag.repository';
import { AddTagsContextEvent } from './../events/add-tags-context.event';

@Injectable()
export class DeleteTagsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ITagRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const tags = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);

        // create AddTagsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const tagsRegistered = this.publisher.mergeObjectContext(new AddTagsContextEvent(tags));

        tagsRegistered.deleted(); // apply event to model events
        tagsRegistered.commit(); // commit all events of modelx
    }
}