import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'ip [input here api field description]',
        example     : '9x1f04q6fo42jih'
    })
    ip: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tagId [input here api field description]',
        example     : 'c3e53abc-9041-4dc5-b118-1243430c03a4'
    })
    tagId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'uid [input here api field description]',
        example     : 'n4nm1jy4avdi2e14t672n9ftyaxxgmfofpj34ro5wc2raep347lkx2j9gif13m2i'
    })
    uid: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'counter [input here api field description]',
        example     : 260291
    })
    counter: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiredAt [input here api field description]',
        example     : '2020-08-02 20:22:59'
    })
    expiredAt: string;
    
    
}
