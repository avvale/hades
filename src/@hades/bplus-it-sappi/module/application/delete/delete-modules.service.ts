import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IModuleRepository } from './../../domain/module.repository';
import { AddModulesContextEvent } from './../events/add-modules-context.event';

@Injectable()
export class DeleteModulesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IModuleRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const modules = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);

        // create AddModulesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const modulesRegistered = this.publisher.mergeObjectContext(new AddModulesContextEvent(modules));

        modulesRegistered.deleted(); // apply event to model events
        modulesRegistered.commit(); // commit all events of modelx
    }
}