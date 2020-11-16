import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentFamilyUpdatedAt extends TimestampValueObject
{
    public readonly type: 'AttachmentFamilyUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'AttachmentFamilyUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules), data);
    }
}