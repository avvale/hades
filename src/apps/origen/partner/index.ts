// controllers
import { OrigenCreatePartnerController } from './controllers/origen-create-partner.controller';
import { OrigenCreatePartnersController } from './controllers/origen-create-partners.controller';
import { OrigenPaginatePartnersController } from './controllers/origen-paginate-partners.controller';
import { OrigenGetPartnersController } from './controllers/origen-get-partners.controller';
import { OrigenFindPartnerByIdController } from './controllers/origen-find-partner-by-id.controller';
import { OrigenFindPartnerController } from './controllers/origen-find-partner.controller';
import { OrigenUpdatePartnerController } from './controllers/origen-update-partner.controller';
import { OrigenDeletePartnerByIdController } from './controllers/origen-delete-partner-by-id.controller';
import { OrigenDeletePartnersController } from './controllers/origen-delete-partners.controller';

// resolvers
import { OrigenCreatePartnerResolver } from './resolvers/origen-create-partner.resolver';
import { OrigenCreatePartnersResolver } from './resolvers/origen-create-partners.resolver';
import { OrigenPaginatePartnersResolver } from './resolvers/origen-paginate-partners.resolver';
import { OrigenGetPartnersResolver } from './resolvers/origen-get-partners.resolver';
import { OrigenFindPartnerResolver } from './resolvers/origen-find-partner.resolver';
import { OrigenFindPartnerByIdResolver } from './resolvers/origen-find-partner-by-id.resolver';
import { OrigenUpdatePartnerResolver } from './resolvers/origen-update-partner.resolver';
import { OrigenDeletePartnerByIdResolver } from './resolvers/origen-delete-partner-by-id.resolver';
import { OrigenDeletePartnersResolver } from './resolvers/origen-delete-partners.resolver';

export const OrigenPartnerControllers = [
    OrigenCreatePartnerController,
    OrigenCreatePartnersController,
    OrigenPaginatePartnersController,
    OrigenGetPartnersController,
    OrigenFindPartnerByIdController,
    OrigenFindPartnerController,
    OrigenUpdatePartnerController,
    OrigenDeletePartnerByIdController,
    OrigenDeletePartnersController,
];

export const OrigenPartnerResolvers = [
    OrigenCreatePartnerResolver,
    OrigenCreatePartnersResolver,
    OrigenPaginatePartnersResolver,
    OrigenGetPartnersResolver,
    OrigenFindPartnerResolver,
    OrigenFindPartnerByIdResolver,
    OrigenUpdatePartnerResolver,
    OrigenDeletePartnerByIdResolver,
    OrigenDeletePartnersResolver,
];