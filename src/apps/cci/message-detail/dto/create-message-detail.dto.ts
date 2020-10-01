import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '27f9127f-0d91-4ad1-a460-ff464071e590'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e1ded4ef-be0a-4e87-a29d-8f80a52c39b6'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '3plhi33k47kfofvwnoji4l3lz5i5b7z8q080ostrgxsbptcdap'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '48f27216-3426-4d46-a424-6e1ef2cd40b9'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'lsgdkys1lg7le7qrug1u'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '2hecfa8bsmb9u8k0b0ivc16k3a2qbq78mve078mg5bl7q2o0qo5ugieneys2'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '6b38dfd5-6282-4595-ba41-f59847f71c75'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-09-20 00:08:44'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-09-20 14:18:15'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-09-20 03:55:37'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'qeqep1en89b50ecgki3a8j1xkegl43ugubhgsezn'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'nvbh6clc00ktwhu2dr87idam3ndxaxli3wvume6jdlu64m8f7pjsjm2pfmnib4talqkzf8p5f1j3zc5xicaewa3w40ojmnvznxy9w0l3t8klees7kiok9t5di0af77eskn570vkfkzpedqql5n6yzrx3gatrr4b4'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'am9kbv64e3tea9qv5g0pp3kx71h5fx0nlfe2jzhrjrwe1y9fnw0o3jnj5x7c4z085u241dzgttfmxyv55gs6ygwt8c06a20y9l4nf5722hvztpzk0qpj6drd0ee6d7v56on6dk1ivsr3e0gi532rcqzutoij6kz1'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '7p93jleb2dho7frjyxokn0c6sdn9azepaj9i8msjvzff05658fn6dzp77y6ku5c9wlvbxv39jgqhb1fyp8rh8e29bk31hcjs2kv6ljip89ah9sjeg1eibvoxhbmvtqr1fcxp5r6lvkzjhg37vd34ke010468wrip'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : '7zxu02kyu7nx2p6sjyu7xna4kdhjqbq73bzjo07o3i0tzdftskmm6kwxitthdrkyam6cqqkgm382n5edxr196v4x50lvvuqvruyhilz8t1wns66pmz0n821veen5g6k4mlteq5egywi9erappxd56fmzhl3svz0q'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'kklucbc6340lt2aiyahyp00u5qdum2i9n0ettfchnxc4mnv8v4f63iq25d38evg4r4a45sgunosmtl4ur3cqq5ext01ahrmtwsu9zznwdiaxaczxxzrcboowd60b6v9iwiuo9otekdef70ly18eg78c8zeoe1dv0'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'lbr0oz44pqh54qq84w2s5mf17yo7spfs9eq7rypj6hn362u1vy548d9gpremp1bcqkkmuzs8oz0izhfp1wksn5yunvpaekjax5jppk39jfd2g1sthd25erlx1yxoq4gzne4qp2s9f1mcl4wi402ibusfr93mw0f9'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'SUCCESS',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'refMessageId [input here api field description]',
        example     : 'de1s5v33w2uertcn8sl3lw3469o9hi9of0hjzvpf8vj1898tj9h3i8u3w88svyenb0cxwg8nt6uywwudnbip2k38n4ho04flp33imndmo9c8xqlbyksv4iyxr0d17gnno2p4fctafrhmsh4oqbfncb88fsyroodk'
    })
    refMessageId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Temporibus corrupti autem odio ex. Dignissimos ad ea id. Ut est molestiae ratione eum ipsa. Hic ab non et sequi tempore aut. Porro provident similique dolor fuga velit et.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'el3m020ym5dwq7e16iheuhm40bqnkutihzwuwhqj50g5kqoazlz4t3kafp72n7rxx591h6rl4s4c4b7qbts0gufvtqbu504ncuvn8ml8c39e0hek1sogjz43lrqkr4t45651n51qmju03k0sr7qoa6b0nx5sawks'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-09-19 19:04:01'
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'INBOUND',
        enum        : ['INBOUND','OUTBOUND']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'b1gss97mbiehmionrevf9g3d9go4toaqr60946ep0b6wyojlug1c5s2t03ppewym78pfdjquggi9ldk9uea3leghku5lh7lai5xvz2vvflhfe9et3ilywgemi4dihpehwwligok1c58fi5szlhnbzxxq6612z6ob'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'h534y2grhijojevsez4cknp4g0f24uodspfeep3sp1z68wr8m7'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 569440
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 4980570340
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'm5fggv97ma28hohdemu8'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'xcavp62va6364dvkqx9f'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '4ofaynirkzi2do0iqx0h91fubpd80qy69v9czdar9egh2n5074wmvdj6bfgfgsvt0q6zyu8fojl42as4wvt92k2e547vlhf6hrc59hmzj8jk8jyfsxkjndcim8km3nhw1r425ur8am6q4857po8ntjzjzvtf5nt8'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : '2steaimh5acpcqossefqynnofns2f35ghe2vrenizv4cc9t6hq2wrgx7w0fjsapp2t1xaizxae4u2nptzs9qh5b1iq3lmg8mv3zjckrjh3al62jnz7rj1exqhnlxnnlwmgmaoe43n24e0z3hyum9oioms2yx3ryp'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'm0sqqja6iobnqj3utxarhtbci2kwwkiwggxby0yakquqvh2cn1qaoy9u2ngmokz8uxm4syut40zgii51dzn49u0irtxoc1cn3vwlhhsuhz3qycbn7d14v8lelyecjczb4x5owy1dotdsztndvpqr5dyr6vwle8u7'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'ixijzr95dj0ajygiov1b4eh0e0kirw842fdq8u3q4f9vfql2yx4zz9yrp1bfyriu4sns4r6nzhheibojufg730m9vmzm52msmf88abcr2cqg1ssc170kqqzqq40la2m0biz83pjfpsa70eta2sv53mala00dkqa9'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 2482992151
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 4330223226
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 5379964742
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 6217912245
    })
    numberMax: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 7692646151
    })
    numberDays: number;
    
    
}
