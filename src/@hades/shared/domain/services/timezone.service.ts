export abstract class TimezoneService
{
    private _requestTimezone: string;
    abstract set requestTimezone(requestTimezone: string);
    abstract get requestTimezone(): string;
}