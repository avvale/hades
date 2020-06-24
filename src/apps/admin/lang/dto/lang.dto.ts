import { ApiProperty } from '@nestjs/swagger';

export class LangDto 
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
        example     : 'iz5bbwz1818hfkgahjkq1xtn7nkl6lgiervoyw7zwc13jw34apnrpzlbzp6cb0untauxi8ggjpt0x4149zhotpy7a88ybp3q8kvocixzfolx35yp1kkn32wu1h91w3tnxyiv4wvpgzxhy7b2ph13i8zqmqvy17y5hsnrx2x9og547vgmg75z1iwp6zc37ggsa9kvb7jtoxbqdtp2so44hnd8kmx0boehe0lu2oubspksojtoijjgwdsldpkyxiw'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'image [input here api field description]',
        example     : 'xof7e38oyrzepud2mxrgbr249fk4mfxdxak7im349j0lbc34l41b7uu9xvyv1lboqmkrt6nl8lkb3tf9gxoovopzhs8oxlbno8rkjtu49dgdjhdbiazx3no9l79smgf3q9hs1hzmlq345y4oz8u3o3p2ofvuptvgyn9a87tpweshhn768wm7m0jbbqhb8wrar19i6k9o0hu4fdsyzaapbxrktc0t57zbbdvoeiv5wciisraviqtxtanc2yiz8z8'
    })
    image: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iso6392 [input here api field description]',
        example     : '3y'
    })
    iso6392: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iso6393 [input here api field description]',
        example     : '3a5'
    })
    iso6393: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'ietf [input here api field description]',
        example     : 'miqwg'
    })
    ietf: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 257075
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-06-24 17:02:42'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-06-24 09:47:10'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-06-24 15:05:06'
    })
    deletedAt: string;
    
    
}
