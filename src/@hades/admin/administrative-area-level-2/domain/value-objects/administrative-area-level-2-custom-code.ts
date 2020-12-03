import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AdministrativeAreaLevel2CustomCode extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel2CustomCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AdministrativeAreaLevel2CustomCode',
            nullable: true,
            undefinable: true,
            maxLength: 10,
        }, validationRules));
    }
}