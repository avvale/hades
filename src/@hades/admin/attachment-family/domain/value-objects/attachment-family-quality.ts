import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentFamilyQuality extends IntValueObject
{
    public readonly type: 'AttachmentFamilyQuality';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentFamilyQuality',
            nullable: true,
            undefinable: true,
            maxLength: 2,
            unsigned: true,
        }, validationRules));
    }
}