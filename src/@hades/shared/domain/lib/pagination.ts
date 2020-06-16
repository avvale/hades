export interface Pagination<Entity>
{
    total: number,
    count: number,
    rows: Entity[],
}