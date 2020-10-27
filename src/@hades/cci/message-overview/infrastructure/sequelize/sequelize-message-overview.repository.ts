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
                    [Sequelize.fn('any_value', Sequelize.col('id')), 'id'],
                    [Sequelize.fn('any_value', Sequelize.col('tenant_code')), 'tenantCode'],
                    [Sequelize.fn('any_value', Sequelize.col('system_name')), 'systemName'],
                    [Sequelize.fn('any_value', Sequelize.col('execution_id')), 'executionId'],
                    [Sequelize.fn('any_value', Sequelize.col('execution_type')), 'executionType'],
                    [Sequelize.fn('max', Sequelize.col('execution_executed_at')), 'executionExecutedAt'],
                    [Sequelize.fn('any_value', Sequelize.col('execution_monitoring_start_at')), 'executionMonitoringStartAt'],
                    [Sequelize.fn('any_value', Sequelize.col('execution_monitoring_end_at')), 'executionMonitoringEndAt'],
                    [Sequelize.fn('any_value', Sequelize.col('number_max')), 'numberMax'],
                    [Sequelize.fn('any_value', Sequelize.col('number_days')), 'numberDays'],
                    [Sequelize.fn('any_value', Sequelize.col('success')), 'success'],
                    [Sequelize.fn('any_value', Sequelize.col('cancelled')), 'cancelled'],
                    [Sequelize.fn('any_value', Sequelize.col('delivering')), 'delivering'],
                    [Sequelize.fn('any_value', Sequelize.col('error')), 'error'],
                    [Sequelize.fn('any_value', Sequelize.col('holding')), 'holding'],
                    [Sequelize.fn('any_value', Sequelize.col('to_be_delivered')), 'toBeDelivered'],
                    [Sequelize.fn('any_value', Sequelize.col('waiting')), 'waiting'],
                    'tenantId', 'systemId'
                ],
                group: ['tenantId', 'systemId'],
            })
        );

        // map values to create value objects
        return <CciMessageOverview[]>this.mapper.mapModelsToAggregates(models);
    }
}