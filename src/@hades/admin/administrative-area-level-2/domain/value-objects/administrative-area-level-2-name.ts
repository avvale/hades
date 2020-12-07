import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AdministrativeAreaLevel2Name extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel2Name';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AdministrativeAreaLevel2Name',
            nullable: false,
            undefinable: false,
            maxLength: 255,
        }, validationRules));
    }
}