import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { BplusItSappiChannelOverview } from './../../domain/channel-overview.aggregate';
import { ChannelOverviewMapper } from './../../domain/channel-overview.mapper';
import { BplusItSappiChannelOverviewModel } from './sequelize-channel-overview.model';

@Injectable()
export class SequelizeChannelOverviewRepository extends SequelizeRepository<BplusItSappiChannelOverview> implements IChannelOverviewRepository
{
    public readonly aggregateName: string = 'BplusItSappiChannelOverview';
    public readonly mapper: ChannelOverviewMapper = new ChannelOverviewMapper();

    constructor(
        @InjectModel(BplusItSappiChannelOverviewModel)
        public readonly repository: typeof BplusItSappiChannelOverviewModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}