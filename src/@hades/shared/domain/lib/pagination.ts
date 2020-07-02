export interface Pagination<Aggregate>
{
    total: number,
    count: number,
    rows: Aggregate[],
}