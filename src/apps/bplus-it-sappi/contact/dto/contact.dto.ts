import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6ce5e8ab-aee2-4b61-8747-dc876dff6912'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '2bc95a65-aad0-4b66-9718-ef4317b25191'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '0svn2z8ny92wy124pm9is4rtg5p4k2rpq0iva3yeb1kyrdjj04'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'ca953a6a-5b43-4b17-99f8-a4e13377109d'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'mccot3tjmuock6z3uhq9'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '4d8fec59-fb28-4990-af9a-9027981e1424'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : '4ipeb2ivtibpgjmgvx4fls5wshq1rohs5oblv6z3kqjeso4ehgr6jaqra8q7i3xp7hvc9fcru3rc3qy5688ewp9ze382gx4ange918rpqmaz1n7k89jmwsqwr5kc0ep34k1zjfj4fqxiflg0s6o8vnuvkbo95wqmismq777bpot0rpgaawtl3pe1nvy61wzlz38tlidlaenqzhu4v646io2inkffhktfcyhfmiu7gab5tt4whv306yis70q0h70'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ol7pg7la2lm4ssbbox3c48ae24fhryvzutllzqn04r7ouo6wft2lc05gq9yvnhy8dk2rgf1gkq8jjmfegglmqc22bkaammn1k0oyasbzmuvh90n59j8jzq6bhvnc4x8dgrktzozi18c4zb1cd5b0g1m9o2uknwrvr4taqjejm20cxhvnfbvd9qb0nas0625bc59kv8xb2rmbqyi4rnnjf4jy3u114w3p8g3vwl33bqewgvzohmgxbtitozuh4mr'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 't58004zjk4lo715z6jcfotl1hda6ueu8a9y9a7569uk0al50azc6w7fl7lf4npmlnlbn8k3ly4lbnqgtwlpsa9uu9byfj9gfq1k6coyqngomkafaysbgl5ph6mfnt5ow8dwb7vpt08hatm8ayqq14744ltoi3mupxkuil00h7rowpppfm6gz4h4hof06mpwohxto29qjntj40qxigp37tfj0glctdx040ooljfsbaruqb8sla384u4nurxjxar0'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'e21if52bouvzrms6jzijj36xbrcvc98lt6z6cow3bojb1zbdl4f8d1wkpuhrdrz9huhrusvtq37h8j99kclu0xlqjssghqa86o09794vtuo8po5bxm5u47tl'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'ju3hhvemcez6gxxmdb9sx05shovgp2l28p3z72433duy0rttfi6fpb2q69qe'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'tl39ubffuee1xng6fg7doknuaal0hb9n5blc2drpo17w7mfezkdu2py0nrkuwn9hw105h4jzri0e32yklm68ppot6807utj2cq5dly5f4af6r0opo2e3ssos2l0qet7gqo747tpep4dwo7ueulffo0p4dhecoed2r6kaxr21thii1ur1j0u3rr2mmr6fnvtyimj9fzi1tq6pryhckm164v1tph2jndtvbc28husianyairxyg544b30doabjuxm'
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
        example     : '2020-07-27 11:04:16'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 14:08:12'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-26 19:57:39'
    })
    deletedAt: string;
    
    
}
