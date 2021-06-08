// ignored file
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { CciChannelOverview } from './../../domain/channel-overview.aggregate';
import { ChannelOverviewMapper } from './../../domain/channel-overview.mapper';
import { CciChannelOverviewModel } from './sequelize-channel-overview.model';

// custom
import { QueryTypes } from 'sequelize';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import * as _ from 'lodash';

@Injectable()
export class SequelizeChannelOverviewRepository extends SequelizeRepository<CciChannelOverview, CciChannelOverviewModel> implements IChannelOverviewRepository
{
    public readonly aggregateName: string = 'CciChannelOverview';
    public readonly mapper: ChannelOverviewMapper = new ChannelOverviewMapper();
    public readonly timezoneColumns: string[] = ['executionExecutedAt','executionMonitoringStartAt','executionMonitoringEndAt','createdAt','updatedAt','deletedAt'];

    constructor(
        @InjectModel(CciChannelOverviewModel)
        public readonly repository: typeof CciChannelOverviewModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }

    async getDashboardData(tenantIds: string[], systemIds: string[], cQMetadata?: CQMetadata): Promise<CciChannelOverview[]>
    {
        const queryRaw = `
            SELECT
                \`OriginChannel\`.\`id\`,
                \`OriginChannel\`.\`tenantId\`,
                \`OriginChannel\`.\`tenantCode\`,
                \`OriginChannel\`.\`systemId\`,
                \`OriginChannel\`.\`systemName\`,
                \`OriginChannel\`.\`executionId\`,
                \`OriginChannel\`.\`executionType\`,
                \`OriginChannel\`.\`executionExecutedAt\`,
                \`OriginChannel\`.\`executionMonitoringStartAt\`,
                \`OriginChannel\`.\`executionMonitoringEndAt\`,
                \`OriginChannel\`.\`error\`,
                \`OriginChannel\`.\`inactive\`,
                \`OriginChannel\`.\`successful\`,
                \`OriginChannel\`.\`stopped\`,
                \`OriginChannel\`.\`unknown\`,
                \`OriginChannel\`.\`unregistered\`,
                \`OriginChannel\`.\`createdAt\`,
                \`OriginChannel\`.\`updatedAt\`,
                \`OriginChannel\`.\`deletedAt\`
            FROM
                \`CciChannelOverview\` AS \`OriginChannel\`
            LEFT JOIN
                \`CciChannelOverview\` AS \`AuxChannel\`
            ON
                \`OriginChannel\`.\`tenantId\` = \`AuxChannel\`.\`tenantId\`
            AND
                \`OriginChannel\`.\`systemId\` = \`AuxChannel\`.\`systemId\`
            AND
                \`OriginChannel\`.\`executionExecutedAt\` < \`AuxChannel\`.\`executionExecutedAt\`
            WHERE
                \`AuxChannel\`.\`id\` IS NULL
            AND
                \`OriginChannel\`.\`tenantId\` IN (:tenantIds)
            AND
                \`OriginChannel\`.\`systemId\` IN (:systemIds)
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
        return <CciChannelOverview[]>this.mapper.mapModelsToAggregates(models, cQMetadata);
    }
}