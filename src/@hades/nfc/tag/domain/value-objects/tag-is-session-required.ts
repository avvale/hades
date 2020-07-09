import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TagIsSessionRequired extends BooleanValueObject 
{
    public readonly type: 'TagIsSessionRequired';

    constructor(value: boolean, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TagIsSessionRequired',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}