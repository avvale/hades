import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { BplusItSappiMessageDetail } from './../../domain/message-detail.aggregate';
import { MessageDetailMapper } from './../../domain/message-detail.mapper';
import { BplusItSappiMessageDetailModel } from './sequelize-message-detail.model';

@Injectable()
export class SequelizeMessageDetailRepository extends SequelizeRepository<BplusItSappiMessageDetail> implements IMessageDetailRepository
{
    public readonly aggregateName: string = 'BplusItSappiMessageDetail';
    public readonly mapper: MessageDetailMapper = new MessageDetailMapper();

    constructor(
        @InjectModel(BplusItSappiMessageDetailModel)
        public readonly repository: typeof BplusItSappiMessageDetailModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}