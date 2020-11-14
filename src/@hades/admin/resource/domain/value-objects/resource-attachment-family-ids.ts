import { UuidArrayValueObject } from '@hades/shared/domain/value-objects/uuid-array.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ResourceAttachmentFamilyIds extends UuidArrayValueObject
{
    public readonly type: 'ResourceAttachmentFamilyIds';

    constructor(value: string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ResourceAttachmentFamilyIds',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}