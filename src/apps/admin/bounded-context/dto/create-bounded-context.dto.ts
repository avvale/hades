import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '405df539-d9f7-4e79-beb3-fe1d3f7aaf63'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ke11tilbelq72kxa8bzhps32g0jeopm9a1u9x9b2jmmp4b3m00ptmr9lfbvcbw37f0k79p4s1jjt382n1dx5fvujvi9ht5apg4yqk2gwsz7g6pzpukaksrzz08v0o8n7rc3q8j10u1j2cqz7byzi352noh0h7xq0465k79965sgcxskwgqlagssamoobgvnvlrtcekd7sy07vsuzyjposxcpj5o8m0zmsr5sj3jyjuz5rkc1ftl5ji833o7m1sl'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'ora1pynpbj9h9zsqkto9'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 264153
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
