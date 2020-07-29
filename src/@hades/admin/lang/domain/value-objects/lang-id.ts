import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class LangId extends UuidValueObject
{
    public readonly type: 'LangId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'LangId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}