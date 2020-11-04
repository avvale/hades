import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ModuleVersion extends StringValueObject
{
    public readonly type: 'ModuleVersion';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ModuleVersion',
            nullable:  false ,
            undefinable:  false ,
            maxLength: 20,
        }, validationRules));
    }
}