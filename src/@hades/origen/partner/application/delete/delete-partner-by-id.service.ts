import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { PartnerId } from './../../domain/value-objects';
import { IPartnerRepository } from './../../domain/partner.repository';

@Injectable()
export class DeletePartnerByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPartnerRepository,
    ) {}

    public async main(id: PartnerId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const partner = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const partnerRegister = this.publisher.mergeObjectContext(partner);

        partnerRegister.deleted(partner); // apply event to model events
        partnerRegister.commit(); // commit all events of model
    }
}