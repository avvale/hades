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
                    [Sequelize.fn('any_value', Sequelize.col('id')), 'id'],
                    [Sequelize.fn('any_value', Sequelize.col('tenant_code')), 'tenantCode'],
                    [Sequelize.fn('any_value', Sequelize.col('system_name')), 'systemName'],
                    [Sequelize.fn('any_value', Sequelize.col('execution_id')), 'executionId'],
                    [Sequelize.fn('any_value', Sequelize.col('execution_type')), 'executionType'],
                    [Sequelize.fn('any_value', Sequelize.col('execution_executed_at')), 'executionExecutedAt'],
                    [Sequelize.fn('any_value', Sequelize.col('execution_monitoring_start_at')), 'executionMonitoringStartAt'],
                    [Sequelize.fn('any_value', Sequelize.col('execution_monitoring_end_at')), 'executionMonitoringEndAt'],
                    [Sequelize.fn('any_value', Sequelize.col('error')), 'error'],
                    [Sequelize.fn('any_value', Sequelize.col('inactive')), 'inactive'],
                    [Sequelize.fn('any_value', Sequelize.col('successful')), 'successful'],
                    [Sequelize.fn('any_value', Sequelize.col('stopped')), 'stopped'],
                    [Sequelize.fn('any_value', Sequelize.col('unknown')), 'unknown'],
                    [Sequelize.fn('any_value', Sequelize.col('unregistered')), 'unregistered'],
                    'tenantId', 'systemId'
                ],
                group: ['tenantId', 'systemId'],
            })
        );

        // map values to create value objects
        return <CciChannelOverview[]>this.mapper.mapModelsToAggregates(models);
    }
}