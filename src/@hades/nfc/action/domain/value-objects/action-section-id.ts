import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ActionSectionId extends UuidValueObject
{
    public readonly type: 'ActionSectionId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ActionSectionId',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}