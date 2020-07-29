import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
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
        example     : 'o0da4qt98vctvcb4q4m4j159819u5tql5cnujezl1tfiif6y51'
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
        example     : '36menrsbz9z3rj4w1c4a'
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
        example     : 'n23tbzraku57s0200sbvr49s7ps3kwxh7ly3t5z4g9iizipl4asa7juf20re2mohakp7fcxn7xqcj8u1mi5ql2fziow1anb6o34bxvz58uplgkuds6pgzwoxnbinwwp2fxmqiz39zcjaxj4n77muodmslnoyjul6'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'dhocu1jn8brk88qq4ibwga1p2ihwrabebklbsm7t1bzd5t2lc50pcf09q24sqeoco5asvikizmk1on1bmx6rlwxcriubclu3l9ge0fpuh6ohvydo9se2hyzhsqc6xov4ovmm58qtzhr4wz7dtqvjfejzekcoloqh'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'xipvd62oy4j7fwjt3b69jp9eq2qabbr4x3448dn0p7hanfh0vlrvf6cvjl31lf8lddfrbx82upmnlbfi9yvrysg3f6txt46guhju5sqoiuwgcja4vaovqrmiupyb8m3sadphqg3ewcc8typ1r3jqnyod8auezea4'
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
        example     : '1jrrph8h2zkjcbrhogiq0cumjsrrt84vf23k5mlt15kgogf1vpt6emcoii4r96m6669m9e6cdt2lp8xx454y9botjk647eqt01yo1vioqycs6096db0wwv32yq5xx5nabd5fbebx20wo5muj8bmz86gcsygzppxw'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'xncy3mzso3lcvax2uz8vc37x031uqhrhysvg7nc6liret0ivk8parfb37udor5tyn5uoendvooz6ovy0kz15e7b0z3wn3b9s2emxxzh4rn3pgeljkd35bqn5b9crw1risd03kpvils3y6jtctp7rqe8mfslilmlw'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'i9jhbmzt7tz6n8z8xlxn0mg3otjpasookvu2wxb77d3suqv2aik72o7if8ibd2vo4vf014335epjazdsrnfpw2dvyv3g7w0a8x8rbnwid4vx7hxsq38dbzwbgdkp8a2pky0ax25mzn5ngmypfofsih84zpu0e6f7'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '8hwmcuejlpc45mqhio3w4p1nx9qb4zzoacoauotetwsxxaa46no6w385yrui8v3ti018o9jqimzxmvns9n6m7p7updyq7mpyk4o2zyilw0ippi92krfk5bgdf5uyg9yaqgy97oo9ift6sr7sk066p8ckqjiwett5'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '0ehudy46799wo9mdm1wi'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '98c7xseec3vyzxc455qcg27v1q66oybbmsyi5879k3o6k1q8mwjphuingkjw8sw0jv84fyau8c4zw91p4edpbzjv2usvpx3mx0a5lu2r62wjgzjdufzt2lii3b3xzway6jpgodcf1syuva3vuj986ft19vqypwn0zcksl3iyggz9wtg37fy7c93vqcc04xe53b5houi882n5jqm5zfr0a9qb3tz6vf3xa3gwv1y90925aw1aiakclj16gpm0iff'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'fs4utfmtrbzki7m0h32cvcvpmibwk4van2f2z3t5thgs88s2rxqpsxgzx6wuewecvakgji5v6hukx9e9mk0diw7awjvgdyx6x8wungv63lhkg3vlbya2bv5vje7xl4acg9oc1sshksioxne5d04dmut32k04z6kw9j22o9odyjh5f08x7eajw2n43s0rufc45d8hwb7www3tfdd6bzmlb5fo9if5aujcwq9niwhe6q5jmtpt3fcx5jyaaj1uhwkrlprre6toc8ps3gks4h3iftoe27diz3fq2h7aec0i81cqmyzsf1bt3edubwu1vids'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'vibz78s95624ht8pdl4b1qqpvs8j1fqv4381b9pz31dw48qsjkh2hu2sltww7lfxhmu2g2qrkzm1p1w3oycuel03232ziey4crzniu0tkswqmw8xgstkcflh6inysjbmc0r6x2phpidpz2zi0w3d1m6mcmnfijik7qhw1mpwj9tg9dj7u4cxa17epnwvklr5n0dky2cdtemfwlmj3i0xq2qiivihzxf79ujob1bxa7coqa1k7uifsifkepjskwqpwkdli3csnuoq03ez1vcml4hkab8ztfiv40ja8qa4zite50h5d625gq3u6t7ze9nl'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '8bwbdzn8zzw4fqhl651axwlj88ly2c1wz82qerb3ssecu84musly4q9ma6tdz7yowpxu9dzrqy0pf5i4n4arg8lbpmh239bl3yatwrx881uxf3w9b1u8o4e30fzwz1sjmuqzkty3qm42icdxv0xkuobkcltdoh0vwdo1qzfc7l4pns5wxqy1w0ulpw1pkoj71lb56a4kfuzqkxnymuonjxisil2bpptaoi2bczgdizi4hrpy0qd1ps8uvwr6dse81afm1qbb2k8kwvl3uoqr5q3gepgaqraiueab2c3mrrptv0njixoln3az1wy2ym7sexl0z7i89h07dnm5ne2krhpa4ob90azhm71pqz94ymgjwvjw2msoanewsp70sflxycvswz80zy0nlf2r58oni4pdjbfyxzots74rb8heumxieib7sotypg91z58ezfqcorxu0yxtvpcd7ut8z6c76j5wdpw3uo0zxnpax5h4ty30cvr9un8f5m5p3iez4ol2j7wfzrk1w7xwwhtg6s7e4t9brbwp4el2w0q8xmvclvvhlecya8w78d3tew9qvw33n9a928kvjz3kj9wzz4agurp269xb1vu8xma7wdx4qm9xapx1gnbb3dif0gc4sgyiixengzo7qfub1y3f22amd8c558q5xzfgo3xnwyjoo9wmryhrw0skzhs9jrmpi8vwgpfn30owqtb7jqar7ml1sppxnim1i7ik1cidisuxyr0hyel3u3nrtr6iw80v3o9bnu3b6cowl4mbwpmqt9a6lhta0i6wh43pg0uwv7vsmy8tjxri73puyqychqg8r1xfgbkiavjlk9lhj85oydnicrvatokzrzj4j49pm6dqtuamw6cuf7gv3sq1sltajx5uxz7vlg01zktr633fksc7oatiqjer0dl471pucgkuylmpzwjfcwey2mfrt7wds28jo7o2s0jayyi771hi8cmlqz68b0457armali3m6ms3axobnjj9ntcosrvlno1qacx'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 02:22:25'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 04:41:22'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 19:05:22'
    })
    deletedAt: string;
    
    
}
