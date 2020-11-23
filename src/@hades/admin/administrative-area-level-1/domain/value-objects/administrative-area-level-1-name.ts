import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AdministrativeAreaLevel1Name extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel1Name';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AdministrativeAreaLevel1Name',
            nullable: false,
            undefinable: false,
            maxLength: 255,
        }, validationRules));
    }
}