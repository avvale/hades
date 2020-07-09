import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TagCreatedAt extends TimestampValueObject 
{
    public readonly type: 'TagCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TagCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}