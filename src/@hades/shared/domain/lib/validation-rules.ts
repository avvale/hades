export interface ValidationRules
{
    name?: string,
    nullable?: boolean;
    undefinable?: boolean;
    length?:number;
    minLength?: number;
    maxLength?: number;
    enumOptions?: string[];
}