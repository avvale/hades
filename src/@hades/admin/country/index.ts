// commands
import { CreateCountryCommandHandler } from './application/create/create-country.command-handler';
import { CreateCountriesCommandHandler } from './application/create/create-countries.command-handler';
import { UpdateCountryCommandHandler } from './application/update/update-country.command-handler';
import { DeleteCountryByIdCommandHandler } from './application/delete/delete-country-by-id.command-handler';
import { DeleteCountriesCommandHandler } from './application/delete/delete-countries.command-handler';

// queries
import { PaginateCountriesQueryHandler } from './application/paginate/paginate-countries.query-handler';
import { GetCountriesQueryHandler } from './application/get/get-countries.query-handler';
import { FindCountryQueryHandler } from './application/find/find-country.query-handler';
import { FindCountryByIdQueryHandler } from './application/find/find-country-by-id.query-handler';

// events
import { CreatedCountryEventHandler } from './application/events/created-country.event-handler';
import { CreatedCountriesEventHandler } from './application/events/created-countries.event-handler';
import { UpdatedCountryEventHandler } from './application/events/updated-country.event-handler';
import { DeletedCountryEventHandler } from './application/events/deleted-country.event-handler';
import { DeletedCountriesEventHandler } from './application/events/deleted-countries.event-handler';

// services
import { CreateCountryService } from './application/create/create-country.service';
import { CreateCountriesService } from './application/create/create-countries.service';
import { PaginateCountriesService } from './application/paginate/paginate-countries.service';
import { GetCountriesService } from './application/get/get-countries.service';
import { FindCountryService } from './application/find/find-country.service';
import { FindCountryByIdService } from './application/find/find-country-by-id.service';
import { UpdateCountryService } from './application/update/update-country.service';
import { DeleteCountryByIdService } from './application/delete/delete-country-by-id.service';
import { DeleteCountriesService } from './application/delete/delete-countries.service';

// models
export { AdminCountryModel } from './infrastructure/sequelize/sequelize-country.model';
export { AdminCountryI18nModel } from './infrastructure/sequelize/sequelize-country-i18n.model';

// repository
export { ICountryRepository } from './domain/country.repository';
export { SequelizeCountryRepository } from './infrastructure/sequelize/sequelize-country.repository';

// sagas
export { CountrySagas } from './application/sagas/country.sagas';

export const AdminCountryHandlers = [
    // commands
    CreateCountryCommandHandler,
    CreateCountriesCommandHandler,
    UpdateCountryCommandHandler,
    DeleteCountryByIdCommandHandler,
    DeleteCountriesCommandHandler,

    // queries
    PaginateCountriesQueryHandler,
    GetCountriesQueryHandler,
    FindCountryQueryHandler,
    FindCountryByIdQueryHandler,

    // events
    CreatedCountryEventHandler,
    CreatedCountriesEventHandler,
    UpdatedCountryEventHandler,
    DeletedCountryEventHandler,
    DeletedCountriesEventHandler,
];

export const AdminCountryServices = [
    CreateCountryService,
    CreateCountriesService,
    PaginateCountriesService,
    GetCountriesService,
    FindCountryService,
    FindCountryByIdService,
    UpdateCountryService,
    DeleteCountryByIdService,
    DeleteCountriesService,
];