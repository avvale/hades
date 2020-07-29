import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a56e39ce-0050-4fa0-9356-a26cfcbbca59'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '5rujnv5roek4mptqa5vqqm5h5ip7bg6stnmmjlfoprqw8jcsw5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a05fc733-12cc-47f8-a5d4-734e5a6bca62'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'xamc9jg8ij8cus84uce1'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'y3tabpmfu68bdhym5kd7g9dcan307tkrkr29j3ojoh75rrmbdl5c80noxd6b'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '0e297b28-3cac-4657-b8f3-cdf8bd827157'
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
        example     : '2020-07-28 18:28:59'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 14:31:33'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 02:58:55'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'tarigmo09kbucf2syw9pvhl5ljd6d8biro0nbnn5'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'esxdj1cb3612lgioekm1hevmksazf2x5r2qsggddioveu7iryzz7t45qicmy5dwwl7iz57u17lti3bt0kcxatem7r03zg1u7udaaddw9u1y6z4f0vt83zqw5cy8lua1nicoi2bf1evzjphfamznmvjungw20betu'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '2w23o87a04i5vhr6nbps4rmusa9xgtx28do93yx59e2vjzr7t7vc7b6w39fc1b5o8otkdrpvchlv5lrnmwnefn98edq0wzgkqsvxgz6j4kib94m4mr6pzblaw5bt2q3jbqwepwxyd3f7zf6niu5bn4s1eyh5g1nb'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '0q3v2op9lejtoej81mtv79l96b0wqdzictd92m470nmp6r0ptjpvwqumc3dmdu8wl0agfr20iq2apq3zzjgww92731hc1dkuw9hsse94d32gv6dseibvs0zczw3c78yhmtbfd6gw4d05r8x0ke587x9wf0cgw3gk'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'slrs7fqoxl0dvunq5ins4528t388nkf7j391kq3zdy75yavu972i2n1k3i38hai34p592sxy51ka19oll70y1osvy4ofgkif6qzzwfzveva6mvh7f7tmxymlp132khul72wl74p7x7om5h3ktrgxrd7c70vp1z7u'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Consequatur consequuntur debitis voluptatem rem. Velit officia numquam atque reprehenderit aut alias est. Ipsum sunt dolor. Blanditiis earum quaerat velit sequi beatae illo aliquam. Eos enim ab ut voluptatem quis voluptas reiciendis placeat ea. Autem est quia aut a eos quis esse.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'tmfes5ai3hpqpins82qhz7y25p1z3lub0b1547pr3s8pj2ft47xwqfvb7z1bspz6yiqlfsoipje78pjhkxqdssxjhhq6b6yi7pf2uztjhs69bwgwm9ix8o3rnssakc8ui6x0746xdm4nvgqjcqhk0suys4u3p3mt'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-28 19:03:56'
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
        example     : 'lba08b4ahw56clla8vk5l2mrcdi12duhnotpsk9rtgsa435artsetpnvmqyg7hwstiqzn9qico2nc0aapyl0fpsl34lq5heqruru24aumacap3rqswdi4pray1tp1prvdznzkjzz59bqzglad70gou5qu0bsr62b'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : '5ac5yk1yynbkdxe5idw83xwizs4oxzun0jdqp8042cfy9b75cu'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 141023
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 4393044191
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'z3lnl2nl19gr1luig8j5'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'prvkzrqgsntfbxhjz3do'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'ns18u1z8wsroic0465s6gcgbwz989sdocfut4krrx7ert6drrvr9plpw8qrqma1xuszrj1t1ms7vmgvz30p3nzuf5e20c43emzayty9s1bo3sshv2m5p0lsyszh3oe7tltnnxkixaf0ky03ofapfas206m7h19za'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'smonz8w5gqru7f7o2ccgfeo3w5ricq9y9hpbpxe5h0ip4ngbba1u73a04qr7b2bb782v3llmhegqp3aix2ihs97xcryiipkzkw4j42fqtirhulxs0cy3dic24pfv74107kqsdckvx7z1wgoya4a3y3p2r5yzw2qy'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'kdeqgtakd20irr3zdq8nfteudalsi98p2rhqaip8eqxgq8ajecyk3ylvdzbt7cbi4dqcxbzbus15cj9fmri4mvjy92nuge91g9f4tw2mbw7qjr2rogu7e4skdx1orkkvao0aqwikib16txy41ycvuihkj5cmfs7f'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'jpw5j8p1pcs7a6s4xcxpkqypmlouaw6xkhj3qmql8urptebic2jtitye7fgmph6i5odvfy8rvjwlq7wo8psi0squ7gjw4ylealwj932t9obeursusp9j8i4uj319zr5ypklk509fmh9nugc343hxvv1gztrkyo89'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 9382660113
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 1919087437
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 5025052156
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 19:32:25'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 17:51:38'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 07:47:06'
    })
    deletedAt: string;
    
    
}
