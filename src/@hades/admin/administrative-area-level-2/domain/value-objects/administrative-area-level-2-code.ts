import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AdministrativeAreaLevel2Code extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel2Code';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AdministrativeAreaLevel2Code',
            nullable: false,
            undefinable: false,
            maxLength: 8,
        }, validationRules));
    }
}