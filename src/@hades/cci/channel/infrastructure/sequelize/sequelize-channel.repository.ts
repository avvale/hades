import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IChannelRepository } from './../../domain/channel.repository';
import { CciChannel } from './../../domain/channel.aggregate';
import { ChannelMapper } from './../../domain/channel.mapper';
import { CciChannelModel } from './sequelize-channel.model';

@Injectable()
export class SequelizeChannelRepository extends SequelizeRepository<CciChannel, CciChannelModel> implements IChannelRepository
{
    public readonly aggregateName: string = 'CciChannel';
    public readonly mapper: ChannelMapper = new ChannelMapper();

    constructor(
        @InjectModel(CciChannelModel)
        public readonly repository: typeof CciChannelModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}