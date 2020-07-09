import { ApiProperty } from '@nestjs/swagger';

export class UpdateSessionDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'ip [input here api field description]',
        example     : 'mif9yn166ngi227'
    })
    ip: string;
    
    @ApiProperty({
        type        : String,
        description : 'tagId [input here api field description]',
        example     : 'b757a5a3-48c5-415f-bdb7-1d52efc782b1'
    })
    tagId: string;
    
    @ApiProperty({
        type        : String,
        description : 'uid [input here api field description]',
        example     : '4cphqwbwhm9lks2m38yiy2u4c5u0s94tcdo2ps11su2ol2ia7vf71bzx1r2tntkr'
    })
    uid: string;
    
    @ApiProperty({
        type        : Number,
        description : 'counter [input here api field description]',
        example     : 109840
    })
    counter: number;
    
    @ApiProperty({
        type        : String,
        description : 'expiredAt [input here api field description]',
        example     : '2020-07-09 12:12:55'
    })
    expiredAt: string;
    
}
