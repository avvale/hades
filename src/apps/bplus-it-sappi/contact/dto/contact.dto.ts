import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3a00e70b-4b20-4013-afd7-abb712d8dfc9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'fst1pcxvob8ib83n8gp3oyh8qnli9n29ycld4egvuspxju6ro6'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5b8434f9-32e4-4756-ba37-051cd033ffd7'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'urdp0htbl8nzc4wxu867'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'ec22b292-1be8-4b46-a044-dc1ed4370eca'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'eih27ka1l4ka27gn6v1l64dbfrwdnzsqwzk42f7burrv8mj39m1p0t1rg16xnxvr249cced2mj2dgpvgqqqibwxg7wk7odzu1mrardpb3l6vbip2khgs6jso16pxwgnmof1xsncv7h7hejqkutsryktydel92tqxyzrfbxzszzg5toor2dbtw71ouahhe08noksetlh7texpcv4tzq7klh3au87zbytmvjwk1lmoh4ms1ua1wr37kv9duvhsd7t'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'i1akxlasb5tj1jtbvj5qmht1d2uhnvby8cooi3h5za6irq8967s0e16lftw8fy32g7mwxwfrydykfak65yhhap074nnhgy1m8xa8zl6gjqn0dpkrkqutep9ptaj21m2ebfb2x52gpi0gnbctl3t5tiwpdygtp438i9fkzdkemj5ncw7yx390j3nww325j5uvv5eu0uaq89d8tlh6knalz4r1t8h7q9mvesx8lf0lo8foen3ypstkyldtov6ry5c'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'mx2qrmb2dflrmayozs7ncmpveynv2ai6fz0uuww6f21iim9itkasmbbxhhudy5rzfxev7dboji9c20rpll02ls2x7298eat3yocnev03ywz8w5s4f79pp9cgc1u267b5x3fwh0x038awwiodqg0tcdkerqera275ykc3hcx3e5rewp4ofuk187ah08mtbs3xvw24sor4m0mkxya5nhbkof87eqmoeb9ul56vpkj605svymfeutl8ertmiru7tug'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '6ymgauawlgdj7g42j98n43uoc19bs8wtbbpkmdemz6x1hatf6qpcolrwk7oaasq5yuw1f4l5m9kfk1pu25qtmz4tv2kk0ys4fw3bsmpjum71cx5nzasff4d1'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '4nupvld6nhskap15aeh5hdadmyj9lkeroz5jfyiwp66by0jpk49zrkb25nis'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'ajy02o1tmf4kh72h0ow7wrcv4jt3w1yldgqc456xytehdnmtdikqdh701lacbz6i65zxap3u0a2yg7vbctp046dtu4p8jc8ed1hf1qm0enut38305rirjt92w7ntejgb4e0holngxzrrphrx2xkm6tumnmbpbhll5bo8dwh0vqvldkc6nnovib9x00lxklsmfdmoa7lsjsksv2tlj2mk2hb0w4hqcrbfzmolcvkod50kp4z6rsquzdpjtspk91n'
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
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 05:05:15'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 19:45:03'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 13:27:34'
    })
    deletedAt: string;
    
    
}
