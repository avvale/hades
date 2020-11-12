import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ResourceName extends StringValueObject
{
    public readonly type: 'ResourceName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ResourceName',
            nullable: false,
            undefinable: false,
            maxLength: 255,
        }, validationRules));
    }
}