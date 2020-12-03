import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AdministrativeAreaLevel3Slug extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel3Slug';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AdministrativeAreaLevel3Slug',
            nullable: false,
            undefinable: false,
            maxLength: 255,
        }, validationRules));
    }
}