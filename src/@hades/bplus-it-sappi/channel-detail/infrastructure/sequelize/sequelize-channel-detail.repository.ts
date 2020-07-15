import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { BplusItSappiChannelDetail } from './../../domain/channel-detail.aggregate';
import { ChannelDetailMapper } from './../../domain/channel-detail.mapper';
import { BplusItSappiChannelDetailModel } from './sequelize-channel-detail.model';

@Injectable()
export class SequelizeChannelDetailRepository extends SequelizeRepository<BplusItSappiChannelDetail> implements IChannelDetailRepository
{
    public readonly aggregateName: string = 'BplusItSappiChannelDetail';
    public readonly mapper: ChannelDetailMapper = new ChannelDetailMapper();

    constructor(
        @InjectModel(BplusItSappiChannelDetailModel)
        public readonly repository: typeof BplusItSappiChannelDetailModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}