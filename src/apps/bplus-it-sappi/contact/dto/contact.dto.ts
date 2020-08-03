import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
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
        example     : 'heaibvt4wqewpnf5yn84d9w8qin4yeyjjvznp63l5ufyyyik9c'
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
        example     : 'sfoho17bwl0p86ncs5vt'
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
        example     : 'dfiw8j54izp9jiv5o3r2anu9ibdztlivpim01wce8af2kd6msjjyr4yxor115cx96xp29de9988featuklbwslvq7hnk5qgvxk07btxx7ufptdd3a97mgkf1farw0eg74ufhvu10oytamina77oircnpdrplv23s7se7njt95svub9khqvou8kzlon6al4srrk3k4oveut0uj9dnnedez6hancdfowanuk6qbzes3trhommahgucolbj0i27e7p'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'lclat4ndx97kt8bhi83nk2nxh924egd9rmsmoxnybhudtqwie8ca7pk4rk5d9kmlmuhd3cqdktit5o90hmj9rtj0n00mpu50u84fqsrxjhmmj43m4f1o75ar0en9yssr8oe6160a5y8pm8li28vrg5g8130l8tzk89uaohkihkipsg8dmx5qntmtr7c5bole45bzr161styifmut8cnajhbtw05ptya43u7ufdj063en4dme1o96z67jph6517m'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '1u5d6o03gwaap5q8lco2ho57y54af29tgopb1qgh0xijjc07ybbrwqaqi9fd8ynz1179aluc2s0vqgydfrf4t1tayyn5zchy5tkslvx088p2l7ne11ph80v7iwgivxl4unk1ctzs47kh743cjsboeej82hfbbj2d2an0jvw7voup6z14fcsj5xxm8lg3qicgc7lwvwox1toc3ivx1xewu9rxsaelaysykufqhftecc3sjvb1fanzogwc9gh2jqd'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '47cawgf75ly420u4hlblowslz50gy839pbxne44qivvjxufzn6plka67c0tovk00s114mkq8ad7nmvogf7w0m1zlnaj7v1plggza7br3bp44liax3ie38ffi'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'c2tu4v9g9cpyrikierqj676kqmn2xxgb4szxk04d3x8c6y0k9j0ft0avgxeh'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : '2yfr2gq04auo4jex93hwm7k5n57z4zivpqm3p7t1mhkdk1l3karmxr4n4oc92vtooxdkqy5y4f51rno294t860kgjxsiaqf79q2bmnf7rpqhja60zugb3h4avvt869bk3bw3wjgm2ldwa11h3qze16fq9c0xtnajfwmec1aue760ugn2jp0za3fsz4qxdwj32lg99pw5bxl0urok8c8o07uyjln771glxy33i1339vp8a9vzyior9ugjyrzvi3n'
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : true
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
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-03 05:00:56'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 14:34:51'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 14:19:32'
    })
    deletedAt: string;
    
    
}
