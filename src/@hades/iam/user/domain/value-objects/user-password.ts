import { PasswordValueObject } from '@hades/shared/domain/value-objects/password.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class UserPassword extends PasswordValueObject
{
    public readonly type: 'UserPassword';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'UserPassword',
            nullable: false,
            undefinable: false,
            maxLength: 255
        }, validationRules), data);
    }
}