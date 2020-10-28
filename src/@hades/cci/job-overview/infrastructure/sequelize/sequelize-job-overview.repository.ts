import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { CciJobOverview } from './../../domain/job-overview.aggregate';
import { JobOverviewMapper } from './../../domain/job-overview.mapper';
import { CciJobOverviewModel } from './sequelize-job-overview.model';
import * as _ from 'lodash';

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

    async getDashboardData(tenantIds: string[], systemIds: string[]): Promise<CciJobOverview[]>
    {
        const queryRaw = `
            SELECT
                \`origin_job\`.\`id\`,
                \`origin_job\`.\`tenant_id\`,
                \`origin_job\`.\`tenant_code\`,
                \`origin_job\`.\`system_id\`,
                \`origin_job\`.\`system_name\`,
                \`origin_job\`.\`execution_id\`,
                \`origin_job\`.\`execution_type\`,
                \`origin_job\`.\`execution_executed_at\`,
                \`origin_job\`.\`execution_monitoring_start_at\`,
                \`origin_job\`.\`execution_monitoring_end_at\`,
                \`origin_job\`.\`cancelled\`,
                \`origin_job\`.\`completed\`,
                \`origin_job\`.\`error\`,
                \`origin_job\`.\`created_at\`,
                \`origin_job\`.\`updated_at\`,
                \`origin_job\`.\`deleted_at\`
            FROM
                \`cci_job_overview\` AS \`origin_job\`
            LEFT JOIN
                \`cci_job_overview\` AS \`aux_job\`
            ON
                \`origin_job\`.\`tenant_id\` = \`aux_job\`.\`tenant_id\`
            AND
                \`origin_job\`.\`system_id\` = \`aux_job\`.\`system_id\`
            AND
                \`origin_job\`.\`execution_executed_at\` < \`aux_job\`.\`execution_executed_at\`
            WHERE
                \`aux_job\`.\`id\` IS NULL
            AND
                \`origin_job\`.\`tenant_id\` IN (:tenantIds)
            AND
                \`origin_job\`.\`system_id\` IN (:systemIds)
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
        return <CciJobOverview[]>this.mapper.mapModelsToAggregates(models);
    }
}