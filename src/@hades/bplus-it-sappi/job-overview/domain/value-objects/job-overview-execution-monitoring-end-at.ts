import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobOverviewExecutionMonitoringEndAt extends TimestampValueObject 
{
    public readonly type: 'JobOverviewExecutionMonitoringEndAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobOverviewExecutionMonitoringEndAt',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}