import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentLibraryName extends StringValueObject
{
    public readonly type: 'AttachmentLibraryName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentLibraryName',
            nullable: true,
            undefinable: true,
            maxLength: 255,
        }, validationRules));
    }
}