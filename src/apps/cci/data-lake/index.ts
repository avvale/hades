// controllers
import { CciCreateDataLakeController } from './controllers/cci-create-data-lake.controller';
import { CciCreateDataLakesController } from './controllers/cci-create-data-lakes.controller';
import { CciPaginateDataLakesController } from './controllers/cci-paginate-data-lakes.controller';
import { CciGetDataLakesController } from './controllers/cci-get-data-lakes.controller';
import { CciFindDataLakeByIdController } from './controllers/cci-find-data-lake-by-id.controller';
import { CciFindDataLakeController } from './controllers/cci-find-data-lake.controller';
import { CciUpdateDataLakeController } from './controllers/cci-update-data-lake.controller';
import { CciDeleteDataLakeByIdController } from './controllers/cci-delete-data-lake-by-id.controller';
import { CciDeleteDataLakesController } from './controllers/cci-delete-data-lakes.controller';

// resolvers
import { CciCreateDataLakeResolver } from './resolvers/cci-create-data-lake.resolver';
import { CciCreateDataLakesResolver } from './resolvers/cci-create-data-lakes.resolver';
import { CciPaginateDataLakesResolver } from './resolvers/cci-paginate-data-lakes.resolver';
import { CciGetDataLakesResolver } from './resolvers/cci-get-data-lakes.resolver';
import { CciFindDataLakeResolver } from './resolvers/cci-find-data-lake.resolver';
import { CciFindDataLakeByIdResolver } from './resolvers/cci-find-data-lake-by-id.resolver';
import { CciUpdateDataLakeResolver } from './resolvers/cci-update-data-lake.resolver';
import { CciDeleteDataLakeByIdResolver } from './resolvers/cci-delete-data-lake-by-id.resolver';
import { CciDeleteDataLakesResolver } from './resolvers/cci-delete-data-lakes.resolver';

export const CciDataLakeControllers = [
    CciCreateDataLakeController,
    CciCreateDataLakesController,
    CciPaginateDataLakesController,
    CciGetDataLakesController,
    CciFindDataLakeByIdController,
    CciFindDataLakeController,
    CciUpdateDataLakeController,
    CciDeleteDataLakeByIdController,
    CciDeleteDataLakesController,
];

export const CciDataLakeResolvers = [
    CciCreateDataLakeResolver,
    CciCreateDataLakesResolver,
    CciPaginateDataLakesResolver,
    CciGetDataLakesResolver,
    CciFindDataLakeResolver,
    CciFindDataLakeByIdResolver,
    CciUpdateDataLakeResolver,
    CciDeleteDataLakeByIdResolver,
    CciDeleteDataLakesResolver,
];