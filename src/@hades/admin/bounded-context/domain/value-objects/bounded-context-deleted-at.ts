import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class BoundedContextDeletedAt extends TimestampValueObject 
{
    public readonly type: 'BoundedContextDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'BoundedContextDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}