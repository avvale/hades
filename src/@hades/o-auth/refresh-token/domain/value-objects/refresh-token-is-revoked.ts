import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class RefreshTokenIsRevoked extends BooleanValueObject 
{
    public readonly type: 'RefreshTokenIsRevoked';

    constructor(value: boolean, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'RefreshTokenIsRevoked',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}