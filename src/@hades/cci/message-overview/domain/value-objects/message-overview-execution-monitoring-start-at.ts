import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageOverviewExecutionMonitoringStartAt extends TimestampValueObject
{
    public readonly type: 'MessageOverviewExecutionMonitoringStartAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'MessageOverviewExecutionMonitoringStartAt',
            nullable:  false ,
            undefinable:  false ,
        }, validationRules), data);
    }
}