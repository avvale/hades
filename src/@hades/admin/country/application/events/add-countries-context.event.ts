import { AggregateRoot } from '@nestjs/cqrs';
import { AdminCountry } from './../../domain/country.aggregate';
import { CreatedCountryEvent } from './created-country.event';
import { CreatedCountriesEvent } from './created-countries.event';
import { DeletedCountryEvent } from './deleted-country.event';
import { DeletedCountriesEvent } from './deleted-countries.event';

export class AddCountriesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AdminCountry[] = [],
    ) {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created()
    {
        this.apply(
            new CreatedCountriesEvent(
                this.aggregateRoots.map(country =>
                    new CreatedCountryEvent(
                        country.id.value,
                        country.commonId.value,
                        country.langId.value,
                        country.iso3166Alpha2.value,
                        country.iso3166Alpha3.value,
                        country.iso3166Numeric.value,
                        country.customCode?.value,
                        country.prefix?.value,
                        country.name.value,
                        country.slug.value,
                        country.image?.value,
                        country.sort?.value,
                        country.administrativeAreaLevel1?.value,
                        country.administrativeAreaLevel2?.value,
                        country.administrativeAreaLevel3?.value,
                        country.administrativeAreas?.value,
                        country.latitude?.value,
                        country.longitude?.value,
                        country.zoom?.value,
                        country.dataLang?.value,
                        country.createdAt?.value,
                        country.updatedAt?.value,
                        country.deletedAt?.value,
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedCountriesEvent(
                this.aggregateRoots.map(country =>
                    new DeletedCountryEvent(
                        country.id.value,
                        country.commonId.value,
                        country.langId.value,
                        country.iso3166Alpha2.value,
                        country.iso3166Alpha3.value,
                        country.iso3166Numeric.value,
                        country.customCode?.value,
                        country.prefix?.value,
                        country.name.value,
                        country.slug.value,
                        country.image?.value,
                        country.sort?.value,
                        country.administrativeAreaLevel1?.value,
                        country.administrativeAreaLevel2?.value,
                        country.administrativeAreaLevel3?.value,
                        country.administrativeAreas?.value,
                        country.latitude?.value,
                        country.longitude?.value,
                        country.zoom?.value,
                        country.dataLang?.value,
                        country.createdAt?.value,
                        country.updatedAt?.value,
                        country.deletedAt?.value,
                    )
                )
            )
        );
    }
}