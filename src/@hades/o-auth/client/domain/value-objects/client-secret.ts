import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ClientSecret extends StringValueObject
{
    public readonly type: 'ClientSecret';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ClientSecret',
            nullable: false,
            undefinable: false,
            maxLength: 90,
        }, validationRules));
    }
}