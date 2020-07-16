import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IModuleRepository } from './../../domain/module.repository';

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

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const modulesRegistered = this.publisher.mergeObjectContext(modules);
        
        // modulesRegistered.deleted(modules); // apply event to model events
        // modulesRegistered.commit(); // commit all events of model
    }
}