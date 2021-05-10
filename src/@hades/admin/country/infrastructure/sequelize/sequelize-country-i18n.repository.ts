import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ICountryRepository } from './../../domain/country.repository';
import { AdminCountry } from './../../domain/country.aggregate';
import { CountryMapper } from './../../domain/country.mapper';
import { AdminCountryI18nModel } from './sequelize-country-i18n.model';

@Injectable()
export class SequelizeCountryI18nRepository extends SequelizeRepository<AdminCountry, AdminCountryI18nModel> implements ICountryRepository
{
    public readonly aggregateName: string = 'AdminCountry';
    public readonly mapper: CountryMapper = new CountryMapper();

    constructor(
        @InjectModel(AdminCountryI18nModel)
        public readonly repository: typeof AdminCountryI18nModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}