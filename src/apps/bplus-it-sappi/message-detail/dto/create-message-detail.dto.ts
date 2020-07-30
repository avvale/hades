import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8a09ed00-b5a1-4b6b-bde8-24a33db85b35'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b526d247-1650-4b81-b503-12d4fc3b323c'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'r5qqihhwjn2owstx1v3k39ouwrecl5bf3pb4ugm3gnueybl9kk'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5383beef-9793-4b37-8b36-a0d1e4f1bedb'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '5sr4ml10cnsl6brryemj'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'z96aacjeho7i8dmamq0d0keywoij2y93fq27xlxrkxos2fhro5sc7y1td1he'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '8b3851f0-069b-490d-abe9-e46bc46c3dc1'
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
        example     : '2020-07-29 21:25:51'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 18:40:06'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 14:19:29'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'rqbu8f3a90mzuhv3e13yfoak7n9mtrjyurtfrr0w'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'y6rzng96dtd4ei2uaqr4sh9m0p7nhwt1zx4hayc7tswh6d755nv77gsejhlr1rj8mfxvwkkp3h7wfv467xx4v7fl604yf7m8t9fgj8uewe23nm2rf2ov1uarke4i9htw3pt889riokmtzoid6dujk1l1z1tl2le2'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '1te57yhjken8fatsyb05scw9pwahuhxoci8nf8buj2bjbm7x7zohswp0t51vfetb7an5t26ss8f8ljmql2nnhj6ugyry7skr9knoxuoct3zd5khjouhx11gizhpmwieoanzvwk5rr9ckfd0zbjms6v49o2ukqg9q'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '0gvj31hc39jwygazmqtpsuc5ftylx51i9uwgnxxykpag1a3k0u3bm2fk56k927oqzrna81wkp1w1msfvybt4rcw0e9gj92cwykikx76ldudb0kxb19uqf1azg5gazwc2rmsoi4upjb936q6nwb0w2ydysa4wcywv'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'h9ua1okt4z0kqwxd1d7ln4ozeamfz0atrdeq93pa9g1p85eqt1u2hyis0olqi6keyzryv64iect015n9ccpkgztzvk4z5mpu1mnh3q6clsvc30rq2g8m2lhuhporht3gmvpd2vr8uq13cf0ewmbymg0hwzq5fjnj'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'TO_BE_DELIVERED',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Nihil adipisci doloremque. Sapiente voluptatem dignissimos qui ut. Ut animi sed possimus dicta perferendis voluptatum eum. Voluptatem delectus sit in dolores porro id quos in. Magnam quas officia maiores deleniti. Nemo et voluptatum aut doloribus est eos neque eos.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '7h2cztba7k7s944vt5ydhohhujr8b9xcbpjxu2u4vfc4pgk0qr1ei36mxtsqq8vvebkze931e92p3vwan4we2vp47ryhgh94qw7idvu2knvv14i7ynbzaza1xgoe0hs9h85lwy2fs0fva82690j8qcbkt8yigjo1'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-30 01:25:20'
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
        example     : 'p828mmn2j6fo068ueqg6nvdjkyja3kdid2if1qy5ssaqtledahow4jayg5rqsz7lrcseiex070g4wwj14vqwq4zj4q3wl3kkufq776a4gmf7ffofzxnrrjn8h4gs2e0xy9vjwv1c7tdtunvsvwdv4a3jp67ebr5f'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : '9djbvklcpoah3ld4aat5ov91slwxlufaafq3hidsgqjiabe3jn'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 708581
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 3804437438
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : '7cisxqp5145fxyw9bbvw'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'hu0kc2je1dfd6ccxg4uz'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'y64gf6ieooqn3ndyl42lx2myft9anafhjoy6tq541cx0evh90k7ffs0p0ankyqwov6mak3tka28au7typeb16v4cfgrf7xc5j8lfw25o44fr4fdvb8jiyaev5f9yvhnztma87dsen7ip6lg9j7njwjdbtfsauogz'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'drjpug73w9cihffe2lywk95m8pxpkaxtyelnzfbop447owpj11lutccg8m3vpcgf340tbpyke6ront45se2la968fnttygp1wpgb6ypyb8evvmjjy1q65gh2fk8ykgh5bp2znzz6nq61qajfwyfz9bn41be5h3x7'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'mfmtv4qkez7vhssnl1ho2ortczsbvhyqgxic0z7qzf3dkxcvzxuu0l2kb1sjb4x3zojf1j2r2mav66xz4eoon245swh1zak1xt35acit59znf3y2jn2243hj46vlemapit945wwtp3zoo2bejrkemknm9ycksnua'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '074koivcljamwyhq9sqy64e54u970qwwnjq592p505tn5h3w025m0u7u6ukk8ta893wvqlul2ywntkqavhhnkt8uy5m6aw71q0726izoko3bnn16cwg32lwpp9a72529xpldbnxvmv4y85tc0a4jqjfphdj0721g'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 9520583102
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 6616403690
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 1168137395
    })
    timesFailed: number;
    
    
}
