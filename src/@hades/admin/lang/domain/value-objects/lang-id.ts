import { Uuid } from './../../../../shared/domain/value-objects/uuid';
import { StringValueObject } from 'src/@hades/shared/domain/value-objects/string.value-object';

export class LangId extends StringValueObject 
{
    public readonly type: 'LangId';
}