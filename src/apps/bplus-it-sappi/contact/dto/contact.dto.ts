import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'qe79onxk4p3rwieotupyf5b6li9mkttsm3psl27tjtxthihsi6'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1a53f617-42a6-472b-90bd-1510f149f1d6'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'e6swcnv21za2ipjnrpou'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'lx44wc3n6kwtbj3yg6vp7v8ik1s9kf8qyv022zc3o1ptr678ssmhcn79iv0yfdisaepawzc1xen7ev0wmqfvbzqmbv156oy6y35wspmjqm680aqnriaguptl4nd9ceuitb9l00w3m2jvj0phdsn7bjt8odeefmn6swxz2tdgvm15g4v2o85xb2chwwco7t714ltip3fwib4w2toadvczjqedfdvnvlql1q90fx8e5bd2equpgr3pkbjy7oylcdc'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ujr0z035c4jrjk1wzirimb6f81mxcpltzlq7gr1k3lfjdyzjza6epdbk29xejwkgralowinkwh6k351k6nxiyjga7rqj2214hvksucqwlhy7vc3xlt976qiebo3l2pteiujb938h2z6cz9i6g6ehkec4obzhhlwmbigvt4081gfxa6aczpac4qnwny3bigx88wj80uz0wpnstjao8idkja6l9fix1nddzhzw0cc46hzt7a9zoe4h5cmjwymypc8'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '6bpv898xmmb2qz46n2sfibuzfxgliv3guvupsk21bnogghom1x67avhlwbe1icbx3xdoiftpme73w2zp4vqn3vvilseeoo8i9e2wn6jl0gu9n74wxam5fhbv3o55mkhncsqzh8pgo0tqy4jbgz44q3kcj0oamov782pkpmmt4g0x6goaw3z4m0euytx2y6mzqam2hiktbq92ol4hr36qf6u7713xr9pkw4lda00a7irm816by0ipjq5pwj6o1hg'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '9ci429u3jmmvj45sjj7alvnu2kef1hs3ipvxz7bnx0imc8juz8eayxaqkrh3op8eg5er9spfajkdhvd70u570klt3zscjjlwqovwuwtnhav7pk1sw46fyh5d'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '62lrfzv91itv73rw63sx5dgr36641bnwd4ygmtes5ao3wmxkpi5t45nw4e9r'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : '1j3c2z7hew62372ypzh4fxegoy15agxlvsygjqdggdjky0hudwu0ocea4qt9q8oncjh713jemcxvee0txlqraer56c8a2i5z84ljb9oen0j7xdg5v07ezymcn945gx5ln1gd4m6vm2e0l4uih9ga9fezr07esxsu7qd0qkf6ed1fo88kdc96smydtws217zjz2538wq7u3eaanfxrxxnn8j4eokoipzty459q2w7hyjh40sbqszudrmxh9h2lsr'
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
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-30 17:09:54'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-30 21:44:25'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-31 00:51:34'
    })
    deletedAt: string;
    
    
}
