import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel1CountryCommonId,
    AdministrativeAreaLevel1Code,
    AdministrativeAreaLevel1CustomCode,
    AdministrativeAreaLevel1Name,
    AdministrativeAreaLevel1Slug,
    AdministrativeAreaLevel1Latitude,
    AdministrativeAreaLevel1Longitude,
    AdministrativeAreaLevel1Zoom,
    AdministrativeAreaLevel1CreatedAt,
    AdministrativeAreaLevel1UpdatedAt,
    AdministrativeAreaLevel1DeletedAt,
} from './../../domain/value-objects';
import { IAdministrativeAreaLevel1Repository } from './../../domain/administrative-area-level-1.repository';
import { AdminAdministrativeAreaLevel1 } from './../../domain/administrative-area-level-1.aggregate';
import { AddAdministrativeAreasLevel1ContextEvent } from './../events/add-administrative-areas-level-1-context.event';

@Injectable()
export class CreateAdministrativeAreasLevel1Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAdministrativeAreaLevel1Repository,
    ) {}

    public async main(
        administrativeAreasLevel1: {
            id: AdministrativeAreaLevel1Id,
            countryCommonId: AdministrativeAreaLevel1CountryCommonId,
            code: AdministrativeAreaLevel1Code,
            customCode: AdministrativeAreaLevel1CustomCode,
            name: AdministrativeAreaLevel1Name,
            slug: AdministrativeAreaLevel1Slug,
            latitude: AdministrativeAreaLevel1Latitude,
            longitude: AdministrativeAreaLevel1Longitude,
            zoom: AdministrativeAreaLevel1Zoom,
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAdministrativeAreasLevel1 = administrativeAreasLevel1.map(administrativeAreaLevel1 => AdminAdministrativeAreaLevel1.register(
            administrativeAreaLevel1.id,
            administrativeAreaLevel1.countryCommonId,
            administrativeAreaLevel1.code,
            administrativeAreaLevel1.customCode,
            administrativeAreaLevel1.name,
            administrativeAreaLevel1.slug,
            administrativeAreaLevel1.latitude,
            administrativeAreaLevel1.longitude,
            administrativeAreaLevel1.zoom,
            new AdministrativeAreaLevel1CreatedAt({currentTimestamp: true}),
            new AdministrativeAreaLevel1UpdatedAt({currentTimestamp: true}),
            null
        ));

        // insert
        await this.repository.insert(aggregateAdministrativeAreasLevel1);

        // create AddAdministrativeAreasLevel1ContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const administrativeAreasLevel1Registered = this.publisher.mergeObjectContext(new AddAdministrativeAreasLevel1ContextEvent(aggregateAdministrativeAreasLevel1));

        administrativeAreasLevel1Registered.created(); // apply event to model events
        administrativeAreasLevel1Registered.commit(); // commit all events of model
    }
}