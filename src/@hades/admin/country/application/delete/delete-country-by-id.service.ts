import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { CountryId } from './../../domain/value-objects';
import { ICountryRepository } from './../../domain/country.repository';

@Injectable()
export class DeleteCountryByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ICountryRepository,
    ) {}

    public async main(id: CountryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const country = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const countryRegister = this.publisher.mergeObjectContext(country);

        countryRegister.deleted(country); // apply event to model events
        countryRegister.commit(); // commit all events of model
    }
}