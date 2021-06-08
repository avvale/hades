// ignored file
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { CciMessageOverview } from './../../domain/message-overview.aggregate';
import { MessageOverviewMapper } from './../../domain/message-overview.mapper';
import { CciMessageOverviewModel } from './sequelize-message-overview.model';

import { QueryTypes } from 'sequelize';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import * as _ from 'lodash';

@Injectable()
export class SequelizeMessageOverviewRepository extends SequelizeRepository<CciMessageOverview, CciMessageOverviewModel> implements IMessageOverviewRepository
{
    public readonly aggregateName: string = 'CciMessageOverview';
    public readonly mapper: MessageOverviewMapper = new MessageOverviewMapper();

    constructor(
        @InjectModel(CciMessageOverviewModel)
        public readonly repository: typeof CciMessageOverviewModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }

    async getDashboardData(tenantIds: string[], systemIds: string[], cQMetadata?: CQMetadata): Promise<CciMessageOverview[]>
    {
        const queryRaw = `
            SELECT
                \`OriginMessage\`.\`id\`,
                \`OriginMessage\`.\`tenantId\`,
                \`OriginMessage\`.\`tenantCode\`,
                \`OriginMessage\`.\`systemId\`,
                \`OriginMessage\`.\`systemName\`,
                \`OriginMessage\`.\`executionId\`,
                \`OriginMessage\`.\`executionType\`,
                \`OriginMessage\`.\`executionExecutedAt\`,
                \`OriginMessage\`.\`executionMonitoringStartAt\`,
                \`OriginMessage\`.\`executionMonitoringEndAt\`,
                \`OriginMessage\`.\`numberMax\`,
                \`OriginMessage\`.\`numberDays\`,
                \`OriginMessage\`.\`success\`,
                \`OriginMessage\`.\`cancelled\`,
                \`OriginMessage\`.\`delivering\`,
                \`OriginMessage\`.\`error\`,
                \`OriginMessage\`.\`holding\`,
                \`OriginMessage\`.\`toBeDelivered\`,
                \`OriginMessage\`.\`waiting\`,
                \`OriginMessage\`.\`createdAt\`,
                \`OriginMessage\`.\`updatedAt\`,
                \`OriginMessage\`.\`deletedAt\`
            FROM
                \`CciMessageOverview\` AS \`OriginMessage\`
            LEFT JOIN
                \`CciMessageOverview\` AS \`AuxMessage\`
            ON
                \`OriginMessage\`.\`tenantId\` = \`AuxMessage\`.\`tenantId\`
            AND
                \`OriginMessage\`.\`systemId\` = \`AuxMessage\`.\`systemId\`
            AND
                \`OriginMessage\`.\`executionExecutedAt\` < \`AuxMessage\`.\`executionExecutedAt\`
            WHERE
                \`AuxMessage\`.\`id\` IS NULL
            AND
                \`OriginMessage\`.\`tenantId\` IN (:tenantIds)
            AND
                \`OriginMessage\`.\`systemId\` IN (:systemIds)
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
        return <CciMessageOverview[]>this.mapper.mapModelsToAggregates(models, cQMetadata);
    }
}