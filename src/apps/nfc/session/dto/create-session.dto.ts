import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8c6289c8-867f-4118-94f2-c6fc1fcc12e0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'ip [input here api field description]',
        example     : '8hfa71grqlu0hly'
    })
    ip: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tagId [input here api field description]',
        example     : 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd'
    })
    tagId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'uid [input here api field description]',
        example     : '1vfprlkz5gmkg5mw65amtcllb4ry8w3kycqi3zv5gedr9p4zrcgnm888cqwckc71'
    })
    uid: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'counter [input here api field description]',
        example     : 272134
    })
    counter: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiredAt [input here api field description]',
        example     : '2020-07-28 23:49:21'
    })
    expiredAt: string;
    
    
}
