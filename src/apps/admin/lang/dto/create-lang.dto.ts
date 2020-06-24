import { ApiProperty } from '@nestjs/swagger';

export class CreateLangDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '86d2d929-7ca5-4849-b278-f17a0aca744e'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'u4r6gy6airs4e159nelzd8dbyktymv0y4ygmxqo3azvksiln589gb1x78qku315vcswrotjxdbni2aobdipvdcbiuqh0jfw6mfzfybxu3khtdzr0kvyl5uvb7zd383rqjos4bglfxkj20akw3h3p5733xm2i4kpcs8k82eoxmy7jk5omxsb5q6e3ov8ph158ya541mx0kzhagd3v3pzain76dmolq4yesbhmlpr8faqb03mwxur0ryrgzff00jp'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'image [input here api field description]',
        example     : 'n5qeqgfqu66hi9sduvdks9c1tq5vilnjcuihprx1b4wuxspxkbbh38ec6108006k5fnc0iglajmtqq7le9uj9tvp44y7xyz9od4cg71nby1qou0rtj76nrasp0pm14jx73jv4m983m7bssvh0yf1fq6k7q3kmk0uz4jokh9iqla82sd9cizdqgejl7vqihpdl07marr1qoqebzhybtm8psv5tpcaja7b6tjx3ip0uz6hh5hsatk4uouey12jsjm'
    })
    image: string;
    
    @ApiProperty({
        type        : String,
        description : 'iso6392 [input here api field description]',
        example     : '1a'
    })
    iso6392: string;
    
    @ApiProperty({
        type        : String,
        description : 'iso6393 [input here api field description]',
        example     : 'a61'
    })
    iso6393: string;
    
    @ApiProperty({
        type        : String,
        description : 'ietf [input here api field description]',
        example     : 'qw3k1'
    })
    ietf: string;
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 685808
    })
    sort: number;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
}
