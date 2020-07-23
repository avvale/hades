import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ec9d7cef-6b13-4354-a789-de58439230f1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'si665sqsfh7l0cepuq0poikrtf99az2la3ariv2gooivfs2hv7'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a0f79650-b44e-4018-aed6-c2105c2f0d08'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'pch8ww02yqp05a79d4ix'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '3fcc75xbpttadlgfiz5l6ru81p2yir07v4xla8btxlo7fzoszwl23wauw3oa4ium0d9gcnadzzmajkmc6zpvfxnvnpp8syqeo3mauy2e9a8tmw6f2pnnxytrkkgi3hq4dr4aayu8ywsmw9fl7tvpq3nyacqr48vr'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '2i84tve0j6yey9l0c2ygd3fob6qmju264ymo5wt70j77slcms99z9wcpr22x3o72cblkwt9syiywlj8mqwxvp9lubscs7gy5nr7sgcuvavuhwrfkkjy8h0u5gfnebaybq7nm09ravec7wwrqcbh0cnz6t884f6df'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'te4ts57d2xvabk26ekhc7g6orkcd6wf0sy5w9cl3a0l8uivsfvuqfbj4fot2w6klreldecobcbmdgbrl9y9rduph09rg0cjlapdgkgk234uk0n25gu0qjv4a8uqpgymgg77j8pmrz4dt5bya2yf2lbhwwli25nyw'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'c10bc3f2-cd95-499d-a95d-188526a6815c'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'ovzi0jupu6szcng68pm1yauibrt7tyo9z7aqgj2e1snxbijkjtfg0gyr18qqmpkzmvt0bpl5vcywvv6kuayrk0gr1jds27vq7ukniaztrt2khtf6jz4w86kapki9j3rqe4whrxjob3p4kw0hh65ewwddrmsb25ax'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'u4rw4yeyfws0rpvya8rr8ys2qr0c63zs69ftid7ahrxco9rxnc09uqoqc4k5bhwd631kjke1ajy8b15wxp16zakmbfsafgcnlwxp3oenfyi5vzvlioafxmotfxj2s14izxnlrs7r9hz43q4lt6kekz6y19ep5obq'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'gsn2ic1oxuxf9zt2pfyp5ogg94fsu1shzcf7t86r3b8zhnlyfp9qd51gisjixf6hd1i9m7j6b1il7jm9zffmlbm0w1qbn0iytzraztw4ilmvmn6xyqqioslx32xp72kxyhgy6p23lv7s3azshot5t3k1vstaojkd'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'x2is2rmm2cgzz0eqmbvsnu1hedlxgq1muw46a2oc4yokmvgy1r8k0tf4tdxpkb4skp55t25m5qoz8rxr2qc1npn9iju9x0c7tqzh9fkwqgdesxnw4qalva00e2dz1v8gecgffknyow8ic9krz1716qopfbikalvh'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'i1c91ic0sfsxw9kt9qvqycd9exa0myn89n95g1w5ehb2tg8cgkq3emqbxr7t5j8m01hlj128d1lvwni0g84thmsouy4xrmwz5fxt86nwyjcbxp5qv0y3yuzej0l41wxpqlbqi612tccnbk82hezveys161d6j1x3gaxrzbb1qsyxgfsulqy6ajv7vp2f7pcns5xfau0e9me9mn89thq6ywilp9urjrmng7nvj9nu7z72kehf1322l1sdositkcd'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'mgoueyepqdpca1jccankm5lvb34qv1zzjfsic73tudr135qa1hfiquvwienztvjof688kiyn4btysj0oc35ksmdgbchqfstim0jhz0gj5u3559wo744jobxb59ztnxc40hkz0yljkzby8ldpyvjuwafpdlrosgjgqorvndwhknrhpeq2a425oel0oa3u7kk6ov5q2ew9mvcylfhjmqq7qvuoh470acrlzei2apwri655z5npxj7k2ytxf9qg3t19j3mx4kc6wpsuqne0egyxkqh5jtrcny6ihbj8wliyvrhnpcxkj9d3jovhe3gemh6l'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'rfilp86id6l35fhk6e11o2gojdikbn0ekc65yy76r4ehq1lqakrxwwo0s0p7sj0ypn52ai8c5pehzkt3ax5crycq9rso9wkxry2f5cy4850p15hvw0uial0wlfsvkhqm8dxvqu6iyj0m1tbm9z58uwvs5utd5mvo6p0yuw5kz54qmp1jlz84snlsav1wfdr16whdvl4852flxx8mxzhbiwfidx4e4t7at0daueyh9qg3v5peh7pgpsqnv58rrjy0u8n4dslob10btd2tjr53tswobx7hub8o41n36x1it2scrn1ua1u2tnj0u66aytqx'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'krj4ur70qx458f97fzwz5mrz0rdfdcgp1abxkynky1xuc09p7yr877g3062fir5qmvww1ghm5mu26sfzh50oeowxoxos60fs9tch9hetm8s3gwakqr6bog378k2txog1k9ahdf8jt9vpd1m4lk0tw9jemdzgpo2ocgullfqxf5zdmm79vgqngx8fxdjl49d1fae89z9qfxvltixpu2v4w45ghqbsbo2ozv6bzdlbn0th2v3f2mhsisn0ti6egpq0m3mofk2swl347k2smc61yfk9gyvclddguptb76ntljf9eh6oyywwc1jfua89my6hcjbkjl747x9w2zq1llxexh8d0mtcxw53fw67jq631za3yr73632a1bhysfkbit5g3jgv353qzxoeg7fvndkmoll3qkt1yi39s4eyyfcmxsnplqchwu4tsnf10wwox4wybuqlkslukq64q6nl5yt7a53atfwis5f4yfk2bx82cev4bc4lshtjgdicglgayutx8vdw9o9hwxidlcscautj0v1tsslikk0h6bss5apf7wxypz9zqj5n032gbsgmsf21m2yx0sz2bch95o5k6ccvjogbhl6yg5etd5ngl4wakhex69q0sta57pfkawarq60fvd1867f7qavjczu4ifvnrjq2smc55pgq345yqzpnqu168g3h68oudvllld2fqgc8p30iq0mq8l9684p9tjzvxsz2y22wgxgq10o0zzz940092lndn9hu4pa8qerlxmy9bcha2b08urbkqx2yjlztobmkuix6g3dgwiomhxkay1dj0r886uy7gspc6tnqy7c1jc4ztbnsovp650k68qt5dcii6xtag1bmk2p6s5uv2p9aidg3kkd1o4xufrdxhft9tbfejvctpzybon6yvmep9rp2upwht8m3fwi43f8ao49lcflglw9nyjfyrh6uzwlfgekz0fk0gs6sjpezcbv8n5v5whdql4fdsossexn5svisq1jxlu4c5c01ufervucy'
    })
    parameterValue: string;
    
    
}
