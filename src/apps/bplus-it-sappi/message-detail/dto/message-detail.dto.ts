import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '06285d2d-62df-428b-857d-f52c1510d28d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0b9307a6-02de-466b-a2f9-f5b805430e80'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'bsugacli8zkrpl6uexbssvygotj1jucmufaoocfhk6v9r2w9oy'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'jrskxmgfupkpntfwy3vs'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '5r1o6ot0ns58ehx9dg3ffx833ttirax8kzti6s3ysmctkqd8l3jf24u34vj2'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '007725de-94ce-425a-b101-485f94f9dd59'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-08-04 03:42:24'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-04 06:16:03'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 23:50:36'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'lm4ux75rp1hksi79ale2k76udeh4kqz82b3b25hb'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'p2tu22d0eb01nlcxrrpkxqmnnd934425d0avcrupbgvwujry6g9cwpbevl5aolmxwyng0yguo7a4qj93ecne9fh6f2k88n6uk98euj7m1pma1jwkdx34ox82t976hwev2its9wzel4tn6zd37yioyd0yk09e0c02'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '6sw6sbd5gus6vyxlr34gwhrw4zpdhh308l212n8h1k0o22lj7hv43tp2ky5q8uq1nv6kh5jvlbgm4hw3cn6b6zvzywujcmd6xkyuv1g3ued06wfo0m9dvlrz08h1a05y9cdlc6q9uya2w5gri4boe4li8gxb5e5k'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'zkhsfjsjnwcu0d8c8clsjoht7aw10s1aod4sp5oaw243srkvcecnq6edsjbsgbmc9nz8sfqg1x3a0pw7i55ye4gp3opje0w3gyd2d1a0qxt5j0qsj08rs9fz1l58btickzlraebjc13wrezys8dkmf8ubmwnzioj'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'yo6oy4cwvkp6x4s8yzhn8yk3po9oqa2r3660h8b2a8ekzf2tpc8mx9ca0n6ts91r65nnhwxndcn3rbz0xrxhpxtf1hj428veydw7tzumhil6069qwsym1y9axgpj1o0eig45buo0grzs7cus90k2t8n6pkn7yw03'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Laborum omnis ut expedita. Cupiditate in molestiae ipsa tempore ducimus nobis est autem. Laborum laudantium consequatur et enim.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '5c9r0ksq964rq6tj693z1l8zqnujrbnmrwksszo41gmsywfgz66h2wazo4vcuxj54saokv4d3bk363nx2m9pfenlb42m8wehumeyzimwxp943pks7a57t5zba248i4efkf34lok8echf8lmm5icviki53d88f4uz'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-08-03 16:26:35'
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'OUTBOUND',
        enum        : ['INBOUND','OUTBOUND']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'ebx85r5re7hkeuwbmrbmmr64wvo2u5a7tc4xypimnsvka0cmcmiy2c17x50bbya5y0me0cz3dt4jey23c9dgsrf573rpdtkq6lywee3ly9x4zo6i66ww1amtcfnu32b3bbpmvf5c8m5qf19dthf51b2lxbqkrxak'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : '2qwv602zs1qkcpmga07duh4ex7rkrotxwwwt5yu6787ttq0ogz'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 438556
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 4041304982
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'wcjyd5r4nd0qtf03yfqx'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '1eur8ivnyq9ks414tz4x'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'f96zwb7hesmfxevakslo9wguvv82jjyapqtsr0nivskt4amhr6ge3invzmbyuvz677wafgnrb57thw3hyr30w7iv7plb869ck86fqbltnwrd9qcxvs9c9vxij311q19ggpz3040tqrgfcyysxl8roge566odebrv'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'xufxdm70ok8i3fvhpesdth28z2p3ofjbi7cmwv6gr2kdvst2pkg9b75o5iqj0ls0u1hqdxsuku8a4vb6oipzdo9gaay67n57nji762bkcupdwz15ab2nyb10toqow2cen4aeeqidq6pwpu8uyjo34z8b6x9v1a8e'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'd34uc7yp5aszu7i4xmmhs03m5xjeugnbl4q3vp5kvlu1ehphwhfd1xa44rizonuz3avs0thvoc5qzacn5ykfkv7n0rhr3fpnglkgc505f2t1l1j62t5ym5y3n0u7y35ikc8bykd2l09mu5hqa65qbxkrx6g7jo6v'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'cfapg7yhphgu4ubc56sbzkdlr0ks12udob9xevy0er74xxf6qarx6w3pooj8dl0pfhlgzj6mwpkvk98ece8ewa1hze66vc1rdglkhdvj851nexue9pg3r27qxvunj16fqffywtk9zmgsh6sb95p93ntlsuehhaae'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 1534589175
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 2446713204
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 3534400447
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-03 16:43:29'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-04 05:35:38'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 16:05:07'
    })
    deletedAt: string;
    
    
}
