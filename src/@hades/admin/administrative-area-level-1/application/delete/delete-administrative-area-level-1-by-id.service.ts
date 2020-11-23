import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { AdministrativeAreaLevel1Id } from './../../domain/value-objects';
import { IAdministrativeAreaLevel1Repository } from './../../domain/administrative-area-level-1.repository';

@Injectable()
export class DeleteAdministrativeAreaLevel1ByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAdministrativeAreaLevel1Repository,
    ) {}

    public async main(id: AdministrativeAreaLevel1Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const administrativeAreaLevel1 = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const administrativeAreaLevel1Register = this.publisher.mergeObjectContext(administrativeAreaLevel1);

        administrativeAreaLevel1Register.deleted(administrativeAreaLevel1); // apply event to model events
        administrativeAreaLevel1Register.commit(); // commit all events of model
    }
}