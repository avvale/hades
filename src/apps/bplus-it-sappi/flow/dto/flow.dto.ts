import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3203f3b4-564b-4f6f-81bb-53e7bb4f6940'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'd8lxyuy56cxpoed08nfocvxrqboasztdnzur8behxwnhdc8b2h'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7f1f5605-aecf-4cb7-8317-bbb853061653'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'aryks8cma9r4ch50vesf'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'g4i9o4snvxsiko2612zoejp71mv3ebxo4tznxwtwwes5w6sg1ryhnvqv4ah6'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '9l10obpdul3p8r6arzw1gc3m5zmigphs1adxxytybeaenfustnmusbmqwnp1bk3j0bha3xwo0btipiopa2sopn63cql8l85fx2gm8qmf6hkg1ouqz6kaoccuwsah5xbc7yaglqw4qk9o6biksux089zuef2k1vxr'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'uflkohbvf9ssenb0596zqqt0cpne1l9rv4ox30hetye5qkr6mftcqjseyzl483kwp50rcf9bhbgs3haevr46j2kv757yai8yf1vq4m576lv178u2ctu14n5qz3yzyf60wqipakrlq0e5vuoc1j261mtvcgbcbuzk'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'ygaqnpcrtcldm7h84nl0opqtbz5hj7pyw3sko0dvpf61zt79ewil83xhaf2ig7wj53dvuv61s19isgoosl72ffrjqaalyznvbfoopj6molkwdb7nl4c4pf8ndivec2b9a4fycxqoya6a6ve0kkdihtsjh2rfkid9'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '9ghfr7xe36npogqag4h9g4hhe4bhdbw7c1lsl3kvrz1853i93csg7f1w9ini8qhdioh7mdvao0grvcxs3otorj8j1i84uktd5u9k3tjn8e8vbnb0gt8n9rkf4wijp36h2tm9in0tawezpcx32djk738xl4teqsvh'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'cyg73j10z6ee3jm9becsosm047iwj61z8db7hrkzff2o04yfgyvuygau4ce5sae37ntoc0c3runldtlcm42x3j74qk3j3uu75cu8g1ndetogpad0d52lh67s5fdx6ewaed3uc0g6uiaxpeynw6qptwchylnmqe0d'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'bvh90xewjyrt1tys0bor'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '2odd4i8bhrg0oooy94bt'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-23 07:27:11'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'akqt5x993dsnjqf0jzjkpjpkum41x0tio7ok9x6izjth9f2yn4eflacub8z6p2wy3fl17au0grahz6r0sof6aykbv2r3bwcdcpqfzshb50c22ky8djc5gfigpcr171w1wkd1tu24h72ep0f7acl4f0ao4fh70z7lfo924z1wf2w0ykv5gitdx76mjyf63r54jtcx66xx7z2z25nsmg70mucmob86jxp4v7j9hjt5igkvqu2bcfnlvri62o8t6xz'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '1zv06qpxtoxfgkffqixfhcecn1gvf2llgv2jxv9fqh6190r1murmon84w5hxc2sv967vcitw2jsryrmg6glcuhu8q3efep6kk9c0txrsd1tjbchk3fsg40mtv2scbdej39vtqpcq0dqemn85cryt1b7kn4t6hap810ebe8q88raszlfrkm80877viqrn4abr2hq3q6l5m39qn4qqkt359akrw32ukrr9pkz6olv4rgllnkdvarvd3g537dtpprc'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'z6aed7qa23zzmkykohkcnyyeax3umz88rkx9zx2ku33g0bi670xewmkabrg2'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : false
    })
    isCritical: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : true
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '08a26543-4686-4000-9f19-5f6f30c920d7'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-22 18:32:09'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-22 20:00:20'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-23 11:14:28'
    })
    deletedAt: string;
    
    
}
