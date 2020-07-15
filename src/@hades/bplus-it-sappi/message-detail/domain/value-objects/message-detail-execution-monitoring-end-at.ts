import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailExecutionMonitoringEndAt extends TimestampValueObject 
{
    public readonly type: 'MessageDetailExecutionMonitoringEndAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailExecutionMonitoringEndAt',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}