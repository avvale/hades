import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PermissionName extends StringValueObject
{
    public readonly type: 'PermissionName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'PermissionName',
            nullable: false,
            undefinable: false,
            maxLength: 255,
        }, validationRules));
    }
}