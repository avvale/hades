import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IModuleRepository } from './../../domain/module.repository';
import { AddModulesContextEvent } from './../events/add-modules-context.event';

@Injectable()
export class DeleteModulesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IModuleRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const modules = await this.repository.get(queryStatement, constraint, cQMetadata);

        await this.repository.delete(queryStatement, constraint, cQMetadata);

        // create AddModulesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const modulesRegistered = this.publisher.mergeObjectContext(new AddModulesContextEvent(modules));

        modulesRegistered.deleted(); // apply event to model events
        modulesRegistered.commit(); // commit all events of model
    }
}