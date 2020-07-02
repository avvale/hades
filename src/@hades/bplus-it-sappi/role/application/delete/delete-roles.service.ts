import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IRoleRepository } from './../../domain/role.repository';

@Injectable()
export class DeleteRolesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRoleRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const roles = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);        

        // TODO a falta de definir eventos
        // insert EventBus in object, to be able to apply and commit events
        // const rolesRegistered = this.publisher.mergeObjectContext(roles);
        
        // rolesRegistered.deleted(roles); // apply event to model events
        // rolesRegistered.commit(); // commit all events of model
    }
}