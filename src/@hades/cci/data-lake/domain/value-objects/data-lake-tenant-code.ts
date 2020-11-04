import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class DataLakeTenantCode extends StringValueObject
{
    public readonly type: 'DataLakeTenantCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'DataLakeTenantCode',
            nullable:  false ,
            undefinable:  false ,
            maxLength: 50,
        }, validationRules));
    }
}