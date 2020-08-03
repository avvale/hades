import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ed0b6194-8ada-4a64-aa77-7a2951b4e174'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '2f26bc04-02e8-4828-9249-803020406307'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'i470n2be31chbhs2hyey4473w4rbe0btxfizk9vri1mv9smm2e'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'enwcwdnz666xbhfjhr0r'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '1fcf82cf-5ceb-46fb-a227-3bcf0790a984'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : '70l60ar82daxcb9mfs8av4yoqedd6ilxlv5js7k6qgrowlxmxxha87jllxk6aun15wrohl4wtolqhbooc0w5aunr4wbtmqvxwhjqurbg2vu5dkpxqw3vx0poidct3cjtns66ggg3cdpf44n1caha9zafruof5kcw8pl655gopqhaco2cp1vocez5oyh2zp2tpc3shoj4to34cpbqvew6m80dzhqapjbrgvsnpq7691h4v9acjgxsiqezonrzkdz'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ad5nz6bbwggnx1fbt1jpihbmm2jrc295i4pi38f74egv3jhwpwrr2xo8lz4a1cah40mms66gnstr5stnxajck28qk7v1f4qzq0f6yfupv8thv92z1hd78taipgggb0plyl47xj00bvhhpev1031fejbvb68x6exj2j17fj75ssomjw94ykivdcoo1mrr389oofs63pab52vlyk4gpv65r5mnxuhgtqal00rrotqcq2soggav6ua5bk026rvcivd'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'veu4s7qwvlmoxhzv8of3abof266w2qd44eowynxw4gf320pv1xop9uz1ituoy4pgtbh1jc1dz7247ry70euss8cszvamdkozb26y1yuf63qkn3f86oiouwkpmgi9a6q1zn73iovigh0yt2s0zr0jw5rs231ycuia0pf3sibca8punt7cfkmkd6ttvtk5e31a2zph9y1a8al49mrymz6gt3x1dpcxr78elel6otlid4fe2ibnoltvac6lm04r9gc'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'khavp4qakmbshfw3eivuzdsdkhixhk2a6n0ttkk6t051hqzeuslnketj29ddek7gz5g0rmk4oi5tosuyndac0qp4cr7idnke86qebz62o1s2tmhwljw6ttk4'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '7pohgftn0g4xo8yflz6exqtynfu6e0xl38qj37yth9i5on5vkjemkh64il88'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'ykk95wddk398zjzwh3cgpo03mya4dadhg6kx9r45q69cuk2lhwnmqza7d01ulrudk7a32g0ajgulrnls7yjfu6za58mp0twmampshog8fcetzhsrhtvr07ouumh9sx9k2k86vfnqaqvwnunf0mgi08c6smxhc8z9l25ketpo60tqin7mkvyhacr2nn7eqoa8bytl7jalpsdowc0njvgpe6karhjzcvubeq52xrrzksr08wz3gyguzmp2b0ysx4k'
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : false
    })
    hasConsentEmail: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentMobile [input here api field description]',
        example     : true
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
