import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ContactArea extends StringValueObject
{
    public readonly type: 'ContactArea';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ContactArea',
            nullable: true,
            undefinable: true,
            maxLength: 255,
        }, validationRules));
    }
}