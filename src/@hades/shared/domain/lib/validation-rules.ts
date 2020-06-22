export interface ValidationRules
{
    name: string,
    nullable?: boolean;
    length?:number;
    minLength?: number;
    maxLength?: number;
}