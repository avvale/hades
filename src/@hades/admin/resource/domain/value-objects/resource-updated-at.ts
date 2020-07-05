import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ResourceUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'ResourceUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ResourceUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}