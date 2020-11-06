import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class JobOverviewExecutionMonitoringEndAt extends TimestampValueObject
{
    public readonly type: 'JobOverviewExecutionMonitoringEndAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'JobOverviewExecutionMonitoringEndAt',
            nullable: false,
            undefinable: false,
        }, validationRules), data);
    }
}