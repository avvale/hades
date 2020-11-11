import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CountryCustomCode extends StringValueObject
{
    public readonly type: 'CountryCustomCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'CountryCustomCode',
            nullable: true,
            undefinable: true,
            maxLength: 10,
        }, validationRules));
    }
}