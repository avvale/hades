import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class TenantCode extends StringValueObject
{
    public readonly type: 'TenantCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'TenantCode',
            nullable:  false ,
            undefinable:  false ,
            maxLength: 50,
        }, validationRules));
    }
}