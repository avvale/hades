import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ff8cb54d-0a91-475c-b0e5-1991a725d1da'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a35fedca-15dc-422a-9a50-029d18c9764b'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'syfq6unzf91f5kxpcn4wblj0mztd8ns423vit1wsvjyhqhktzf4xhjkdxvyawwjnkfbk8doubq2fmk152fh1flsdhx07q2peby2r35zrckxj4bamgzq2y57d6ukbdaua6o86qp2hmbljnlj8dxoph2ws75l0toeg6u22mvhdz1rfx58ocj2xipgxkfckb3zhl9nk0n5a0r9fwrndmbh0cxarfqgkdst7d5auw8bwgnoqu2btdbzordfns57hy95'
    })
    name: string;
    
}
