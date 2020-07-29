import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailId extends UuidValueObject
{
    public readonly type: 'MessageDetailId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}