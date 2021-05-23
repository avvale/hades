import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { CciChannelDetail } from './../../domain/channel-detail.aggregate';
import { ChannelDetailMapper } from './../../domain/channel-detail.mapper';
import { CciChannelDetailModel } from './sequelize-channel-detail.model';

@Injectable()
export class SequelizeChannelDetailRepository extends SequelizeRepository<CciChannelDetail, CciChannelDetailModel> implements IChannelDetailRepository
{
    public readonly aggregateName: string = 'CciChannelDetail';
    public readonly mapper: ChannelDetailMapper = new ChannelDetailMapper();

    constructor(
        @InjectModel(CciChannelDetailModel)
        public readonly repository: typeof CciChannelDetailModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}