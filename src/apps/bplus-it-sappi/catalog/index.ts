// controllers
import { CreateFlowCatalogController } from './controllers/create-flow-catalog.controller';
import { CreateChannelModuleCatalogController } from './controllers/create-channel-module-catalog.controller';

// resolvers

export const BplusItSappiCatalogControllers = [
    CreateFlowCatalogController,
    CreateChannelModuleCatalogController
];

export const BplusItSappiCatalogResolvers = [];