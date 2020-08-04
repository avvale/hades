import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9343c62a-8471-4c7f-b50a-684143360b12'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'lhssjz6scrxr1ewecavqm8euw5nww0eeph38w0l5'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ee1eab2b-897b-4450-9475-b9702c3d35c5'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'img8d5wzzjtooec6tiw5i173n778dw4ge6nnv06e3d1dt1l8oe'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'ed4acf7c-f224-4408-bfe4-408375cfd2fa'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'o6nzhveqftkfic9b3f2b'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '0txzz8e8vu7jgnwkeyorg7jibchnt2sp7v9uhvsk5rqdhze4sz00wzwdfky1kx175tld9jh86n9rixvdsnaiwyws2du9cz4qd2kd15zhj3c443vuhdzlya5ulpu8gjq1xpnxb1e8f010rgitzlrniaxulzip4ozj'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '0f29tfcswd8o0a0htzdu9xeg510igb28h0cnmzgtfrr4olo1wj4v3j6jgj3iynwgf1egl8tmcqceiid13gm7sjuutqzs7acbgygfq1vvtk7q2c2xikfa51qvwtevht4pahheqh8rxkr5kan9qyoxu29pcgy98zgs'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ad0v2hn8yb39ovc3cjbryht12sj6u5kzdsx8bj2uofryzrg5d5jzj6cm2ea3j1wzxwtlh28yyk1r2g61lc0mdcjylzsplxagyk92jvabo20ylvdws60vzgomtmnrslnf93nrxst4856yh5v02oz0gghs7iom42bf'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'jdhul6aydwuc8f3cglt7j0f5sc6f8g7hvlcbcruu'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'spfufsdvmu0o3gegi7ek7sipqt6xynd2xmb86htiijd3pobqiahx2psswm9vz0cs05c1v9390jggiyfk8yc0vccx7mii3kx8uohjhjk9649uxvqo0g7lm6w2zqje2xt5b241yt3cnca5hjp1lr70uuk3t15m00b0'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'knj5sv8eobvoqia7jot55k4qpjvgsu1e23c7gg7hxv4dpczri69uaj7t6ejie65cy48em67ck93zl6hpx35fmft4keutfp6n77vzjrtl14pdzd88kvqthm47tsg2dz7n9w606uq2r4pfzigwh1mt3jfuwnyrqdvs'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'r5vj79pb1p7o94ke150cq8zp8cvj63meanazg9ofddu1tyye4lh6u4jm7szdbuuyk5afsp843qzcz5mb99pxiw4lmf2d2vcllvzgbtkdx87rxhjo92zv5r2827175ar3caahpvxjfq71f8j18mv0encmazwb27kj'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'tlbnha00oc3e45gnkwtui8pdxzrzy1b65eohrzwoav07ko7l8wlqrdhum1b7pxy8877jt4fn43ht81mgw5m2r7hk7rzww17h0fi612n25ij2nlht2zh8c0cwxzd06t0xzk6inx8ewew83oanjbhnjoacni7i2lve'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '9rzve43ag2c4qfq03c16'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '5edwg32equmha8919598puwlazzwos8mkrvlp29wl3qtd86but651vgq0bl6'
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
        example     : 'ckt1s0tz7xrokp0r03ko9udnitajyrw5yuh9crlu92nrt4t3i5cl2474ddzb'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '9pwqp734l1nld6qj9uebl13x0i8vhnlkrbxk83sya5vf76b928i8gn99cr0d'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'w7kldq0vrz9uxjlh61i77r96qrhrdx9f49ctmg3i7kom8m2mn3oae81ds3x9dduixxsyoh66xvz26m46viehovrfhs9w5j71ic46otr8ph88u8u9psienq8omtin66bg2yejag64c7q7k2yfh3v0qumwhfg2kp8h'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'ssw0bo1v9x9pso6r7cdek3new7yfcnw0ty4gih70udnwrl2gzbyqys5ld5nybi936t7zmhtw3lcx9prtx3pbkz5ivu15xc6hq03isyjzjxpt1m85ektqnd8t88crf5nfo7omoao30e75zz89rivhc9xbqo19pg45xuli66zfgpi2tm21tvs8p3qmj1kahfxormv5kgf3u08g11kps5jaq71mkm9w2ptqz3c43q5yqwd6e9zo1lo29gt1otx4vh17up6vsn8kmavrap8v8cq8gohnof3wroecwqj3fsywei0royykbichz8luxgwaki3o'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'h2w2ghdca2d58kry67vpv7gvh6snh273g6fepbd3nrs56pfnrtu2zij5xva2'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '9dyekdakejhmoncbgnhrwzvrafddhn21j1wb1mg2xc1et2bdz92r3ztz24r5e4fgezdgz0kp23kqqdiml2avnfbdlhgqehdlwk8dw6hhyr4bi4kgbvu5f2schylza5qkvfpj87o8hc0bbs7b9pomuypk3fy3tqe7'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 1621964641
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'cu2c2ztb7g1gqg1xq9vhn6pj4won3myunzwf1y3nyo9ehu8730uojn3n5avbonprfqydh5e8x7uzrk1q7t8239pj60vwmutbrhu1lkf9r0g67d85jliu386i2n98ijs7nnnn3hir3rzim5sn7819yagh0txa3o0d128mch84pwa0tsmpdwsuzyocrn4jj6ydt44facbppzbf0oyyeuz1jn87qnyyxxwx2o5xqmh5hp74sqetpdsaue5tqmk75o41na9o2e4xz2e7tonwz7w1anyfon530uajvqqu8nox9x2a2895982iylzezwbr47q3hzznt78s1ocm43tkwsig5b340onahmdljyeu9fh85fokum4aawflqkbzpgtwuryjvkvkcbwl779n8t1k8bze8ajhjr0ebmwvbpq00usw8valwr9nw8cgpipwlbb0ncqbyfja4vcy3j1sazaib52rbepqwqge6otqjxvufhi5d9dx07qgd73sqph0n96qdlzbbij6iqr7r6mmcc6hd9fm9lhfa76lpa71r1zyhyf76ey25ryf8eba0kermjlw903505e8evxd6j3e07aqmny84ht6rwc8wl0l8b35ozi615s5ggl293dde50pxxa452kzdad8zqwzo1mnso0kemg07q4hy2mspgs2cdpv5ogldlay49h5px3cgsr9c6e5zg7kart4qu2xozjy55oyeouimpkmqi61clqrj5xn9ezoy9zksp2qsyao42eoitzdsxteoltdb5gwk145xzdfww9yc36vhnovwvds5jlne265pik17n7lweze4zqycc7xnx990t99a53af9dfketzrdzpbfdmylx6al2hezjavd3ybiuo09zm582frclf0ezoq1i2k4akdj908lwnzrb15gy1i4ttqsli14684c62ejgwflooohpyhqb39tp0lskkg8mppdieoxhq5hj2x31khij1t748f4pdx1b1ugowxuyrpr4j1hlanerle3qle4cxzxk4'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'v0mycjoodzozrypp6q61xkwo2gqm83p2kobfd9p2nq9du02as41mtg7ckfrinjhksapx750cvpmoukzbq1o5k7s51hugl5xnfj3phao7je4zxnhu67lb2rb0ntd6w2ndmk42xorjmb7ix6w8hvju65i1qiycaxfhqtt9ewm4azdkvh4wgw3x7qpu7beqc3fbyi6ck9s97q4tmjk6eeqxg3n5l2lmlu5cj83k8s6eluilefnq1g3byct78n90b42znnnoi8qgiohojs40dg5adsssu3i702nxen762ngy2bocywfamr5uf6bz4jftl085nc9g9big7ljx5iwer9nvtb3w4zjd0rxl7ozxq0mw0dnlgi3ej4kf2w3elyoly0i1o45n31n9gwxwg3917lqxrsnlz8r9fkauuyp0r6h77s2iocff48fvwd9nyque3lpntvzihykxf4g5iznyzf8qqub87gbq5u55oygbsfrnsi82axcvi1ms3h204j5tj33pgsiw0h0iptwc19rocdmsjzdbwav75tokzs4omr8rcb9uwmim549pp4igpxkblzmf60xi5ardeqfguveykuzgcce1teu72h7g8bjbzv106ehpfhs6k2djdg6kb1pw09q4nu1owfkt8d73t2lt9zblnd159x5y8w1gguwq2ofz34cbbe9twbukj5044t4qz46fzvbh7g0mphayg93vlpber6d02tow7utbdq5ltebez0me41j61k29jjs25apoxtl47zdo1ix95kykb99mun2yvq5mskvqexnfhj94pbhu82gs14q63c7ihffr0p68vrftrnfbk3x77nzi59js0u62s4av7019xbbeghbins0561f8qzfcpekvgkfb28a6rmcnrgdb2sfsj2zf2uo3060oi19w5916iy3t7jxyo03mkmjmtrk4mr9vstsn29rp176s80lf323htbwtls53ngqwo8o88eqx6szj2uieze0qlp5v2uvoa5d07rqx8rgaws9g'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'wx2filpv0z3qmyun3r40nskltk693oiqw6imay1cp9pdzcq9vek8vu3djzan'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 6650175284
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'dahhu40wxvss07d9z2qha22elc2jhonrnfa00fbsxdkhrk5uokwfdtm68qopfduz2lwmtt0f7xshr22v45qx2w4e6882xwc3xldgp1t95165fty5f4bgzapq32bslfyhfmyjq270ddruv5d54jite4tnqe1a9pxs'
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
        example     : 'ralqdon1hoqc1de9mvzzaeui6ygvro212d2w0nys38mpwgo4mcyk1nh4c9zm6n6xxx37s9hmvikxi3cmexa6grnqhh5ne6yhye72yrhoerbu1y5ds7afdeblh2gvphxq3t4yfow0ej9rou5onck30t6a3c6xg7pw'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'xvcpw4fxthg22w0w8e8y'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '0qsvs8gbiheugd8dwb43'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-04 03:13:47'
    })
    lastChangedAt: string;
    
    
}
