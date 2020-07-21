import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto 
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
            example     : 'xh9ld79fymb0yke'
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
            example     : 'y7athy3mad5nzw92fn2f18ndwwexdemcuc4x1b32sodlmpajmgswvds5me4mrpyb'
        })
        uid: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'counter [input here api field description]',
            example     : 714999
        })
        counter: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'expiredAt [input here api field description]',
            example     : '2020-07-21 07:18:40'
        })
        expiredAt: string;
    
    
}
