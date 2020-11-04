import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { CciMessageDetail } from './../../domain/message-detail.aggregate';
import { MessageDetailMapper } from './../../domain/message-detail.mapper';
import { CciMessageDetailModel } from './sequelize-message-detail.model';

@Injectable()
export class SequelizeMessageDetailRepository extends SequelizeRepository<CciMessageDetail, CciMessageDetailModel> implements IMessageDetailRepository
{
    public readonly aggregateName: string = 'CciMessageDetail';
    public readonly mapper: MessageDetailMapper = new MessageDetailMapper();
    public readonly timezoneColumns: string[] = ['executionExecutedAt','executionMonitoringStartAt','executionMonitoringEndAt','startTimeAt','createdAt','updatedAt','deletedAt'];

    constructor(
        @InjectModel(CciMessageDetailModel)
        public readonly repository: typeof CciMessageDetailModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}