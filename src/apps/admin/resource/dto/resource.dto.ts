import { ApiProperty } from '@nestjs/swagger';

export class ResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '6418ef3e-8d2a-4555-a5a0-e1e611036456'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'gqyyaluv6ulcqxx6mtnjfnhotc8ovbahrhq0yxom69n9g6g221pr14jxwckrz9ej6efbvpqlp4d35w2ka4alr08l760e53q6lvkaouehl2cmy5jj56dze0mmo6y7ighype6py4pczyti305yyi2zb5urqrddjbdme99cn140g7bjrkhml4jf8b4i7ati6u9u362zte4p3zh6hj16xcsfgr1dwtp4cyrf3aw7929sp5pwdm5i8zkzj2714aambt2'
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
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-03 02:35:18'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 02:08:51'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 14:23:17'
    })
    deletedAt: string;
    
    
}
