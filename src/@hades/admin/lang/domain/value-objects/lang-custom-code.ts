import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class LangCustomCode extends StringValueObject
{
    public readonly type: 'LangCustomCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'LangCustomCode',
            nullable: true,
            undefinable: true,
            maxLength: 10,
        }, validationRules));
    }
}