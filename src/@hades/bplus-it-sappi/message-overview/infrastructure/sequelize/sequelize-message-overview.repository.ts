import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { BplusItSappiMessageOverview } from './../../domain/message-overview.aggregate';
import { MessageOverviewMapper } from './../../domain/message-overview.mapper';
import { BplusItSappiMessageOverviewModel } from './sequelize-message-overview.model';

@Injectable()
export class SequelizeMessageOverviewRepository extends SequelizeRepository<BplusItSappiMessageOverview> implements IMessageOverviewRepository
{
    public readonly aggregateName: string = 'BplusItSappiMessageOverview';
    public readonly mapper: MessageOverviewMapper = new MessageOverviewMapper();

    constructor(
        @InjectModel(BplusItSappiMessageOverviewModel)
        public readonly repository: typeof BplusItSappiMessageOverviewModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}