import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { CciMessageOverview } from './../../domain/message-overview.aggregate';
import { MessageOverviewMapper } from './../../domain/message-overview.mapper';
import { CciMessageOverviewModel } from './sequelize-message-overview.model';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Sequelize } from 'sequelize-typescript';
import * as _ from 'lodash';

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
    
    async getDashboardData(query?: QueryStatement): Promise<CciMessageOverview[]> 
    {
        const models = await this.repository.findAll(
            _.merge(this.criteria.implements(query), {
                attributes: [
                    [Sequelize.fn('max', Sequelize.col('created_at')), 'max'], 
                    'id', 'tenantId', 'tenantCode', 'systemId', 'systemName', 'executionId', 'executionType', 'executionExecutedAt', 'executionMonitoringStartAt', 'executionMonitoringEndAt', 'numberMax', 'numberDays', 'success', 'cancelled', 'delivering', 'error', 'holding', 'toBeDelivered', 'waiting', 'createdAt'
                ],
                group: ['id', 'tenantId', 'tenantCode', 'systemId', 'systemName', 'executionId', 'executionType', 'executionExecutedAt', 'executionMonitoringStartAt', 'executionMonitoringEndAt', 'numberMax', 'numberDays', 'success', 'cancelled', 'delivering', 'error', 'holding', 'toBeDelivered', 'waiting', 'createdAt'],
            })
        );

        // map values to create value objects
        return <CciMessageOverview[]>this.mapper.mapModelsToAggregates(models);
    }
}