import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import {
    AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel1CountryId,
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
export class UpdateAdministrativeAreaLevel1Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAdministrativeAreaLevel1Repository,
    ) {}

    public async main(
        payload: {
            id: AdministrativeAreaLevel1Id,
            countryId?: AdministrativeAreaLevel1CountryId,
            code?: AdministrativeAreaLevel1Code,
            customCode?: AdministrativeAreaLevel1CustomCode,
            name?: AdministrativeAreaLevel1Name,
            slug?: AdministrativeAreaLevel1Slug,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const administrativeAreaLevel1 = AdminAdministrativeAreaLevel1.register(
            payload.id,
            payload.countryId,
            payload.code,
            payload.customCode,
            payload.name,
            payload.slug,
            null,
            new AdministrativeAreaLevel1UpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(administrativeAreaLevel1, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const administrativeAreaLevel1Register = this.publisher.mergeObjectContext(
            administrativeAreaLevel1
        );

        administrativeAreaLevel1Register.updated(administrativeAreaLevel1); // apply event to model events
        administrativeAreaLevel1Register.commit(); // commit all events of model
    }
}