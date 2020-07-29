import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '61747cd4-8873-4554-b0cf-2a79ad77f5e9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9cb32b80-ec7c-4f37-a20b-848f976fec38'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'aooxpyy3lljxyibur4264zigb9464yi46iuxgo2yxexjdo64zu'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '811b42f9-4ee7-4b3d-bdec-b3eceafd54db'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '9mi5li3nbcrtr8bup6jg'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '79cab625-3a92-45a6-abb3-b9d2a83413bc'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'c0dwsyll2zomqgj4bu9pznef4sjfa0njfqilv7q7ojuj2o7aws277b7yj5p46ajbwh5djrsomv1fsz5szbw9ct6s9vxvydyija8m8gk3qi2w3k8q5swmdh08ms0xv8mgsdjaoilimmqozr8fzfqv31zozybe2a8j'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'dmo467fko9ifaoucy9hueblswsut4wktlqh2ikrqntpjkj5mculq50ksmar4ujf2ce6rf8jfm3zk0qkrdk5pc46pofy0xaxrw3u4f049kzmk5h07rifzme5nkytip8v6qd71qsmo2fo1b15513awq6hy9rcafd47'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '1xryxce3d6wdjbd0f80vmch568wk6v6injrtubxqkgndj9q36ajx5ag1cuupwmhrkt0tn6tnf4ag6k354yzol92trwtqg2em1ry17bt53ke6matn50rcynzqg4efk2wbjdmpc286iv8kv5q9bmp7azhheunfdh4b'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'pdpnf8kukefwlgmc79k5pdma72cg1v0drn765k3744gwiaf61588s606krklribsx2uye1d6kdc116u85tmlx3ru331g82bxn2mudv4oz2rr70p2dbgrvkgvqfitsqir3j4x37nurp4i8ynfmxesxbgx1lwjg0wl'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '55vy7afkavji0jas91zigui55fjdu38uzcky5yeuf80hcdtqjsygyvffeh4txwfxh3o8a5vp2sebhpd9jhoyo5jbofxvbvbjzsdbynhs5ujqg4k7mikjtz8ynnp358gm4m71dvqx7yxvbr57xmmbl7ln9ux9dwuu'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'rhkhv2dfc4gl42350rgwkm9bm0evtndyf4inl717f9pvfhva4jmh4pz93y9r5zwh74pxqhx4zzeo3i3sz2l5run6y4ce3n4lzpt4ezkca58stnliyf3la9qa5400a492gxs2d2mhyfas257gy8qgtjwokp5divtw'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'x5mzgzqnbz0ei5zqjluimmrua3ctxo6evc8n0kegbvro4lwk2g1qlf640405zewvk9ztgtcedotz42xqsf2u5v3a5udra88mp18y06wx4hmtkvkqykrakvl52wpgekae2rylutj41xnhswun01nw1b1c05el0nqj'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'mpb1dbtqrpbaevr6hpqb'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '7j0n07x0fjeggb784mnq66o8fk9crl85yf0wdelm6igjhuvvt0fmqzrogxyubgtheu0uvs05g47uwniy2ezxc20ptjn97jq3em10etwgjujz90vh7hr4q0t5y5t8b0jwujqnd5x1zyudo5yfpddb3wv1xlvg4lcsnlsx1odf6re8dl2tmx4wrdhep7suwygp9qqiiuvswollom84mhzeavanbq68rajwlnrtwdb6ni9u1vftm9xbk5m7ip5cfpk'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 's55o080r87fzgzm2g8m4t4axwsh3keykgag78ul99h60ft650z4hys1vede3gwhpsp28dtppgvbcpjao7ny4qe9mfxiex2q7m8tc5o597joz9wnk30oj3x4mcoyds9sr0yzr76rbt8rpthc8dx9zj7j3190mweidbulbpr2vj7n8n87gq4qjsp5c3h7xai0newyvu8gcrz7v42bu5kyw0sl40nynad7gox2q8lusbtmfm33y94xmtf7416ssp2hhcsag2ttn684npwvmce8rhkrzdldam8yyreymofusdeulsefy9cifotp8cdujx0zq'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'y3xsha9cwfzkiko3y1m2tc4l7kpb97hkaunjxsf9ihumnjdn7icsiftwhpbqx2dbglh848sizazxyyjftr3q00rlhnlhg7sbo33wg3roknkfvr5345rv4fgmjajsuta9xu3y99k4fkib4jjhps1k6kvirgydtr7gx0molr9tjrwpy31tnhyxdo8gupn1ez1c9ey86m6od04vavij81z18tmsxhr5tw5zr2lyanabmf93jgypjq0a8yfqsaie6qp8y2g3b182kt3llxyr7202euv7gll0e7ii9m1m5mya8h2gax237vvte6gtouhgmpvy'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '58cudoiy5cso17pwxtbq5d5jvm1ld0ut09228saa35y08lro56vfl6oztxubz7h6o2nx898celnf8beh6ri5tweky8czptu2dp5bhtckwd3ah81bei1c8bsl9cr2j1nmvlgn6lqf93ei54pewqi1n69mqhgwf18iq3fv31edcxzwc5a7507knya6harqm08baay0g26hkm15fee0jb2o80azr0k0ij9mjx3ck725lqib1peq1tmhrdir7orwgywo4ysw200p439utjbmxxp4t9msfck3fl7wqghad4lfh9ek4htvbynmn8ipllbxja5bf0hdknqznr28qo3bl95x2zxb3zaf4raqu99rjhij853nl92z5yh5av2qnnrtua229t1thrx8yoddb6ux8moabexibb9e7v7rm4j8jg0p086mqfs9ozyj6d1xt5cmxu0zeb5sd6pj65da76wdm8wtyopvuiyjau4z7ldthu3boe6yakj5ofh4qnm5x21z257mj6uey8ysawkz8x3bcatwt2u9b6b52z9xekzith4e5zsqjmb7zdn2lqmuji7pvlmw31zglnrjpuxte1ark69ciushv29qsuy9y2r4699d6yr878eo5x6pzwhnxulxhk4z0cwjanzapb7shoo8yjncqbs33131bw828kaculifrw3njjvkcjrl2d77czbri7pcuaith1ys1yw7ja4f37see04e8gqozwxh6zch7qffliwjwqj8m5xlgbw9p7mitboq6mhg10yklwyqdd1hpks071djy1rtuecdnlq0bstt1hwpvc2lq8cwimpu6vynk0emukrr4i2vudt5o6atkeepa83g4vdbhvp6up2l88ghi83gqrae5gvml8aw859xny6o2ql441ua3i5zck7svp46igfvoe9nxnojgds21q9exikwcp8s78ztegvqa78jem8w49jjt2eyn1uzcs4arwpqqmfn3p7xax0nel8a00qlfurdn1w7zo4b2hdhqzc9efjz'
    })
    parameterValue: string;
    
    
}
