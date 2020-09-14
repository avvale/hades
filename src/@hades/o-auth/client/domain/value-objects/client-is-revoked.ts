import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ClientIsRevoked extends BooleanValueObject 
{
    public readonly type: 'ClientIsRevoked';

    constructor(value: boolean, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ClientIsRevoked',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}