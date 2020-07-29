import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c34b46f1-704c-41a5-a72c-437207d9d9cd'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '2276f645-3ac7-4558-a209-dc824837f280'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '138wd6g1hsq5pla682fgry8p7y196urzue3vey733vbf7bml6j9xcq6akv6i69n6abj89050bfch9an1fx0x6ffmrion8acpbtbpmaisbatt0lao8aylpt3umshdhv5ff3th1nf39mhsvd6ehq2qf81dsdqmeoadbjei2clo44d1q3e3s74gr87ngygr2g510356swkr3akc46btzb704wmqp2e0brutsx6jzbz8x072nbattrxlqhfu2hcwaax'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : false
    })
    hasCustomFields: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : false
    })
    hasAttachments: boolean;
    
    
}
