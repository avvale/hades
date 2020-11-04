import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ModuleSystemName extends StringValueObject
{
    public readonly type: 'ModuleSystemName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ModuleSystemName',
            nullable:  false ,
            undefinable:  false ,
            maxLength: 20,
        }, validationRules));
    }
}