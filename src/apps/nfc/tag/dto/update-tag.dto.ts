import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '20da9779-7e32-474a-bb18-e80dc5561456'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'code [input here api field description]',
        example     : 5920917751
    })
    code: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '8252d797-ad18-4335-b200-078de890abe9'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '8d4pnfovj5badl6otya4o9wi0ybtd39pyrf2q0iz42z8h2c6h0'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'urlBase [input here api field description]',
        example     : '9dwtbtysjqmbl8aw589tyfgkgzl6zabcz84l1ya74sh5yej6slzyoiipldgv0n4r8mpaknr8nbniktj0vucbw5q5g6pdajnu36hedmpq201auzqd9w72fbdf9p695pqf9oidil56p92hqixw8vhkz5i9pre90k4lxirwq0lvxen0vfnwq0xs464xwxhu2ncbxg6hnmpshlfrzksdohs6jndopku58j5gtbfnk9g1h15mc9b63bc9vgpskhw3tgg'
    })
    urlBase: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'params [input here api field description]',
        example     : { "foo" : "bar" }
    })
    params: any;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'offset [input here api field description]',
        example     : 758564
    })
    offset: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isSessionRequired [input here api field description]',
        example     : false
    })
    isSessionRequired: boolean;
    
    
}
