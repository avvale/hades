import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ClientIsActive extends BooleanValueObject 
{
    public readonly type: 'ClientIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ClientIsActive',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}