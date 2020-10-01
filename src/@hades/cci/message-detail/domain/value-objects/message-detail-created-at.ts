import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageDetailCreatedAt extends TimestampValueObject 
{
    public readonly type: 'MessageDetailCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}