import { SmallintValueObject } from '@hades/shared/domain/value-objects/smallint.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SessionCounter extends SmallintValueObject 
{
    public readonly type: 'SessionCounter';

    constructor(value: number, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SessionCounter',
            nullable: false,
            undefinable: false,
            maxLength: 6,
        }, validationRules));
    }
}