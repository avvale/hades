// controllers
import { CreateDataLakeController } from './controllers/create-data-lake.controller';
import { InsertDataLakesController } from './controllers/insert-data-lakes.controller';
import { PaginateDataLakesController } from './controllers/paginate-data-lakes.controller';
import { GetDataLakesController } from './controllers/get-data-lakes.controller';
import { FindDataLakeByIdController } from './controllers/find-data-lake-by-id.controller';
import { FindDataLakeController } from './controllers/find-data-lake.controller';
import { UpdateDataLakeController } from './controllers/update-data-lake.controller';
import { DeleteDataLakeByIdController } from './controllers/delete-data-lake-by-id.controller';
import { DeleteDataLakesController } from './controllers/delete-data-lakes.controller';

// resolvers
import { CreateDataLakeResolver } from './resolvers/create-data-lake.resolver';
import { InsertDataLakesResolver } from './resolvers/insert-data-lakes.resolver';
import { PaginateDataLakesResolver } from './resolvers/paginate-data-lakes.resolver';
import { GetDataLakesResolver } from './resolvers/get-data-lakes.resolver';
import { FindDataLakeResolver } from './resolvers/find-data-lake.resolver';
import { FindDataLakeByIdResolver } from './resolvers/find-data-lake-by-id.resolver';
import { UpdateDataLakeResolver } from './resolvers/update-data-lake.resolver';
import { DeleteDataLakeByIdResolver } from './resolvers/delete-data-lake-by-id.resolver';
import { DeleteDataLakesResolver } from './resolvers/delete-data-lakes.resolver';

export const BplusItSappiDataLakeControllers = [
    CreateDataLakeController,
    InsertDataLakesController,
    PaginateDataLakesController,
    GetDataLakesController,
    FindDataLakeByIdController,
    FindDataLakeController,
    UpdateDataLakeController,
    DeleteDataLakeByIdController,
    DeleteDataLakesController,
];

export const BplusItSappiDataLakeResolvers = [
    CreateDataLakeResolver,
    InsertDataLakesResolver,
    PaginateDataLakesResolver,
    GetDataLakesResolver,
    FindDataLakeResolver,
    FindDataLakeByIdResolver,
    UpdateDataLakeResolver,
    DeleteDataLakeByIdResolver,
    DeleteDataLakesResolver,
];