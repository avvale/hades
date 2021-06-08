// ignored file
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { CciJobOverview } from './../../domain/job-overview.aggregate';
import { JobOverviewMapper } from './../../domain/job-overview.mapper';
import { CciJobOverviewModel } from './sequelize-job-overview.model';

// custom
import { QueryTypes } from 'sequelize';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import * as _ from 'lodash';

@Injectable()
export class SequelizeJobOverviewRepository extends SequelizeRepository<CciJobOverview, CciJobOverviewModel> implements IJobOverviewRepository
{
    public readonly aggregateName: string = 'CciJobOverview';
    public readonly mapper: JobOverviewMapper = new JobOverviewMapper();
    public readonly timezoneColumns: string[] = ['executionExecutedAt','executionMonitoringStartAt','executionMonitoringEndAt','createdAt','updatedAt','deletedAt'];

    constructor(
        @InjectModel(CciJobOverviewModel)
        public readonly repository: typeof CciJobOverviewModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }

    async getDashboardData(tenantIds: string[], systemIds: string[], cQMetadata?: CQMetadata): Promise<CciJobOverview[]>
    {
        const queryRaw = `
            SELECT
                \`OriginJob\`.\`id\`,
                \`OriginJob\`.\`tenantId\`,
                \`OriginJob\`.\`tenantCode\`,
                \`OriginJob\`.\`systemId\`,
                \`OriginJob\`.\`systemName\`,
                \`OriginJob\`.\`executionId\`,
                \`OriginJob\`.\`executionType\`,
                \`OriginJob\`.\`executionExecutedAt\`,
                \`OriginJob\`.\`executionMonitoringStartAt\`,
                \`OriginJob\`.\`executionMonitoringEndAt\`,
                \`OriginJob\`.\`cancelled\`,
                \`OriginJob\`.\`completed\`,
                \`OriginJob\`.\`error\`,
                \`OriginJob\`.\`createdAt\`,
                \`OriginJob\`.\`updatedAt\`,
                \`OriginJob\`.\`deletedAt\`
            FROM
                \`CciJobOverview\` AS \`OriginJob\`
            LEFT JOIN
                \`CciJobOverview\` AS \`AuxJob\`
            ON
                \`OriginJob\`.\`tenantId\` = \`AuxJob\`.\`tenantId\`
            AND
                \`OriginJob\`.\`systemId\` = \`AuxJob\`.\`systemId\`
            AND
                \`OriginJob\`.\`executionExecutedAt\` < \`AuxJob\`.\`executionExecutedAt\`
            WHERE
                \`AuxJob\`.\`id\` IS NULL
            AND
                \`OriginJob\`.\`tenantId\` IN (:tenantIds)
            AND
                \`OriginJob\`.\`systemId\` IN (:systemIds)
        `;

        const models = await this.repository.sequelize.query(
            queryRaw,
            {
                replacements: {
                    tenantIds,
                    systemIds,
                },
                type: QueryTypes.SELECT,
                model: CciJobOverviewModel,
                mapToModel: true
            }
        );

        // map values to create value objects
        return <CciJobOverview[]>this.mapper.mapModelsToAggregates(models, cQMetadata);
    }
}