import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { BplusItSappiChannelOverview } from './../../domain/channel-overview.entity';
import { BplusItSappiChannelOverviewModel } from './sequelize-channel-overview.model';
import { SequelizeChannelOverviewMapper } from './sequelize-channel-overview.mapper';

@Injectable()
export class SequelizeChannelOverviewRepository extends SequelizeRepository<BplusItSappiChannelOverview> implements IChannelOverviewRepository
{
    public readonly entityName: string = 'BplusItSappiChannelOverview';
    public readonly mapper: SequelizeChannelOverviewMapper = new SequelizeChannelOverviewMapper();

    constructor(
        @InjectModel(BplusItSappiChannelOverviewModel)
        public readonly repository: typeof BplusItSappiChannelOverviewModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}