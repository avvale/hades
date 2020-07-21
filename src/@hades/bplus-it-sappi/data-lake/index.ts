// commands
import { CreateDataLakeCommandHandler } from './application/create/create-data-lake.command-handler';
import { CreateDataLakesCommandHandler } from './application/create/create-data-lakes.command-handler';
import { UpdateDataLakeCommandHandler } from './application/update/update-data-lake.command-handler';
import { DeleteDataLakeByIdCommandHandler } from './application/delete/delete-data-lake-by-id.command-handler';
import { DeleteDataLakesCommandHandler } from './application/delete/delete-data-lakes.command-handler';

// queries
import { PaginateDataLakesQueryHandler } from './application/paginate/paginate-data-lakes.query-handler';
import { GetDataLakesQueryHandler } from './application/get/get-data-lakes.query-handler';
import { FindDataLakeQueryHandler } from './application/find/find-data-lake.query-handler';
import { FindDataLakeByIdQueryHandler } from './application/find/find-data-lake-by-id.query-handler';

// events
import { CreatedDataLakeEventHandler } from './application/events/created-data-lake.event-handler';
import { CreatedDataLakesEventHandler } from './application/events/created-data-lakes.event-handler';
import { UpdatedDataLakeEventHandler } from './application/events/updated-data-lake.event-handler';
import { DeletedDataLakeEventHandler } from './application/events/deleted-data-lake.event-handler';
import { DeletedDataLakesEventHandler } from './application/events/deleted-data-lakes.event-handler';

// services
import { CreateDataLakeService } from './application/create/create-data-lake.service';
import { CreateDataLakesService } from './application/create/create-data-lakes.service';
import { PaginateDataLakesService } from './application/paginate/paginate-data-lakes.service';
import { GetDataLakesService } from './application/get/get-data-lakes.service';
import { FindDataLakeService } from './application/find/find-data-lake.service';
import { FindDataLakeByIdService } from './application/find/find-data-lake-by-id.service';
import { UpdateDataLakeService } from './application/update/update-data-lake.service';
import { DeleteDataLakeByIdService } from './application/delete/delete-data-lake-by-id.service';
import { DeleteDataLakesService } from './application/delete/delete-data-lakes.service';

// models
export { BplusItSappiDataLakeModel } from './infrastructure/sequelize/sequelize-data-lake.model';


// repository
export { IDataLakeRepository } from './domain/data-lake.repository';
export { SequelizeDataLakeRepository } from './infrastructure/sequelize/sequelize-data-lake.repository';

// sagas
export { DataLakeSagas } from './application/sagas/data-lake.sagas';

export const BplusItSappiDataLakeHandlers = [
    // commands
    CreateDataLakeCommandHandler,
    CreateDataLakesCommandHandler,
    UpdateDataLakeCommandHandler,
    DeleteDataLakeByIdCommandHandler,
    DeleteDataLakesCommandHandler,

    // queries
    PaginateDataLakesQueryHandler,
    GetDataLakesQueryHandler,
    FindDataLakeQueryHandler,
    FindDataLakeByIdQueryHandler,

    // events
    CreatedDataLakeEventHandler,
    CreatedDataLakesEventHandler,
    UpdatedDataLakeEventHandler,
    DeletedDataLakeEventHandler,
    DeletedDataLakesEventHandler,
];

export const BplusItSappiDataLakeServices = [
    CreateDataLakeService,
    CreateDataLakesService,
    PaginateDataLakesService,
    GetDataLakesService,
    FindDataLakeService,
    FindDataLakeByIdService,
    UpdateDataLakeService,
    DeleteDataLakeByIdService,
    DeleteDataLakesService,
];