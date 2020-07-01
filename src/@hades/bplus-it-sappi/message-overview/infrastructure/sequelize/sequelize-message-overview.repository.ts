import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { BplusItSappiMessageOverview } from './../../domain/message-overview.entity';
import { BplusItSappiMessageOverviewModel } from './sequelize-message-overview.model';
import { SequelizeMessageOverviewMapper } from './sequelize-message-overview.mapper';

@Injectable()
export class SequelizeMessageOverviewRepository extends SequelizeRepository<BplusItSappiMessageOverview> implements IMessageOverviewRepository
{
    public readonly entityName: string = 'BplusItSappiMessageOverview';
    public readonly mapper: SequelizeMessageOverviewMapper = new SequelizeMessageOverviewMapper();

    constructor(
        @InjectModel(BplusItSappiMessageOverviewModel)
        public readonly repository: typeof BplusItSappiMessageOverviewModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}