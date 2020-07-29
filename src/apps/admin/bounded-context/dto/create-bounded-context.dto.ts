import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '026a47ba-5353-480b-bc65-9a0bf9402f6b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'eda7mvkyrq1s2m8etzfjf1x7qjys8t9tp8t4v37i50568ba7nxb0r4xqhfpvk9wwpgkiqe1h1yr2a6pl63fiwnyz8ocx2j92ysu4hce7phmqdvcfa3g11x6ibt4jtj6ktty4vse2ejd2ld9jaab6219rphaz6570h1uuvuamhxw9pdq5gjua7812zy53up1qztlpuwfuctx8shesf2f4g70jfv2828a6u6x9xgi3r7xfapd3cni7p4f75b2a243'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'i254ijki20js9fg3dnkk'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 512163
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
