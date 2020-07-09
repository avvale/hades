import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TagDeletedAt extends TimestampValueObject 
{
    public readonly type: 'TagDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TagDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}