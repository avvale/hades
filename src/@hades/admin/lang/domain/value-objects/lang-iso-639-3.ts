import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';

export class LangIso6393 extends StringValueObject 
{
    public readonly type: 'LangIso6393';

    constructor(value: string) 
    {
        super(value, { 
            name: 'LangIso6393'
        });
    }
}