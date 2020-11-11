import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ICountryRepository } from './../../domain/country.repository';
import { AdminCountry } from './../../domain/country.aggregate';
import { CountryMapper } from './../../domain/country.mapper';
import { AdminCountryModel } from './sequelize-country.model';

@Injectable()
export class SequelizeCountryRepository extends SequelizeRepository<AdminCountry, AdminCountryModel> implements ICountryRepository
{
    public readonly aggregateName: string = 'AdminCountry';
    public readonly mapper: CountryMapper = new CountryMapper();

    constructor(
        @InjectModel(AdminCountryModel)
        public readonly repository: typeof AdminCountryModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}