import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { CciJobOverview } from './../../domain/job-overview.aggregate';
import { JobOverviewMapper } from './../../domain/job-overview.mapper';
import { CciJobOverviewModel } from './sequelize-job-overview.model';

import * as _ from 'lodash';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class SequelizeJobOverviewRepository extends SequelizeRepository<CciJobOverview, CciJobOverviewModel> implements IJobOverviewRepository 
{
    public readonly aggregateName: string = 'CciJobOverview';
    public readonly mapper: JobOverviewMapper = new JobOverviewMapper();

    constructor(
        @InjectModel(CciJobOverviewModel)
        public readonly repository: typeof CciJobOverviewModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    async getDashboardData(query?: QueryStatement): Promise<CciJobOverview[]> 
    {
        const models = await this.repository.findAll(
            _.merge(this.criteria.implements(query), {
                attributes: [
                    [Sequelize.fn('max', Sequelize.col('created_at')), 'max'],
                    [Sequelize.fn('any_value', Sequelize.col('cancelled')), 'cancelled'],
                    [Sequelize.fn('any_value', Sequelize.col('completed')), 'completed'],
                    [Sequelize.fn('any_value', Sequelize.col('error')), 'error'],
                    'tenantId', 'systemId'
                ],
                group: ['tenantId', 'systemId'],
            })
        );

        // map values to create value objects
        return <CciJobOverview[]>this.mapper.mapModelsToAggregates(models);
    }
}