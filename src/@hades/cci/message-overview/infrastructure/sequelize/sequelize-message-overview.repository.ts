import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { CciMessageOverview } from './../../domain/message-overview.aggregate';
import { MessageOverviewMapper } from './../../domain/message-overview.mapper';
import { CciMessageOverviewModel } from './sequelize-message-overview.model';
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

    async getDashboardData(tenantIds: string[], systemIds: string[]): Promise<CciMessageOverview[]>
    {
        const queryRaw = `
            SELECT
                \`origin_message\`.\`id\`,
                \`origin_message\`.\`tenant_id\`,
                \`origin_message\`.\`tenant_code\`,
                \`origin_message\`.\`system_id\`,
                \`origin_message\`.\`system_name\`,
                \`origin_message\`.\`execution_id\`,
                \`origin_message\`.\`execution_type\`,
                \`origin_message\`.\`execution_executed_at\`,
                \`origin_message\`.\`execution_monitoring_start_at\`,
                \`origin_message\`.\`execution_monitoring_end_at\`,
                \`origin_message\`.\`number_max\`,
                \`origin_message\`.\`number_days\`,
                \`origin_message\`.\`success\`,
                \`origin_message\`.\`cancelled\`,
                \`origin_message\`.\`delivering\`,
                \`origin_message\`.\`error\`,
                \`origin_message\`.\`holding\`,
                \`origin_message\`.\`to_be_delivered\`,
                \`origin_message\`.\`waiting\`,
                \`origin_message\`.\`created_at\`,
                \`origin_message\`.\`updated_at\`,
                \`origin_message\`.\`deleted_at\`
            FROM
                \`cci_message_overview\` AS \`origin_message\`
            LEFT JOIN
                \`cci_message_overview\` AS \`aux_message\`
            ON
                \`origin_message\`.\`tenant_id\` = \`aux_message\`.\`tenant_id\`
            AND
                \`origin_message\`.\`system_id\` = \`aux_message\`.\`system_id\`
            AND
                \`origin_message\`.\`execution_executed_at\` < \`aux_message\`.\`execution_executed_at\`
            WHERE
                \`aux_message\`.\`id\` IS NULL
            AND
                \`origin_message\`.\`tenant_id\` IN (:tenantIds)
            AND
                \`origin_message\`.\`system_id\` IN (:systemIds)
        `;

        const models = await this.repository.sequelize.query(
            queryRaw,
            {
                replacements: {
                    tenantIds,
                    systemIds,
                },
                type: QueryTypes.SELECT,
                model: CciMessageOverviewModel,
                mapToModel: true
            }
        );

        // map values to create value objects
        return <CciMessageOverview[]>this.mapper.mapModelsToAggregates(models);
    }
}