import { ApiProperty } from '@nestjs/swagger';

export class UpdateSessionDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'ab63d4ac-a941-4caa-ad47-78a315327f13'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'ip [input here api field description]',
            example     : '0ryhd3n8rtp7emt'
        })
        ip: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tagId [input here api field description]',
            example     : '8ae89090-39be-4439-8f58-e523b2ff12f4'
        })
        tagId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'uid [input here api field description]',
            example     : 'vgbz1o0o1gz8hp4myt9wc6dituo5yn7jil5rkiyxdavfcu5j4tx8nzreky7cws3m'
        })
        uid: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'counter [input here api field description]',
            example     : 316890
        })
        counter: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'expiredAt [input here api field description]',
            example     : '2020-07-21 20:06:23'
        })
        expiredAt: string;
    
    
}
