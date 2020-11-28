import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AdministrativeAreaLevel3CustomCode extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel3CustomCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AdministrativeAreaLevel3CustomCode',
            nullable: true,
            undefinable: true,
            maxLength: 10,
        }, validationRules));
    }
}