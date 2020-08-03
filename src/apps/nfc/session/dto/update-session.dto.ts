import { ApiProperty } from '@nestjs/swagger';

export class UpdateSessionDto 
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
        example     : 'e3q1uinuykujqwx'
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
        example     : 'tbw910twdof248ihoflioc2dzia6x6g8g5xgpju2mcrlffya4t3iyxigi8l1sfbo'
    })
    uid: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'counter [input here api field description]',
        example     : 606166
    })
    counter: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiredAt [input here api field description]',
        example     : '2020-08-03 03:09:05'
    })
    expiredAt: string;
    
    
}
