import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { CciChannelOverview } from './../../domain/channel-overview.aggregate';
import { ChannelOverviewMapper } from './../../domain/channel-overview.mapper';
import { CciChannelOverviewModel } from './sequelize-channel-overview.model';
import { Sequelize } from 'sequelize-typescript';
import * as _ from 'lodash';

@Injectable()
export class SequelizeChannelOverviewRepository extends SequelizeRepository<CciChannelOverview, CciChannelOverviewModel> implements IChannelOverviewRepository
{
    public readonly aggregateName: string = 'CciChannelOverview';
    public readonly mapper: ChannelOverviewMapper = new ChannelOverviewMapper();

    constructor(
        @InjectModel(CciChannelOverviewModel)
        public readonly repository: typeof CciChannelOverviewModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }
    
    async getDashboardData(query?: QueryStatement): Promise<CciChannelOverview[]> 
    {
        const models = await this.repository.findAll(
            _.merge(this.criteria.implements(query), {
                attributes: [
                    [Sequelize.fn('max', Sequelize.col('created_at')), 'max'], 
                    'id', 'tenantId', 'tenantCode', 'systemId', 'systemName', 'executionId', 'executionType', 'executionExecutedAt', 'executionMonitoringStartAt', 'executionMonitoringEndAt', 'error', 'inactive', 'successful', 'stopped', 'unknown', 'unregistered', 'createdAt'
                ],
                group: ['id', 'tenantId', 'tenantCode', 'systemId', 'systemName', 'executionId', 'executionType', 'executionExecutedAt', 'executionMonitoringStartAt', 'executionMonitoringEndAt', 'error', 'inactive', 'successful', 'stopped', 'unknown', 'unregistered', 'createdAt'],
            })
        );

        // map values to create value objects
        return <CciChannelOverview[]>this.mapper.mapModelsToAggregates(models);
    }
}