import { SmallintValueObject } from '@hades/shared/domain/value-objects/smallint.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TagOffset extends SmallintValueObject 
{
    public readonly type: 'TagOffset';

    constructor(value: number, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TagOffset',
            nullable: true,
            undefinable: true,
            maxLength: 6,
            unsigned: true,
        }, validationRules));
    }
}