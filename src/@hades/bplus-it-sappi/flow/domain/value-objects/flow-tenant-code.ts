import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class FlowTenantCode extends StringValueObject 
{
    public readonly type: 'FlowTenantCode';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'FlowTenantCode',
            nullable: false,
            undefinable: false,
            maxLength: 50,            
        }, validationRules));
    }
}