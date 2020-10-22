import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'zujot87t37fgz49qsd6q0qpa37c5r4nthn1umzt3k5xctqrhvb'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '4za73mfhp1491xijxcmi'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'ygtew4zxlehydna5ak0zpiu7o9qkjcggvl3n1t2iloq5hcs3m9fd4zwuz59z'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '54c2dbaf-1197-47a0-9223-8e927dc547d9'
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
        example     : '2020-10-22 17:26:07'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-10-22 16:52:10'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-10-22 22:56:23'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '2fkoae1l2zpsjrna3thph3h8t2ddn9dsaaf0qxdp'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '8ljmx3l8kz5llb4wjnug1o6kx5f4f86la0al59h8nkrfwh1ci7mwy0d2vrfx9h0ogbx7a15xi0ff4eiwy85ibgasd8zghylpgrju1cvctyssdnldjkcqjm7mw0zdsptjkk1plhtgx8fm2z8d3qnrpxo7q8spemye'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'jhif75si6qsrrw2uqj3vfgjtqykj3mytbg8d6dzem8nzzyl1ty98dxo63k5t6pyhleihayu1faffz937sgf7w3uszyty70u0fxekr9kg6535c27oy4jicjgbvxc9qophqn2u2kbo81ophoynrdk6udb3shpf0dpz'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'uqz9gq65mzn772mhva36su58ra487832jnexa9hur9j892v97gmji1h1nfj07m218zcid7qlqozllbx2kkpx8uwlqmtexabyf99z3h7jw967bqdub6o8ajc47k3p813bjkj36cadc2cn0t2w6msl2kkoufta8c86'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'wjc6yd89swth140dxz69zxgm5xgcbureryb640xiuogmyrrcccbm7xv3oueqagy7xamxpcjxurfqlsu9mxux00mv28x4jxy1bhegmzuobmls7zalp0zpzef9yibakpztxqhigao1m9plu6v6aj47sc641if8kygt'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'r9710l1s86vvkax6a7e3l6mpu59mwq6mfz1090dpb2fiqvzh7m8ua8myjnyj62sful5pd09u9qnhe9vqn39ss508wxy60mv0rjhjbxil7mv5tt5m5dav2d66d02copdgv25jrjqq9kh2i79ap888juwpj8s8ljpu'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'x7gh4195h1c62ryojz5rzd4su5vezeygxdkg5nfl0e88jd6v4ha4ie8zfes6bchdiycsnne9eiyodpfsy3xz99y95e228zi1u3h70yr4ti08mls268hqrha31v8t8xz2c3lzsm0ga9zfm8z01om0gubfa4oaguos'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'WAITING',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'refMessageId [input here api field description]',
        example     : '4ws1recdh4kwe65c65mogj02m827x12gl9xiazskwn0bimatqa3vqwn6o8ftjqlo2vb924eprmeykqmuf8c4d7gq59nx8j8lrc5502jbe2h1ml133j6l0bdl3zmviga622ncl39t28olo8v1aq68a7byt9708krw'
    })
    refMessageId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'In non illum consequatur exercitationem eaque dolore. Autem quidem qui sint voluptate maxime quae est. Esse maiores est eum voluptates.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'ua2k9c7teys25cats3c2f1f8lxbehxxle91dut1vn1anlkij8ktvaorsgw616vuwrcz38zyzd1wap6cd7ttfm0m91n6v9sdjcusudzahxf2vq1es2lcnvhzeb7jukwr8ob2bz899asly5v7s5ol0yc4djvonu69h'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-10-22 06:11:39'
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
        example     : 'spi24oihgt8taskid1mqopmoei7fmxfgu5w48x06esrqgbm7msx0npacxuoyve0bks2u2qr0rrn78b7mex1i2ylwkaygliyx5ckzxpuym0z1z7gehowij1wl5kephsaoz0m2x4oqqcpqbl1r7n29q06yg5gfmwjv'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : '83886818b2f68r8yhi525lpgd3h7soq94b25gw1qz2kt8xtncs'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 815973
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 6282563688
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : '33jiybjgocu04rkpna6p'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '242ij6qldoaq1vme2i0j'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '2doowlqp5g2oxqbf8uov02dus41v67f2fqhs4kw294x9d7e1js68ha9y140drsa4jgwomcgtbhbexfsiktez2m2rbsd1fxczi8iugfyy8wpuy9g5qpjfjv64gic7z3b3c12q9au2xtac8t0gtb5muz9khuwbw4ds'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'bzj8m6u2mpt5bj72x6z0tnvgyxefb774vof2tnhz3d3eelbyxssg6kguhdupfddzo0llwdffxbbqiqwjmgx1eer06wwnrn4bwqspmbn7t391pqjyzqs27gz8axazi31ebgsunwlfw16t266nu9oenwv436pa6s4i'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'qycmbf0fguipcnolalsdtrgqvkkrxoe4yek0q8m0lbutnw01ebl9yjl6h37qlnkphrrkh25tyz9si45gu6mrub551engv8etwy391b87auv9xyrjzg0nft3tmytt464pma6xqi2873xi9xz5jk9l3qhtgkm696wh'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '5c3t73bplf10ks974txhlxyvaczlp57vybadbb8bq6k0kie1tyk0t55743opgobcto5emosxnqnwr73i9igt9ix3m9pj75i4jgjweehbtdern0ihwqxlr94cfruopokzdc9ihbfx86mpwyyw3vr25d4bw91ss4ck'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 5775023898
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 8840906770
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 9051205834
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 8263081860
    })
    numberMax: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 8129134407
    })
    numberDays: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-22 22:42:59'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-22 08:58:51'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-22 05:37:12'
    })
    deletedAt: string;
    
    
}
