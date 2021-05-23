import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
import {
    MessageOverviewId,
    MessageOverviewTenantId,
    MessageOverviewTenantCode,
    MessageOverviewSystemId,
    MessageOverviewSystemName,
    MessageOverviewExecutionId,
    MessageOverviewExecutionType,
    MessageOverviewExecutionExecutedAt,
    MessageOverviewExecutionMonitoringStartAt,
    MessageOverviewExecutionMonitoringEndAt,
    MessageOverviewNumberMax,
    MessageOverviewNumberDays,
    MessageOverviewSuccess,
    MessageOverviewCancelled,
    MessageOverviewDelivering,
    MessageOverviewError,
    MessageOverviewHolding,
    MessageOverviewToBeDelivered,
    MessageOverviewWaiting,
    MessageOverviewCreatedAt,
    MessageOverviewUpdatedAt,
    MessageOverviewDeletedAt,
} from './../../domain/value-objects';
import { CciMessageOverview } from './../../domain/message-overview.aggregate';
import { messagesOverview } from './../seeds/message-overview.seed';

@Injectable()
export class MockMessageOverviewSeeder extends MockSeeder<CciMessageOverview>
{
    public collectionSource: CciMessageOverview[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let messageOverview of messagesOverview)
        {
            this.collectionSource.push(
                CciMessageOverview.register(
                    new MessageOverviewId(messageOverview.id),
                    new MessageOverviewTenantId(messageOverview.tenantId),
                    new MessageOverviewTenantCode(messageOverview.tenantCode),
                    new MessageOverviewSystemId(messageOverview.systemId),
                    new MessageOverviewSystemName(messageOverview.systemName),
                    new MessageOverviewExecutionId(messageOverview.executionId),
                    new MessageOverviewExecutionType(messageOverview.executionType),
                    new MessageOverviewExecutionExecutedAt(messageOverview.executionExecutedAt),
                    new MessageOverviewExecutionMonitoringStartAt(messageOverview.executionMonitoringStartAt),
                    new MessageOverviewExecutionMonitoringEndAt(messageOverview.executionMonitoringEndAt),
                    new MessageOverviewNumberMax(messageOverview.numberMax),
                    new MessageOverviewNumberDays(messageOverview.numberDays),
                    new MessageOverviewSuccess(messageOverview.success),
                    new MessageOverviewCancelled(messageOverview.cancelled),
                    new MessageOverviewDelivering(messageOverview.delivering),
                    new MessageOverviewError(messageOverview.error),
                    new MessageOverviewHolding(messageOverview.holding),
                    new MessageOverviewToBeDelivered(messageOverview.toBeDelivered),
                    new MessageOverviewWaiting(messageOverview.waiting),
                    new MessageOverviewCreatedAt({currentTimestamp: true}),
                    new MessageOverviewUpdatedAt({currentTimestamp: true}),
                    new MessageOverviewDeletedAt(null),
                )
            );
        }
    }
}