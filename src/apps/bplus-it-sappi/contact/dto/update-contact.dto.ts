import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c300a290-1bfe-4329-9384-b1626fcfece0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6a4c3e39-3938-46d8-be10-02ae6113b5a5'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'tu5gywe0l7z8ii4f1c5t6ee9rxxnunip2ldr4v03jnu0c5u1ug'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'eap3bn0hhnebeeze1y3r'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'b1279008-b3a0-4753-9fe2-11c1bd1b9613'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'iytu57vbz1uiof5kmoif00e39d613qigj28gq66op50bxe92vj7h47uhc3o5gojoxyvkftuacxdcmy559pfanar5fara2yn9ovhn8oz8c160nw4eg8h1lvy2irhya0vl7u464we6f262s21c9vdw7tdm1lyuewn9zas4o6utwxg8i2bv93f231l2hhnkd3rtpnoyl1r7zak86zkxyjbyyh1751reb4spps3k4kpmbf3v9lwiqcftksioon096tn'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'qyolc10jnzfycsed0o4qutzg5lp32bo7563cihfhid20i1l685zmmj9vtie22sdaxyawfinvhidos5hbo9s1ugp02s1sektxabc8cp5c0p1f7rfe93vic9584ho3wvpdpxrvrqbx3op6j5ki8mun33o5n694ujej989b6bssibx3hzt9gp029kpz99mu2kmczhc3bu13ro87g7wqqsheqkhhn6749e1tolj6ulb9mwio7fohdb9g6i1up3nlpuu'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'bkxp05vtaocli5ohrzqeka1jtn5uozg3afm9lcendily9ufvvs0luwkzlnf8v6v2jrxwvhzfs38u2l8ztd2kmpyp9rk0xm3crtbgmerjuvaw7mmqr4l5gxxwighz5a1u16fy7yxworec2mg1hs3jhv3t9j96o72c9mgk4j7apstfy22fson2vn7ews7dsaloo0gij1xaslpgeq7gzvyt6pl3t0jkpvvgmftswqiy8lto6fkijj3ljg4wz8y2ul6'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'xgmz61jmdqxiyf330cmxd747008zum82w5ueuqftxdysbx7ksilseeycazlbxwjb0ag2biz10nugtwis9o5ccypdmegsn0ml2dsu14pmwlu3u39gf5vpawr6'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'b7zv1yjf4oqrvplmpz9al0jfochmjc0ytz6m1hiu4s1rlonhltw5wmua4foe'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'adzxd528my05viwvx3wc1pj17uzc4zeeb7w5blp85ubhjc5pqyaxu8esd9kzblbrun8oxwk1lq6pxwb51bmp6d1ubhqv0qf4kfo0wp8vzuz8a6mrajiwi5woy9oxr397g0xk6yu8bfi5wbyqj09794ns3s5dpeahyk8lxr4mm32fiza1o3y60icru6uw87muivop155xosalpagwyiyrvh7z2etscl40yvclm13d2fnkxg3fq5q8hg83w5k44mi'
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
        example     : false
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
