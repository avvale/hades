import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a743f0a0-2563-40d1-ad73-013f75bcc8d4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'vjlz6w1qqp4nijdq8bvhhh3wlf7b49rbsdf4sdbc3b5mlk7d43'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7d54241d-8a03-4ada-8649-22a0a15c8839'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'v7t0kqg4m2izjcfar486'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'nzc870cek88cfqxa16dvfxjliudhh02mvajfjs4i3x267yp6fplw48fwticbpdvpbtn1ljqllq1w5q39x1b94dc0qyxrnemmnp1yze1ltr72abpkrgb2sire8inbr749tqzqxkyuvdi4mdy1dehberxrkkkg6yrc'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '7pfmxhu9b8gg8kezbdw21v4n8sd4kxiy5gwx585gu7aeyxoyuw7hp85m48m5fwx8janvtwj7rjb5x9h1ky56nwwgp70dh49asqqhc0iwyjh1waletaqlg391h80bpsdfclukkovrqmum52hjupspd23oey6veh2o'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'z84fp8usmrt6uq9ax2r68w9v0m4of0fsq92vz6v8dpzk8jq68l1oedki3yzujo73lgj81cu0cbe0rg6kw5xghhvfhiyvso2c2iou1e6g1tv7s2o5k7u0922tvc3nuvdhhgl3hsv8hg276l0pksl1zarahaj7ddh5'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '5vpqwysqao369aquzr5ccje9qoqga1jpxv03ih6ge8pro4mpmmnznqw5kyrguwiuabo1fo7m74fwdazsoie55r8kqut5msj0u8guyfcnbycxl0uu88on3rt9nb809x2578wgkd3xb8bu4fi8c1f9qfnh69i0nw5f'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '4nxren9xetffvvcfu6244noz4cn866rxrvhayqeba6np2zyb05keq4ej0q7fg39ry5xbn9bgdd14q62wnkhgwt5kaqx9bf49ysbwecxuw5opbshklqxquwi90xu04cq7hr8f1yeuel6ytnwijjeuthu3gn1b5u59'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'o6nsz6sbipiugqhssxg9tx1hiskzsh3aougvgmuxfkdpopdruale65lchg017o0zc8qm19n8m4b7gxdoq0g6zuakv2ypmpdflm8ov9bpnxc56aa4ofr2ozqcfhmjut54nb2352rlstewecqact926i41tsir9mj0'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'e1lkeeo6aiwl1rtm33yixq63h7m3n79qb79jckw0aw7d81498a88qllpb7cshy8rit2o4ggus2jgsgg2cqhjd74idlz8lt5xlmwplc7pgqlcpmm3956am8sqq0pbqmc9ywem3toi8u0ay0sr10exikk0sp6m2xa9'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'bq963mrkl60icwls5nvy'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '0z6jcq89x7002uooi9u0pwm9peejwefjpemh90jemmuuruiufquv52sw9xfh'
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
        example     : 'ayslcsmawj3q8g02kbp6a3hkddw6ho4ub6dyq3qwd09qa6fo9esbc0m6gjph'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'tv7ef3o1oz5rd21jpkqc1wwyg8kqfrs84bjxu7zvhi78jyfaololdn20n3hy'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'qmf51fjixgcfh7up3bqnv1j1txagiu0kt31nismzpko5f5pbuw30cula5174hftm75gonsz9xhcaam3nwhchqmnhfdart1srivw61ene83m35g9960cjzvq6lxljg8fv1s2fyw3ma8pluop10pagw8cfbimqrr8j'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'vuwzfyq9vtcjd7tgwxi2nom20xb0b2dcmyohx4wanowkco8cpq00lcn5dumvd74227q729bgf7z234o2w7dojsk4j660u9sfs0ib8eqtnmmk9jjqhdr56hbuvt44ywnx4l8n0k84ksj02t293pfblf7puy83x96ghwvyxb8003zsjhjjcvncr3mlg1aeur6odtdninrq1xt7quwlog5c7cfuuemdq18c81hd6oiiy7edxapk5c95n604dnrjc2p829y4v2b3nzsgq5zyezinckoz0v9xley5pme978clqqwd17mw6fxru8gcco3dxzbw'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'pqv1lh8ezvonuksodqlv7w1g7blpxpsk80u5frq41jneca35kaskg3zthwpl'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '0cqw6m2bkmf5te1g7nug8wr50qvnkji4gn612nhspchpt3im73dk9wj70scn1x0tu3asblnkwgj5c1t4skgyg3tfsf03ehzavo46jek7ikb27fkb2qdu49pr7ft6f7atoxqgi3orjz3aeqsjancd3tvnhmkzfr9a'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 7649210773
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'r1ijdwgznd6b696vkg6dshlcpwiu9hriyxthgg6v7zjznr32afclsh9kbf8qnq54u85v29is3ul87gi7g50jg855fy9v8drz6k5dzczgat16godu2pbx1zm00qc6hkcme2ym1i4f08q8ipnfesah2u6p93it8hr0ooywl4wqitilx0yp0e79cvu1jdt57mp2h0q0ryzdjwmr08dpoxp6q1t893wevjoalrk33qfepmc4zzwav09x9ye8fjmw1tjbh52oiwhfjai39ugwqm86pj0vya8xoe4envol9sceanoahceipczv7ond6z33w3lwlsa14i1kus9tb4gt3uoxd2vvvo5l82xwobssioe6x7wuasbnb1wtxd5eny6t302rg5z7wkmspc5g0yeb9vnseplag6gkefz8iipeid0eavu7ua9knfys88se6dr9m2ub0aqoighyklkojpbfkat2gq1n33llszaht12of309ay8ohqnpegtl54e5ujuou2zwgt66omcaovu1tieb5oa6k7d6a0onwlbpjly314kajupuxzue9bp8v03oldlgtw74ke1p0lo5cy0dvl6z530jnn35feyxdrnjdzi0waqbt33tnt4ymw844b63oc7yh0s08m7sqiangrfat4a3vj9cjyxv7tf1zaw5dfbru4570h7vwfw5xk3rpevel6o2r1ezx5nddp0nb2j05ufjwip54z0r4d1ca9mo72ixd2g94kr0x1qhn0n3esn4f5xzc5bnffx7jzi51jzq8plkddveliez1ufnqgwpq68xpdbqcncrscqsvcicdpagvfaa103ccvp9i3horknv2i1a0ybystd7nfh8d11y6jhyt5c65ywykqu9oih47yx4af9uqhv168o9xj8vhmype0z4gergu42t15rytsxcw7e9f6rny2qz69ls64vckyvtvh2n9jpkyz0dlcty0npb23w3kvnakyyfwcmtcp7jqbmoojdrxsdcohdt0d5j9q25znppf5w2'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '4em4fxt0tha696wiz1bvk91m6l73f6lvkbxnkx6w3sx1wa9kyuhd383j2y8sqiwlahjki5ugc8n6v2jpiarerd82vhcjidx3tck738wan4urhtrp2knfywqc6fn79cgjx7litfsh8k5sjh7l9x58x38ry5ty3oukbn3ew60imk37t0aohbat2tzhqnoiihozdilo5y2j9346p10o5r8nfiibbas2yzwio4ujm6m959vzc6vxtufdguaddi6wxwr9kzbvaadpd2n45kqs0rb2i0x2t5f3mn34aezgbig1ctqg53vzjtg3g7ei9fnnqt1g4umvft76cy1bqi62pid051smwjn719e1efnx4if0pzuxrqaxpii3mlzqcvywhbbir5x667n1lv68k3qioii3wszmk90utqfuliqoxf1izxntjaaj3jrv8rjclf2c76ofgytm4qei7dnwh9r05ne37zgz4djrlz4fl2mtegbky8gjhxoh76gat7ca679a47jxh1h2maym6ifjuw54updu9llmua65eyno92ci7hcz76racnwg8dbte28ohwsoo6o4zavv5j7uqov3d8zns0woj1ijfvxlvhqc6uohicbuv43tnymz9efwvc79kdws5xj8u4nyleliyn0ajsefkdjmjvdy49iyx3tv2gapc9eo3ff3hd8lwpphsxt4jjx73yefu16uvndc9m9fdm62qt0i2niaj8n68mwa0pz3dxgwkbdeyvwlowun6rd3bsdcqen74qn49hpd2keyvvl61maqz5br8j8v650timxw2hqf4k96s4epxox687879npwa7q1yp7zyi79366eoun97ax20h1b9qdj7zxp06yh066nrnkd6d7grkc80himnv0a190crgz2e5ej6mfp39ie1bmzf06hm8baov6d3t5fgknbufukcqpl8yyjxmt0cd49x59dltnl1bt2rgi8k5a13e3pfjouvwtz82jzmx2ifhlr3ftmq5xoceks9lpbbygyzbt1'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'h66e470zdkcomx78j2giy5anenyc0s5xmdu0b5ip37ma938v1hxakqj26btt'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 9988315196
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '97jg8ks9fmqth7wb7l6ebz890ut2gvejfji4m3rz3dk46jvxw9chafndwvzunhwzgnq20l5ia076qad646hyygz3oot6rcq6t40m4gahjupkzc1qro9o3lx9ppa2lc4hv8lnw37ea4hfddg1gczdyw25rbsg60i6'
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
        example     : 'es7hjaqsg80caddhepf910azprp1gg2l57obt1iruvtx24x9homy79x6vkswyl8f8bnmsyh1a86e8nr4u217oiiqfz2p6pe6jcrzwo865fuueimueg3s0rpt8aocj8zj2lr4f8xt1c1tabf9393dkcb2jbl5paf7'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'i7x85ymyl37opzgfmfi5'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'yydxd0ybhj69de4zxv2r'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-28 02:51:18'
    })
    lastChangedAt: string;
    
    
}
