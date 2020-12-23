import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentFamilyFormat extends EnumValueObject
{
    public readonly type: 'AttachmentFamilyFormat';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentFamilyFormat',
            nullable: true,
            undefinable: true,
            enumOptions:  ['JPG','PNG','GIF','TIF','BMP','DATA_URL'],
        }, validationRules));
    }
}