import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AdministrativeAreaLevel2Slug extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel2Slug';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AdministrativeAreaLevel2Slug',
            nullable: false,
            undefinable: false,
            maxLength: 255,
        }, validationRules));
    }
}