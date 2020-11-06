import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelOverviewExecutionMonitoringStartAt extends TimestampValueObject
{
    public readonly type: 'ChannelOverviewExecutionMonitoringStartAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'ChannelOverviewExecutionMonitoringStartAt',
            nullable: false,
            undefinable: false,
        }, validationRules), data);
    }
}