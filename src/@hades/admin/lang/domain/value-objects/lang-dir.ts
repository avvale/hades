import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class LangDir extends EnumValueObject
{
    public readonly type: 'LangDir';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'LangDir',
            nullable: false,
            undefinable: false,
            enumOptions:  ['LTR','RTL'],
        }, validationRules));
    }
}