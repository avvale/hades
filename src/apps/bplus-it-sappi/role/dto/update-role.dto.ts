import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3b1bb011-1b5b-4ff1-8453-d226ed4351dc'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd76e18ba-d0b3-48e4-bebf-0bb95a5c04b7'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'vcjfetf3jdyjjc773v5gymq1kfo7ktnidor5xso9qjqneyvywlgu6r9t5svgrdq0bnd2yfg1mxi26zoox5a70b9fw7oh8vebp0ql1ootc5ecx7h1rhz4ns8pqtiojgsl3owsost6fz5adi9ojcutucyit23it7oir6maxsz2i4jh5pk6ovp3tet6rtxumuje3n6o9a92xyeppgoph05r9za79aorimqmc7282lstidv5u8mee0m61qa8gmc923r'
    })
    name: string;
    
}
