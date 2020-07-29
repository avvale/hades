import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailSystemId extends UuidValueObject
{
    public readonly type: 'MessageDetailSystemId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailSystemId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}