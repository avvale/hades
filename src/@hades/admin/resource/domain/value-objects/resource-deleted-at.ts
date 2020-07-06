import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ResourceDeletedAt extends TimestampValueObject 
{
    public readonly type: 'ResourceDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ResourceDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}