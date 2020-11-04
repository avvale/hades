import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { ModuleId } from './../../domain/value-objects';
import { IModuleRepository } from './../../domain/module.repository';

@Injectable()
export class DeleteModuleByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IModuleRepository,
    ) {}

    public async main(id: ModuleId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const module = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const moduleRegister = this.publisher.mergeObjectContext(module);

        moduleRegister.deleted(module); // apply event to model events
        moduleRegister.commit(); // commit all events of model
    }
}