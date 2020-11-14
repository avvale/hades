import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentFamilyDeletedAt extends TimestampValueObject
{
    public readonly type: 'AttachmentFamilyDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'AttachmentFamilyDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules), data);
    }
}