import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentFamilyFit extends EnumValueObject
{
    public readonly type: 'AttachmentFamilyFit';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentFamilyFit',
            nullable: false,
            undefinable: false,
            enumOptions:  ['CROP','WIDTH','HEIGHT','WIDTH_FREE','HEIGHT_FREE'],
        }, validationRules));
    }
}