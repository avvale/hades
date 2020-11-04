import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class JobDetailExecutionMonitoringStartAt extends TimestampValueObject
{
    public readonly type: 'JobDetailExecutionMonitoringStartAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'JobDetailExecutionMonitoringStartAt',
            nullable:  false ,
            undefinable:  false ,
        }, validationRules), data);
    }
}