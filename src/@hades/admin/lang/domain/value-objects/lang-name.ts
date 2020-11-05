import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class LangName extends StringValueObject
{
    public readonly type: 'LangName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'LangName',
            nullable: false,
            undefinable: false,
            
        }, validationRules));
    }
}