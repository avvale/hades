export class UpdateSummaryCommand 
{
    constructor(
        public readonly id: string,
        public readonly tagId?: string,
        public readonly tenantId?: string,
        public readonly accessAt?: string,
        public readonly counter?: number,
        
    ) {}
}