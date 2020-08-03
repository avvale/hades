import { ApiProperty } from '@nestjs/swagger';

export class SessionDto 
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
        example     : '50yhm7kw0q0wxmj'
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
        example     : 'up4lkb5tn7go7eqt2i2q0ex3th7vq9fnczat13w3esgykuq56dp0c8ofoihyjr1l'
    })
    uid: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'counter [input here api field description]',
        example     : 284054
    })
    counter: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiredAt [input here api field description]',
        example     : '2020-08-03 17:27:39'
    })
    expiredAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-03 17:46:26'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 17:56:10'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 14:23:14'
    })
    deletedAt: string;
    
    
}
