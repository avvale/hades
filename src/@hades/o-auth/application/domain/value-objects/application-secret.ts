import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ApplicationSecret extends StringValueObject
{
    public readonly type: 'ApplicationSecret';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ApplicationSecret',
            nullable: false,
            undefinable: false,
            maxLength: 90,
        }, validationRules));
    }
}