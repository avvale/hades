import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailExecutionMonitoringStartAt extends TimestampValueObject 
{
    public readonly type: 'MessageDetailExecutionMonitoringStartAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailExecutionMonitoringStartAt',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}