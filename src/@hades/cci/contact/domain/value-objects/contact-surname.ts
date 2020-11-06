import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ContactSurname extends StringValueObject
{
    public readonly type: 'ContactSurname';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ContactSurname',
            nullable: true,
            undefinable: true,
            maxLength: 255,
        }, validationRules));
    }
}