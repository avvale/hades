import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageOverviewExecutionMonitoringEndAt extends TimestampValueObject 
{
    public readonly type: 'MessageOverviewExecutionMonitoringEndAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageOverviewExecutionMonitoringEndAt',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}