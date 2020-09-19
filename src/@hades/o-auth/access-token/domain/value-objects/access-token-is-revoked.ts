import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccessTokenIsRevoked extends BooleanValueObject 
{
    public readonly type: 'AccessTokenIsRevoked';

    constructor(value: boolean, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'AccessTokenIsRevoked',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}