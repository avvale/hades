import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize/types';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { CciMessageOverview } from './../../domain/message-overview.aggregate';
import { MessageOverviewMapper } from './../../domain/message-overview.mapper';
import { CciMessageOverviewModel } from './sequelize-message-overview.model';

@Injectable()
export class SequelizeMessageOverviewRepository extends SequelizeRepository<CciMessageOverview, CciMessageOverviewModel> implements IMessageOverviewRepository
{
    public readonly aggregateName: string = 'CciMessageOverview';
    public readonly mapper: MessageOverviewMapper = new MessageOverviewMapper();

    constructor(
        @InjectModel(CciMessageOverviewModel)
        public readonly repository: typeof CciMessageOverviewModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }
    
}