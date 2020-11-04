import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class SystemTenantCode extends StringValueObject
{
    public readonly type: 'SystemTenantCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'SystemTenantCode',
            nullable:  false ,
            undefinable:  false ,
            maxLength: 50,
        }, validationRules));
    }
}