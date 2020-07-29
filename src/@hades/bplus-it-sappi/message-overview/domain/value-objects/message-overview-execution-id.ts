import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageOverviewExecutionId extends UuidValueObject
{
    public readonly type: 'MessageOverviewExecutionId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageOverviewExecutionId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}