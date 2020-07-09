import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TagUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'TagUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TagUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}