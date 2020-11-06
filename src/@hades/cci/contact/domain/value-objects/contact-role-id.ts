import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ContactRoleId extends UuidValueObject
{
    public readonly type: 'ContactRoleId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'ContactRoleId',
            nullable: true,
            undefinable: true,
            length: 36,
        }, validationRules), data);
    }
}