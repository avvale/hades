import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class BoundedContextCreatedAt extends TimestampValueObject 
{
    public readonly type: 'BoundedContextCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'BoundedContextCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}