export class PaginationLangsResponse 
{
    constructor(
        public readonly total: number,
        public readonly count: number,
        public readonly row: any[]
    ) {}
}