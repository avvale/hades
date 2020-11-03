export abstract class EnvironmentService
{
    abstract get<T>(key: string): T;
}