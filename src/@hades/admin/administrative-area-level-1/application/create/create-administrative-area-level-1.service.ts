import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel1CountryCommonId,
    AdministrativeAreaLevel1Code,
    AdministrativeAreaLevel1CustomCode,
    AdministrativeAreaLevel1Name,
    AdministrativeAreaLevel1Slug,
    AdministrativeAreaLevel1CreatedAt,
    AdministrativeAreaLevel1UpdatedAt,
    AdministrativeAreaLevel1DeletedAt,
} from './../../domain/value-objects';
import { IAdministrativeAreaLevel1Repository } from './../../domain/administrative-area-level-1.repository';
import { AdminAdministrativeAreaLevel1 } from './../../domain/administrative-area-level-1.aggregate';

@Injectable()
export class CreateAdministrativeAreaLevel1Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAdministrativeAreaLevel1Repository,
    ) {}

    public async main(
        payload: {
            id: AdministrativeAreaLevel1Id,
            countryCommonId: AdministrativeAreaLevel1CountryCommonId,
            code: AdministrativeAreaLevel1Code,
            customCode: AdministrativeAreaLevel1CustomCode,
            name: AdministrativeAreaLevel1Name,
            slug: AdministrativeAreaLevel1Slug,
        }
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const administrativeAreaLevel1 = AdminAdministrativeAreaLevel1.register(
            payload.id,
            payload.countryCommonId,
            payload.code,
            payload.customCode,
            payload.name,
            payload.slug,
            new AdministrativeAreaLevel1CreatedAt({currentTimestamp: true}),
            new AdministrativeAreaLevel1UpdatedAt({currentTimestamp: true}),
            null
        );

        // create
        await this.repository.create(administrativeAreaLevel1);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const administrativeAreaLevel1Register = this.publisher.mergeObjectContext(
            administrativeAreaLevel1
        );

        administrativeAreaLevel1Register.created(administrativeAreaLevel1); // apply event to model events
        administrativeAreaLevel1Register.commit(); // commit all events of model
    }
}