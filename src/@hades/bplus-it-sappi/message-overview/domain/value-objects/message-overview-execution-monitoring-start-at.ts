import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageOverviewExecutionMonitoringStartAt extends TimestampValueObject 
{
    public readonly type: 'MessageOverviewExecutionMonitoringStartAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageOverviewExecutionMonitoringStartAt',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}