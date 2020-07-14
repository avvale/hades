import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IChannelRepository } from './../../domain/channel.repository';
import { BplusItSappiChannel } from './../../domain/channel.aggregate';
import { ChannelMapper } from './../../domain/channel.mapper';
import { BplusItSappiChannelModel } from './sequelize-channel.model';

@Injectable()
export class SequelizeChannelRepository extends SequelizeRepository<BplusItSappiChannel> implements IChannelRepository
{
    public readonly aggregateName: string = 'BplusItSappiChannel';
    public readonly mapper: ChannelMapper = new ChannelMapper();

    constructor(
        @InjectModel(BplusItSappiChannelModel)
        public readonly repository: typeof BplusItSappiChannelModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}