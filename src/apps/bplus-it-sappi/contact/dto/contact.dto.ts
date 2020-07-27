import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6102cd62-f5ae-40db-8796-60d4c2bd4af0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '470e0e41-4038-4d35-816b-64cbf3e28219'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'lsxsf6kel5vzgr73v5spl7ertuwtv1yiybzxh8pand4wc87r7k'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'c4c3516a-2055-4add-a17f-6d42aee3abdc'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'benc0r672b71e0erxidx'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'v6u5ckrauyo1az9runy3swood3qki3r3eo1inbn2c8btc757o9rx5toscn5vvckqjr1dtm5rgkek7hzf24h4i272v8h5kdcoq6j7se6i4mqq06pglzs4lc6hre3w72guzcem14nfj6gtejru4n86qxwlcwo9e2whjkwxo3adsba54fj03z55yfd7heprsmvcub1sjkbncybbsh5gdxzp8wqnjwqein2fu6ek7jzb5dpwoyvkgsykp5bnv5nrcfv'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'car8qs24rpk84bnmo3bkc85rs008t6dwy1blli5bx3qpie6geczbij2o9xt0pzj6e40x675ywznmvjvjn00z5ecpm67h143e46uxbtg4yf00uc9xehu8j12yi181z9dju6ijg1u79ck1mvts6m2bd4t6vkfjm0bjw959v2n4vvzpt3jhct67ayz0ummdvnf2c11mpfthtfc8w3e2yz2o1u7qyddr2fojorch6whpojj3e15sk0rcb5ph6yll9zs'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'vkn2ygopucsvyl6rszzebsi57f1jlpphtb3xdrbc3vjip6r6buik9q7mtsmswobjk7ada125pwpw5utru4hijx98kwdtpygr7w4x235sdjilcrega7gra8f1m5f62tqsa1yhsk2ojpdcbpzvn9el65vb5zwnakud6g86tc0ozehppozxmlzrdrtwbjwe2r5zcf2aiztfqwj2ggl7f4usmmhf5khnczaifzl01ra6oex3xq5k3c3b9ir6mtjh3am'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'bpuwc0fjmuxf11resv87iewosicbua13nq08wrgxot19w9nc55y8hp08lpui19oakwa6uzrakmbom50nr9qaj8gcrzweq7j2b3u004tesow5liptffw9q82z'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'vruwzwtlb6obrgaqnlxa9lqcsw3nhycd36buzq4qaxg60u1zgpee1n911xgu'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'dgdbsr7u4piv6p1c68o2iqjr769faeg5q7922os4p9xaaibskvxuki4s8skbd2yz59kd265afzokklbyj9o6ovqxuh53uo8z6qw06q7g4cb5fhkfuqysd3qadgsqg4pn8brs78tbav5iqjj8bz3dypowp5cb77e3tfllmkxrx7jn0ufeknbka2lnq9m4zwcic9569kc55gjv2vo2e25e3l8b6oywpays46w8fygfx8jxba8wp28m19eh2pu6opc'
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
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 09:15:32'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 15:49:13'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-26 17:05:23'
    })
    deletedAt: string;
    
    
}
