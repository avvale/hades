import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '10c3798d-8728-4ca6-ab45-f377e51b4a6f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'b2a3re2vime7f8a58ara58maj0qky9y21bw2fjkt'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e58b4c35-f0e2-4405-90b7-3008253393a6'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'hargfbhrd147kw1qlbjj95az0q1u0dyzjbs2l72bi6zhgb6bas'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '9c486816-3fb4-49e3-bb47-81b587d97576'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ch4d7sx46emshjuefr26'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'ivtiwpluk9a7m6itjlvad0gyb5bc2ow50r4xnpi0vs1ly1osrdlhwbffp8mcmfhlhtw9vdifc8q15ddtv5m7bsbsj5dbufygj5zbg6nmvmsx4wudk0jx0jjdzqt7a2ta5b3b7682rrb7lf0c3ty8u5i7yiyvt23n'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'qz3t9yagu3cntnyqfr2o1oq4uk7jmz9wd4wtv208uls8y3cnfgtzafhm62l0iiwt7a6rbe8f4xie76oclukvmbg3thqpedb3v0957i8dmk95rvfdbrtfbuigzovdgtlsevioaed4kf16rw72hjcpb7rnsu87tbv4'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ddfuuvn17jlws2tkookfxqm4k3nh940cs6phd67bjwlhny0lh7bgbivb3xlrodsi5p2toau97qjiec91s40189fh88408hziel89vvjgosb2xrs3ysgl1ts9rk902vyqwurfwy8lfyuaqx4tbsq74gtpfrrruc8z'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'coptkk8lzb99npkz7smpx0sgcc4f2d2817zq95jk'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'k1w62hkb5bybil796lrhvthryhlrc5c9i89gxa1rmomvw3e8ctb5f215uiw5tudadqka7taavig1ep44mgwi2sxudnp6kbumt1dm23ps2qnyumgjzxtytymk55y6d8rxh04wuoq9svuev6fv4xp3y9lx7daqdkhp'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'hkeso7qauvbdoetblz9ztflcr8dje6guwjtcdmz1y9gwtx9c3etny3remaihcgudtirbhxrvic7x9f0v9d0oz23wb34dider06t74xqj5erbro4khitn9wcakq7j1n8y0o8f1j8pw86yz3nwxtkzj9z5qbwz5h5i'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'h4kw52vycgheigpgig86ige27atci0mfuxm1m476g4dj3xl22e1cdqpd7788hf4175u9geffvryw4eubyrpm3dyvqdvnstln2wyeobejhg0078xcd9a5ztehdmv3e1q3snkxqhjlns0wzssf25hvyxsnu1fj4fyo'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'lpce7lwee969u1yfbz45ro7c0ngjvgkx10544wgznvvu6li6ecn5db4n030rc25u1ucy8wrne1cumg3sqq3lki555so38ul1yy3lpy443634i3tq7phmzc7gdu6718udhkvab1m8r2zk9tr8qoraustth1uzprxk'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '6ynkno9wdnwdcttq5o3w'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '7teq946hl78ldk7d8wm8dpu33hhq0gd2c9hnol2now6l1n5sv30462hyecre'
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'RECEIVER',
        enum        : ['SENDER','RECEIVER']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'gbkekrnhum8cqmi9mdfj6r6eqylwpv3zdo9rissj3qohvilgz8u2zzjgvcqv'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'jfhwubq8uigp3t7h553icgaw1rvucr064ixyji7l3ckipbwr9lzwz0s7oxb0'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'pufsr8jadtv9o3tqixrl7q58mfdpthby6xmuddmdv9w3egizb43u93crgxqz5ci3jh6m4j99ok7r30n840kr0ds8zrd0js2t3ojlbrr1bis3lxwyvvqvg7ngyge0ub32yyjzcvf4dbj6u8w9wayw91oai08nvezn'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'yqw0u3s5h8snfyygty5y5kvqg0zrcyvjire1ndex2cwekh6ptfsn5zqfw3mnzeyrz00tmyzzlecvy8vcaeyxk90uxojpyecx9mgzowookwti7r4tae6lzljb598uqk8l5a4z6wtyvzal186bzzjbija6izxmld5dqzk3kmsasbgc0f4x05qd7ges45quqjbvu8sfj1iotkcmlr79s4w4gpuyl2b95omz2ifw50hr4q4xs5ton8xiu2bkjkprk5uhdzvr4ufac3pcz5nrpqhb24wrtgacg29dxd3pivzfp0drn9dzda0j0ce71ziw0hun'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'gztknlgv3ikr7ktrhlc9knh0y2svtfp2bhhr9w15hwuquh88hmialinkln9y'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '4z64c5j5iulh8he541vaehj9oactq4eqo69oeqkjodtv44qzv2qzgc7yzgtw1mqw5y64jzn2kkjzbi0t6ikfhbsvhcax1rwzz1g0nxu6yinh77y3a736as4slxdc4paihlhaic342u7j2numne8a6qdunskuwiwk'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 6236499707
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'wfjhkhalkqta1qye7e0yj50y02icrsltqwe7wakmka3zj4uny2i4nc8rxbb41kyqz7cnhn4svl2s3i6jh0mndkhgx30b2mjvw4coy5wmqmxjik18fswmhbfo6wqnhmvjvwtpzyaxoo4ll6w463ptzbykv3b8bnwnokn4iqoefmwg20zp2f1gb39svi5g45mfau86bqtg1c0y68u94o2qfg3zw90663f4hb96nih76ohsqa9n9snswbr077j29erz0p3t076c0ztxypvozabsbobwceea3e3ucl2abr99w0w9gz8104k1vqgwtfhtpkqdfytbm8kauidyv2e0m520zqhf9bk5alkwhjni9h272ze1i9dwhdjujpt50cgf0en1a5vfmnjtrai3qtnsmofatop04qh9mz03xpfkx03vkvj2o0a42kz1z9sc6w3fctmb485xtafbc1yo5t16y5fcf9pgtl0s4vsgepsmul5ml8lu46s2zh08tcoudgts1ni1tqjt747qbem03o4pftc13th9wm8tlap0p0brmnirijkgmcr166jr29neqcudjuuvbmsegfgtwxqjopggvyidjlr6fpw5mjtirzksupda9v8xslr0z7ce9khfw8ssigxroeroaqo7r182soch8ekc46qvnapon0qyrw6fjwmy4ctocgizok3c7k8ld9gt66yhtp15yu0srexo3rq43hjoyrxljrf8ucl6ps7h2ofq9s7whxiw6eus1k1sfdrh0wok5xzihgwrvsli1mzlrki2p3mylevdimov1vk4kbg9wsnv8abf36akn19id9aprmnfwe0c695tsie6ltyo4zk1t6fjo2uzzyd3gi9pt0s3hy293f8k6fojd48s4i9n126hytjm6rzplwi2wgfq3qznwzx6bvdgfxdaosao395ecmauwskox3znn0k1i5c0n0altcuxxvav0aru6mbfuznwshjatbpue5u34z8pxja8tj11lqaz76qrkmpmknpfx9m3'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'imso8m4un1mll2nr4c0e2l4inyf60douzzvkol0rkzo4g9viakp8uuye2a33n3pzg3zk6gdnoilr7ukw5puvssiqighjcfgx8lb8dnr0v4jaq8yi1qm0qogtca17l5j3ez5krg1s5ti2ohmxcocgw6xbms4p99ro0gmk3rx5pdd13e40ghkulgyuch79eegz81c5vpuoij0khlpd26nl6zdy1rtw026y0e1sud85j89iv819kzehng1kxqiso1sp3v6wvo72iu9ik75qhooefauifgkzdiwagpcmizvmtxcovq8a3zxv3bjanhjfn3okcop0q1v4ij96ujvr25v0a63xwier26mem2m5y04zfga50awe2gguo6y5mm7mdxa53lhirxa2dejgjav6qye58xzwkunc3podpcayahkzktwlxo22wa4p89xaghi4oz0xfo8b2lbzj3nhcr8grkl5rfsbx1gkjhma98wtn6n0f7hnwy2wxmwmpmrron2hnpcuy6ghngedeagu55b4nhtfbubqtjzbrylgrqoyohj4mie21u8ipje9m95ae0o6i9lb1z74og8r18hvk0i34jxz0f3injoy3kwmm8iaxqvfneu0wa13pmjponl71f8pseo2q9hki2uhr1bhwkoj4p6mywfnawd8rts6pou273kg6kr88jx8v0511ciijzy6w0zbrppxbe8x1dzm75cdejo77kria0cbwp8t123txwj6nbvp2lqn1d80a73ijl1ejdtpj6rcka8tto9dyl0sjx28dc2rm5fau4a2rk20jcpwv1d9dudiupurgectybyy3nmrp8o4qgx14zv6h5tjlwnnq8t3dkszm2r2jqsa2wu3zokp3n9k78m3l6nd2zgv4avq52vuimylflm1wbrkyv640dko6usjdiizrfy96gcp9yf7ku07h0951ceki3zw22fkmkklh8w0his3c37kna6z7tokyb3k44lptsd259j5pm5wawx5jsgd8cso03nmn1sf'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'ytwf499yfo49yd4dxkwadlib557n5zkdlf2c1dsy080sbs6dimbvrkaetwhi'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 9427112823
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '88hk18bw14yymt3ii44ohsz2wp59u3kaftd95dhznqcrqrlxatzhe000k2g3jz2ukkp5mr0bcz35wn0reu8wzuakdntlrhvpjy9r4wy6g1cxod7bdj7lw25f5hk0v0vcxne5lvcpjunfwylx6fe2ub5f7b304r69'
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
        example     : 'gy0eyfvjakpz7mrx0460cx38fyrnth2gmgzs0evyd8k8ofez9opnpdhwfy4jeitwn6fks0urfmjhip9y86zxm4j49bylxtw06z42wav6py4rmk0ens3pzowbembwkkdnrsferavvr1uz2be9gvehs83qrmqnsrgj'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'i72s0pr8f6dady6v2vmm'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'ags2dbrpprc11j0iz5uc'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-31 08:12:34'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-31 00:22:03'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-31 13:11:53'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-31 12:47:47'
    })
    deletedAt: string;
    
    
}
