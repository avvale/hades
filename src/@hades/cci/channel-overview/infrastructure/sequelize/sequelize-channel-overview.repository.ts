import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { CciChannelOverview } from './../../domain/channel-overview.aggregate';
import { ChannelOverviewMapper } from './../../domain/channel-overview.mapper';
import { CciChannelOverviewModel } from './sequelize-channel-overview.model';
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

    async getDashboardData(tenantIds: string[], systemIds: string[]): Promise<CciChannelOverview[]>
    {
        const queryRaw = `
            SELECT
                \`origin_channel\`.\`id\`,
                \`origin_channel\`.\`tenant_id\`,
                \`origin_channel\`.\`tenant_code\`,
                \`origin_channel\`.\`system_id\`,
                \`origin_channel\`.\`system_name\`,
                \`origin_channel\`.\`execution_id\`,
                \`origin_channel\`.\`execution_type\`,
                \`origin_channel\`.\`execution_executed_at\`,
                \`origin_channel\`.\`execution_monitoring_start_at\`,
                \`origin_channel\`.\`execution_monitoring_end_at\`,
                \`origin_channel\`.\`error\`,
                \`origin_channel\`.\`inactive\`,
                \`origin_channel\`.\`successful\`,
                \`origin_channel\`.\`stopped\`,
                \`origin_channel\`.\`unknown\`,
                \`origin_channel\`.\`unregistered\`,
                \`origin_channel\`.\`created_at\`,
                \`origin_channel\`.\`updated_at\`,
                \`origin_channel\`.\`deleted_at\`
            FROM
                \`cci_channel_overview\` AS \`origin_channel\`
            LEFT JOIN
                \`cci_channel_overview\` AS \`aux_channel\`
            ON
                \`origin_channel\`.\`tenant_id\` = \`aux_channel\`.\`tenant_id\`
            AND
                \`origin_channel\`.\`system_id\` = \`aux_channel\`.\`system_id\`
            AND
                \`origin_channel\`.\`execution_executed_at\` < \`aux_channel\`.\`execution_executed_at\`
            WHERE
                \`aux_channel\`.\`id\` IS NULL
            AND
                \`origin_channel\`.\`tenant_id\` IN (:tenantIds)
            AND
                \`origin_channel\`.\`system_id\` IN (:systemIds)
        `;

        const models = await this.repository.sequelize.query(
            queryRaw,
            {
                replacements: {
                    tenantIds,
                    systemIds,
                },
                type: QueryTypes.SELECT,
                model: CciChannelOverviewModel,
                mapToModel: true
            }
        );

        // map values to create value objects
        return <CciChannelOverview[]>this.mapper.mapModelsToAggregates(models);
    }
}