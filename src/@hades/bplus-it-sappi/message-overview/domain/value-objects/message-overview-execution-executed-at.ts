import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageOverviewExecutionExecutedAt extends TimestampValueObject 
{
    public readonly type: 'MessageOverviewExecutionExecutedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageOverviewExecutionExecutedAt',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}