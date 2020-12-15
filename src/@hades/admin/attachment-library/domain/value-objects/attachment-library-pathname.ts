import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentLibraryPathname extends StringValueObject
{
    public readonly type: 'AttachmentLibraryPathname';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentLibraryPathname',
            nullable: false,
            undefinable: false,
            maxLength: 1024,
        }, validationRules));
    }
}