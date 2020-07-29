import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a203ddf0-7444-4946-be41-956f42c795fe'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'cequss9aawi4pnrvzrgzuqsnodvdgrb0wqycjjrvb0t9xk3knv'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'd57h4thbhymqn56srfr7'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'd544dd36-987e-4558-9696-fadb54dabb33'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'mh2e2lp2bb1tj29lp7az5a6c64dl3n6m8qjcc1l10uu2w65w9gq0z3s9a4ay3rul5g6hgkwzger9oq46aztoh0fzjc62yn6kkizbtskl493ncthld1ke5361txivzk7etjt9ve1hkg720rjlzfhn5deoq5ev06ad'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'r6w6oqahawdgchs3g7krkyf66rqovec4ut9x1by3v78u3sfohv548i7v3ppofwz7lmtc8y7jt7lnyhh46m5wwxsh445nogmq85brm48om5uxd7rsmhbztb5ijf1rl1unseud0hqa2gpltmnw3ybb4v1dv6ddm644'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'nfkwi9g9s615vqk32qwgsbqnuw4egr27jpjgtio9xoohbyi9c2gi8xbw4z6e53prbw3mxsz8j7m0iajkv086dab1z6chv6o2396d2f86yghid80ch8vypi7dkyrfan2m6sqogx1ov7c3irzd7g2yzqn2r9ls75xd'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'f2b49f33-e8c0-4475-ac7b-ac53454b523b'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'hhmsjg3guppxeiprh3t6eioc0ldia089k3gjxspru674i2bb6v5o65ozymahoxbmng2jec47ohy89kdu8hneqq2fit2xvfd1xygwu7uyixvhvaq77ev3ipxc080jntdx6nw0dnpylneakzi0itvshdusv5nvqi0w'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'ku7cwoxedz0eeuyq6cujz92h6sexnt2qigbvoaothcwpevr1iv7ha7nuh81dm1f92yfh28av5tov02xycrsksk6hcfdzfxknw7c2wq22rrcrkuygy56ayc0zqy21nyh8ic3annv18to95p4sqb3xeod2mqosyp1w'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '71jyj23tjujkgca8ybpdjo2bc41v6ft35occivnjk3avqrx27ngjhnspfs221nz15n6vxgsp2v39v3kfdbtvx390kwxbmn7p3p2chmeocro9iibtu8lb6f4qg97ly088rwatuly1dy10qjoklfsbgu6cskw14mt4'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'vrzefm17nr0nrwynklirifmx7uuba3w8kk3s9xqom198eim6agjuixw9rg73benvbb8knu4myf47umcpwjf2kue25jqs9evzfaly08hmfe63l000i7n6kj15nadnolqcxqdnmsti43vql5z0iskqnasof55d2vuc'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'hi1lm8t2tmd2wck6s54s'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'a11ldrtcbn7mzt07qwxi7j9jn0yh2fmtqwp30wn5htz16apkz9tvykae24txkazranbrtr1noqwvbx4qvhuj8v9lcvgnimgb8aiwhrlg6ea1o9x83jhwwsyxj99eq8iri9o275zdtrme32zt62ni2gm5ehukyvu1lynw214a8biupvrczcegr73n1p4mb1g59up1lxv5hl2kj2j1guc6naecaiyjo8fkbf6sk1xkxzr8gvt0528t2bja7dud1km'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'hytag3s0x5hxvvictl40ufcaydevnrhsvo24kdiryui2xl4xmytmn8s9pt8usfqx5w305ltumzzo0t3ji2tpueqtb49bl8ufso8jinaxfk300n8k936idd7z1kup2ms73wvfzchdp7vfukq6tz3a8ub3hsoi5bt88duj2dql5ke697drtbtjrfva32j5oqwugk72d8u3q5xqxnt0nabhjroqagr0u29z43ey3c55duuh5toa9isj79aftynzxgphcrtx2ma1q0ao4pzdpyfvhtt3mownrnw2nitxirq28d227u0zxbnm7uz69vswby2u'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'wz4j2xb66401w25j42vlpo5rhdrad4h9yuwtyedbrgun4plakdcosw89i02dxikhr2b3lguxh3lrqm1cx3l2y6048bofmrol60sl84km8og82q5al5vsim3cutwsapl4w9bmrh5wb2xene7oz86om86geyvlwon88khgrlfmdl3iuk2t7ua7wedygdqitppmhozn7tiz73s194glyjroqssa5tiexejc2ekxdz1ni8ok7jril7hrksmr5wl7r87eqabc7xafnuu5cxj3ix6rs3br93aevbcimqqfti85vihxwrjon3u796to5gpwx7zw'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'dg0ys1pv28fqy949zy9noh05gbnz2p3cxhgldyo2xaxqjpdozh118sz8awg3io0mu3k2xue458kwtxruav0wnrt032naazj2xfc6qra12j16gnig6dtk0ftusxdavmyf8cir2zp2jsx50l12jses38xw9kxnvouf7ktcistsv7yfkwm925532wauwjmohjx4kai88bijkp7qv590os1k002lc9onvvgkjsjxo5ia1urlssy1ms3x7yzi22v15e6lajbq4nhtplbbvv91o12g2o0eqio1wz0qj76xululfxj939q3p3mdazhmd7rwvds1a9yk3sh1e6lp96cvoed5n8ctr0j669wnsxio6nmmdn46vh4cdbw167qmfq7yovnbbtgdhkopi0shpf78donwz2p5kw1hpue2j6c7tbk019lhxupbx9f65bgath63kkwsbtxiguxnxrde8fp3j5w6iur7l3glczst8rse09r7ecjzhtbiq8in1d71xta8bp7ne7ds8zqc3pflvrae1xofs654l6en027vp1rcco4wk15bu1j86tgf2jsht7f79qfcb27mag6uj7sj93hdnd6flxkcncxff3e6wmdpfzia2zs8czmd6y96aivs570y1a0q79hiykv79lw4bpago1ufs5gvizzsylvea13p4wy5wla0reopx9s4wg1crs5mef5ynuhimxj47u25oqo773q8e0xol64pi6rxx5xoy8jm9xy1uur8ix1i79itn8z3qaxet6v29ma6tw2ra1ipz4k7w2gp9hhqcxq9u8doy84ei313llryiy5rcbsirylwloo5cfzh3t783zd5dd9hfjujwl70f51xt3pt1a44ingte0ss6ny1evd8hddrntmbcon940vhrh9ghllomvt8smqumduto1km9dspu4h7wgfusd7gcv0ot8hqcepv7uqzozt71xf1beqk6u2v1i468jpxb3v2xu46t1zzyzcf4x1gzuu63rwdy2ofsg4qnfholtv3'
    })
    parameterValue: string;
    
    
}
