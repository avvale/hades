import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ApplicationIsMaster extends BooleanValueObject 
{
    public readonly type: 'ApplicationIsMaster';

    constructor(value: boolean, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ApplicationIsMaster',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}