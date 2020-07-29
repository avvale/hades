import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '3qvd6qd1w16qaun3jrq84wd4v449pe5trkdqorw3'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e80df54a-9ff6-4112-9094-2d34ab64415d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'laml9s5qp2mq91va3avee4cytmjbpxd5f1o26j0wi5ebdur5ab'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'pmh1hqb59v4m17ad8dhv'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '7oa6yh2euk5vj2u9rw4402vp8bj2m2jpzdzgf5p5rmt45lu9dksw2akecftg0pzni95q2j4l3wimyijiancla9ndrx0u6wmu0yd92n5erh2kdwq9e9t64lpeduf8q8lgpokxki2r2xrve5bc050hd6w22qrvlgdx'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'oiehvf8peisuoao70qhzbpqb9te3ejsyoosio9a8a66qm530zzyc94k4wgquidhl537o4otsekyh0rmlz9fubicf9vp6vj6rgoifwzsb5x0czumyhzkl0wufqvk1lj7u2biu45eb8v9ndgiw30g8qjbygvymfywf'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '785oxlq75xru0um0cguxrgik8q146x4aoyhaxcxh0taltaiviko482lcnihl2or0348yh35ykqlcf9qihntzz26hsg7fu940nkjh7t0p8ydd34wl2usmj5tldqrcn5yixjuuzpnev8wiv2xpvewlxaexcfr0l0yk'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '81f10235-4988-46f4-a5f0-8dac59da6d6d'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'c212xef2gzla0m3wt81cvhhvhs50rrqi1vkhoqi8bt86g1t0jfamowl2a95wcmannueyffr3ry63y1jz3hst4n1tp7stbojs80etnflacj5o803yfsovbm67awcqhezkb60ba7q59kzuxogzg5j0bne8khuxx50y'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '9qe4as8dkphze5y9u6pharhld6ch2jh6lzhi94ofl6cs6q7qx72x1hckev3jvf8w6slqkwn3gcau95oxlom538vcpv8no437zfev3jecz72dozzinxu9helcztxz7a8r4vzda2fjdj8eisf0xj2cfzs5egoa0kvm'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'g2uxd1rvrmikctos4qlgncszk679tt0uap2xjv5lvtj2qkf8dwq75a2isdxqi9d7m7qhr3srhahttf8gmn4cx9rm186bc0kjmi9ag9aay34hh3ued3l2lzxjgvjenci4ajox4f6yaqkj6q6imlmy4zruohp1omhv'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '5t3c0knn08h5uowa2oxnc3sxtqucgaqnf6goisnywml8cxp5n1n9fj1shufr2aoj6t3edp6qz5ga91vdnbm47h0vz82rduz66zzyj63tppu9nklxgus1qwekcct2rhmmsdjt25xkvdmxhs9lvpqqh2spgkvbm8fj'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '4o2gqm6qgkfg29js32n4'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'yi5cx9drqup3f7li9r01i03x4zqq5jk2hxb7y8676rz3uigpkwn5osj5rwda'
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
        example     : 'rt2urifpqnxvt16o79n1ckzgu9u8j5o1oe5h6ev46790xurgb77qpryv4fbg'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'hmf1vhgbyitlao5f14piu9ainer59nhb89cr3zh240nzz68mqqfyj71tljwb'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'x0dw2z09j0qdj0q2ss3lj71v7cdrnuwe4cvxrxy6fiesrn1fika3z87mkpbllbxa7usgex3yi2toxhiov1moky87ilbdsz6cumjwj4n6uir745ifzvgjlh9zc98pz7i8qtqg3ybgod3vilm8oioekxwn3utv804v'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '8e1z72fcgtu37iaaphk2pwze31lfa1mpfmitohu086pjt1f5sh11niui19mu5ludfbtbtvl6e116lhmxkm69ckncjkm4ciamm8kqnkp457w3xfp8tl4xq56v4k02i8pzqhjc77kg7vk1dy29j97kpo10qg13wsp4m0nt5osgh83dmcvz6a3ce9g9jg98xegfcvcvy2z1k9pjyxjjptr6ervfqri3qr4rxdw9ouxn31fyqbfc8cbp3m9c09sarc06rptge3q1h6j7tmcptks8topa8k1y63bgnxb4usjd5t2t08i3g5gr3ot6ca4jyxi2'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '3cgcy5r3z7gxkc0g3vcr1hoiszkk8yy05jsd6gx95z2486ofmr8if4i161ge'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'rgh5fsxabg5zbftkvsmhb45exccjf48jh6syo9h8mtkemscs8z8gkzrd7o1ukake2zm7sgtbbpr6ukv8ye3yl3sii2x0qa0ldha5r781kpmm4sijjoxtrhc9ibcpajbim49vt2yn2v5uk8cov845s3b9z3ihzk4j'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 7124608192
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '1m8r3vcd0z89hs7zqdyeazfbx1wkz6m5p375cjrh5iq3yw9240m7kobxe1k4ijje6swe9nw3qeg7q72z8j1623xhamqiq7zckucd1ndvc2vhtyxu36ojg78o2ihlae0xmdleawe6795s1iausbrxvrjv5yjj86bjiwpn3erj4brmtl9kggjzn1v4p3t490fz8ch7mmxgyxnvv8m72xf0fhz8uxmr1oodk56onp6bn8a3z50ocyh0g2tuw4nn6qy9ofgo9xrs8pt0vmrlha0fttdagurd2v9zzg9cvipznj115a8bp21305gqzyuzgl78gscv8wmndl8wqtoc7ilzw5yawai3katbhgff53ezb87k0qf9x53lxzns7lenw9azy3niyjpyusoumebz0rptsdhq7yax5cira3r3379xpqryltfhaw9d7usdbuxxaardhbkn89tynx0hpje7zrkmbi8ilcl00lxzbjzkd5h90rsjrtmk2jcmqzqcrdbisihp3okto5uejqkyvkrb7pbpgcrwy58bz3n965iu1pjkyjjmqs86j7rk7qmev9ng4n58pm4l4evgch56l1vcdlwjr6gnthd8vvaggwuz5kz9rp0vxx8rb7nxi68slnunphuz852upr6ptmht7pmp8houy4rg5by2km62iai533jt1uflpb3f5wxum9kwxq3417t6h3b293mx6kqdcgulct6ugihq2bh8tuuzo1rd4dz7ns6rpgj38tw9vgnnwod8go3s0ockjnxw1rpawb67j709sen6crio3xly1kyayfstxf8j8wqlw9vq2r5n3ez236tc8l7ktlkk27af2fzk7d2y3155tl9vofd6yryef5hqcrxniya62hsx8b3ynqtdtrtqn267fwhck8o1ac7af22jctzx1au3taom2mf1vskrbkozvb3eupmcbrz0qcfjeyk753erztkdktgzf7hfdh06rn3tc5t75cfan4swm9tphsn4jjs3njczl3nwqw0ejxve'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'bzu7puwl2nbqskn8hvmouq2k1gmbxwzs7d9k4pn57mqshqecsd7ekyvgd2t3o7d4yzfaemdxpt36303zc1krboprit9nsk8i64hkpdpmh7u8s1c73fx0lojc41yqpfqnn2exkq38hz3wznrghr1vky3ufph66qt6szayw12q19yu462954bx58g6zrfxieol3s20l65n389kvx6zye62lx17ne1uwuvkh6r4nn24lee9a00v73oz1dx55udsq33lt1m78oggm7zj3phes8zt6l0xadeqeshrk53vl6sk0w0x4vjmastdm30p1frfbl0642wewaq45bz2wlc5orxe5fhsiwuf8cy8a404z5bz5jb44nm6bfidco53ls1557zv4asbxxgbtroqn7edmcoog3kzf65dq2j4ck3twywab5suqauv8q7d4oe1foe7rdkdrczc8l033mdkh47ex4rekfwok94e6jljfhxmutu7aljyp4ez3o561d0qrpzlztmgsho3l2e18a3wwfudqkdz12w0ksdfp0rvb2zyb70glp620lziynmimgswrrlxxmuqqkcl404vmhng1i02ec7vig7vrjrdjehtl78lww5rc95kqr3ip4xwov1c7drbymfsim2u2v96fpig3j1zq2mcl93ts1hc2gb5u2yt418wzyjs0oy6oyyeruzow8vtms1f4xu4i93pinga3u1wjz1lbrnzmpk5g65cxjmx3rr8753jsanqdye6ooyykl78228afb2xq3cjy38xntheh09pp15vmzsltratraock95he83gzsdrsv4t3uyi94hpz62a9bejxjjlohygip4wt38j9vr4pfkjjkk36leyrs47z3zas05a6grq0pdid5wp79fg45rgb9l6jq4kpbuge51w9whxawgt77fioo0nowvopyoj368a0e65tfqq8dddll41trbhl5fuytcpgc159yn7g962vcdpo67up03c6zjuopqnbclruwxbb7lafg1pmw5a'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'pwfikfmbo9r220g3alr8wamh2splr7vnc6gvgmgbh4pv7hj38mqqq5m59wj7'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 7587112073
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'ldg32zdz41oy26vwnyypmpe13qrlayzcft6y4c8anm0j2e1umwctzm3zopm2uxmts49rlanbo44narbh1si8cqeivfgjqcvkdk9x7o2q85wncf1fujjn5rtfh05v0u7s3jpujyn51wzimb3wcdc6a7he6irmjc4l'
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'INACTIVE',
        enum        : ['ACTIVE','INACTIVE']
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : 'b4a4yxaui8qstot3oo1dwx7id1cc50c3leij05oy0sbxffalokmrk5mu4n46dxcz9k8f38mt0vm0xmk2urk8bqjfpq0c4p66ec01d4i1wvumqrm2cd8aedkjm6nobp499cqw5w2k4tq2f2bcdapucd7ttt96hr3y'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '0f39pezq2t5gvv0a7d86'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'lzx8pavq3p8g3rewms0r'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 05:20:08'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 11:34:19'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 01:34:51'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 08:42:36'
    })
    deletedAt: string;
    
    
}
