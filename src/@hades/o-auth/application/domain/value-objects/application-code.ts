import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ApplicationCode extends StringValueObject
{
    public readonly type: 'ApplicationCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ApplicationCode',
            nullable: false,
            undefinable: false,
            maxLength: 50,
        }, validationRules));
    }
}