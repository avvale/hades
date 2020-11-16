import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { ICountryRepository } from './../../domain/country.repository';
import { AddCountriesContextEvent } from './../events/add-countries-context.event';

@Injectable()
export class DeleteCountriesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ICountryRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const countries = await this.repository.get(queryStatement, constraint, cQMetadata);

        await this.repository.delete(queryStatement, constraint, cQMetadata);

        // create AddCountriesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const countriesRegistered = this.publisher.mergeObjectContext(new AddCountriesContextEvent(countries));

        countriesRegistered.deleted(); // apply event to model events
        countriesRegistered.commit(); // commit all events of model
    }
}