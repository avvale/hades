import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3dc33520-4cb2-4278-bfd6-076ed42bf026'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'z7lgjh4xsqkqsylxbaawmej3lxs02t1lsvrfh3m2'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd8ba3058-98ae-4ce9-9f95-19b662777756'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'qcamciwzy6oskp3ltw15qe0b7mpwlizc414jufv98prolbvjm3'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '119453a3-9825-45f4-a660-1d5467011cb5'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'xop58adm0brt1a1o4lun'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'mw7jevp4pkk1u9fh06k248trkl123lzkyrb4197efyqzrv3xmu95m7l8jls9n0p8u4slrajn181bqetjwx22hd13qs2gj2bhxt4422vywwbv53vljpvc6wov2d6wagcfldmgtdua0t666xxx7j39yrr2ph6k7q3s'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '5hojnhekxgyynnr73wb2i1rtuw2juhohk0lia9lzd78x6w22226mxcxeo6p2v3gk8qq56hchi4etadn3qst5ggqzk48b6wg1ss651zadprmefs0sgsvzmd1vvsezkwlzczjyzp6chwdngc00knmi03lxwxc7z8u0'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'zt81jbounrigewexwx60gfb9k84qrntnx0hn1zhfzf6g6nljvc028vujiauiyr1oacp4zx6myt3p1uca1zw58pjad73qt1uys67ms0itc3rdzz6henjbc2dpw12vn9u7mpvrv25yfr5l798xakqbt1qzf93klbyi'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '9ehcxt4yjdrndya3migor3th098hhdrcdq8h8y44'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '2oozcs6lui6ojnublwuhm2lkcb3u3fez0bzrozwaoqxha6tyavklvmj5sslgv8sxonmyps2rio0wgry0du56x89ttlzxk4c66h8kzvwifd23eecn4er878lm761whzhgg9fciy4fwoo74o98nplpcxj09cm3w8v7'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'h124zqkgp592zh805ry8lmbc9649sbj2lq1lttja6f901csr77fpin0s5fxtwsct7m1s729c8lzu6lag5bog5150acy6nb04ftme1bh1vcvbewbbm8w6d4cu2jh5dizn2ifml1tjmduoy74kmyku8ro17ytp1dh1'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'wy348gau4zushyu8oidsgrankp5fw9roqtoxibmu57djj0bigpim1gjijc2k8lgbkdm2uy6l4j2kdc2aih9ljh5re39s4pvpbd7f4fzn1owsiuotpn3tv0hrka3egehsxfphjmcmufcwlmqtl2mu99x7gairjfta'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '9d3frpxj5cq406fq39l5uneceykg74ryhs5mxc8ja1vlbzn27gvzmknkjft755bqfz6tj3rz7e3ysewwlojoosxgmmgju27kur5vugedp74wxl8j45djuqdzg8zcpgpy50gkna311b4i9idqrzruyg6v11xfyw1o'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'xogiaexqgd76ntyb11w5'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '7q625dofu3qk7ebbtkjcumawpt9teq95li5dzfw6h329ryisvqutt52qqwud'
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'SENDER',
        enum        : ['SENDER','RECEIVER']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'hemxeerv1tghrx988bir70w160am297ge4vdhj7oxfgs9xokwtsouppx8ymy'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'ftr930gra9peojg1y61xs1f4sdnkqeteeeldnhbfubq4euuqrvkzqt0bmhyq'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '9s6cnyw425o3hmme8ls3axlrywki2ats0i8obhob5xla05q8zm22967n07djlgh8555uljxj1lm7uoacnefpsvycplw6jjq3zlmanzfh6gs8xdxvaen6l4pry8xvrktbcjmsm8bnkzeeyyxjc4s5nw4h4wdybxnp'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'idoyu55m38r0aalc445hyeoqgnywvb81uj4ks64q6qe9ji98kbz9959d8bh6cjryfga8igxj3ahukl15qjjmsfwf6qze6wiv6uvnniqjsbmzuu7lwx7hgcmbj115lzqhil0bonqr50bl2yxaaez05lq8f5952ezwd5sx1703x5h412qrxs0l7g10wv39v28mrpeeizjiwg3xxe6zu46u0d26kk9jocvox7mxirip7isz72d56hrvg6ersc08lvt4i2uw43qcylbzcezr2fp5dhn368t1bmlit4clflpdptxwbvtmmzg7uvy0r7po3e90'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'ywcoyigtn59mt4erk81xy91v6n2plkkw1u86tmit7c03zhbx849xmpeynpy4'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'b7o8xogvc5s7juhz2aaqdzl5mll40vzytb7bagsecyg0z75nntywyrz437oon56j8v3fvrmweavd1dt806evoh9pk3kdaynv1x4fqsule6t0vw221npmcc6lzp83214uynn1rc455161v2hxzxkl01inkwsmrmhm'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 2774730572
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'm6x6flsbk9o4gydg9uxqxpw4o50kk5k1dk42pqieqp5uvymqv9de3ccblpspg5g42k8e1ykdsnvntv6encv36zrg41ayarm1sb03cgmf48ws3gfj08prcdeaugzgkzfyuxtg3lbvcej039mrmxf5841p31445v4xwhu7udv1qaj9przf969teezy7j6fg2dm3887h7rqk9at6ph4c1z8j7wm7s0tfsjc5s8wm6pk617i7fz1pp07s6se4io0phtixp3y8yao8au8ws552l5qqr2mfytfffvqgq7wimjrmplqx12g2cgl5ocjsotvp16v49l3kod7lrvh6lfrz2ih2q2bppk9igwlzqp00d8viybs8ybeomp8gz2hsk561g82cx72bjjhbg8oif66uo9er8r4qc4dwp1mf2kch9orgh3pvlpjwzbf7zfy5nsuxiyfvkaovoyned39054uvv0nzqzpihtvijxyr44r02k9vkni9t77a5zpw0dtp21lkx7rfwijgyeb2py7hkciwkvsq71l1mo8xui4m66xc56p8nltytbobotsg56n7ywk6uao4jme19buqf8v6rqpc4obghrcwd08dxwosmd7wa2her08it92zcdcyhej7679q76d6nxv9473jkc8hckjbfpbp59wra1pfp90re1d572r2897f4t4v5rbwukcp05t1k0zk9pqt6gis96orsssw6ny76b9amhk7iasuarsadobehvltyrp2sm7z1pirca21bp8lemrkvh8rpk3k6s1le26s9dle8vhf028xyeccxzjwuzdvpk4k22a5duw2zc1fw1s5ba1z6az9ytjevs36mlcszrwj3h7ela38iwtx6ojgo5rvm9rec6lziril53b8mro7uq893n65mq6h13xwt13h3hpmdoz6jeo2zbp975wq5sz5m078yytiwjv2il1tjpv8i4ie2ds8rp68l7qid9yuthzvcy74otfi64mmi2saahgvu3rno4xhtlfssrg2igv'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'fwwv5q0my7mzm8ifr6pl2e40x53i5dsnbu8y8syg3tnmzh23e7pn6qxw2vx605g2d4fhbcel61sl1tptkgnb46mpckz40kqj3v94rluwqkpgcv0hgzdysgios1toevx7lmtb6672ub87s0nk5pdhgvh7lbtnawyqo40rnhpbgo6t8w4fmhv3jrady5ozn4oadpbctksx8ho1rzc26i5a9lx956wf7wcf8rn3jpip26o1hjjk8m3ht4jbednmjwsm8frpn4ipum8wht8fnkj9xun9k399a6aykougumfg87ui49kbdpjx05seexl33evinb566qecriu5ci0y46myherv29bp8dfquox3n01bk9vap0b3jqhbzhwj06zikryjtt4pjtroa0li3loegwn75ekpy2agy001hr5d8rhhmeltt48yi4s5wi23sjlpkcmn527wcn33urw7sbw3yhbvbquvy22zaywycgokspf9mauyynzpdqcklrokyby3id4fzwp5ssv26ikz7sdywfcl9q7jl9ledjsmhxx19u9iy7rxpjxhoxncm3lya5fv83c8dttuizs34mkdmoiy5fps0nu91064dsb6hzgpzmor9gopttlnuvb6e0cnc0rr81ozzzjtbeh5v26askg16qs9m250gjhch9312it2p83tqqjav33654g2rrjkm7inxov7kzaoixc37yb0gxn0gtid6ts0ddt62xa1wxnskx5c98usc81awhu52iwguao1xaj0c90528xdzy25lj00c3xor6auhkhgfg9daef09t76k9de93xr46kau0hg42qnb0o0vdu44v024g4g1b4jeq5zzhwtipaijb877i71odkrwj0vua1ghnkoybwirtvbf30d6uwz3qazs8jaqp6ss6uv89j6s9l44fkuhmrjqqvqwadbvxrolbdj2kfhsn4bwio3n32fmxlhx3o5sd9l2l0aeeynqv2wdthd0yg9wpkdz3lqkzgp6z4ms63lgt25xz4g'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'c4s0zqrgoemstc6q1y0ldy0m5rsgz137ocqpox8jy3n4d0h3bh0iaatewbcl'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 5920770249
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'nq82e96pewrsud1qas5bhvd3dcmyd9zdqrw0fibeop7tegbpjt9k529j1b5ud5md2jg5iiuxuj4z2xce9jq6n2c2otmbo16vvams4lil6v30trbwsmx7fcq8y60kuqwemslqmdxmp71nnzemzbl4c6wbzmidr0co'
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'ACTIVE',
        enum        : ['ACTIVE','INACTIVE']
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : 'b559je1x90dxsy58xxuouzgi6qk1secb77pukpdazt8xuu4w7d02rd10upu6lv32ou8omm2nj9u2nfty2la6r8df8y3h7wqkuhwcq69lcbf8c35uy286neco438qrusyshs9e3dabgrgayzmvzqc9hliffkxun0y'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'zqaa81qj358io1w6ie6i'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '5zufejvjjlfm4s8yh5rx'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-05 03:43:47'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-05 06:05:20'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-04 22:40:46'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-04 20:08:13'
    })
    deletedAt: string;
    
    
}
