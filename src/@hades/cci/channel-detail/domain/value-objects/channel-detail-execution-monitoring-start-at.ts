import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelDetailExecutionMonitoringStartAt extends TimestampValueObject
{
    public readonly type: 'ChannelDetailExecutionMonitoringStartAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'ChannelDetailExecutionMonitoringStartAt',
            nullable: false,
            undefinable: false,
        }, validationRules), data);
    }
}