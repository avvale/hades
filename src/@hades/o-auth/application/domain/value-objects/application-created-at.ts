import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ApplicationCreatedAt extends TimestampValueObject 
{
    public readonly type: 'ApplicationCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ApplicationCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}