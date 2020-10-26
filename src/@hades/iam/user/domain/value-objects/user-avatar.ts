import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class UserAvatar extends StringValueObject
{
    public readonly type: 'UserAvatar';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'UserAvatar',
            nullable: true,
            undefinable: true,
            maxLength: 255,        }, validationRules));
    }
}