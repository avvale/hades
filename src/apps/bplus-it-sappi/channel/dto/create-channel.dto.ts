import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '45432cab-3cbf-4959-a610-d4e20c8e41d5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '5cbb515e-71f6-440c-8e61-812ff6425ff5'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'yn0osawzgxd8f076pz028u2o19yr1gtb409cuyqb6eh6csz5g4'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '06f913b4-64dd-4e92-a51c-a9a9144e20dc'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'n65uci1ura7kg4aag1zu'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'toe29kcy3lktzcn1bcm0gky04dso5o7gt7m92roewj2a9m4qaxg5q0mh1m1lg7szoc1j7t3qxaekexeiivfv7l5zfyxhii3ivmvsmf679xormpf1rg0d35uslbdnmvrs81y6fcqr558f9aknb4pbk7szvj5tdocz'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'm0gsnn7itsg37hq0bjt8cc33m6z82kpmky0x9bgaufocc3rgehl37amwtxlqvh91eeyd7d0d73tpm7955lcj3s1laoday4meuamelcokykg0j7yrwovmfz5l9twpfp6myxv10vsv0h9t80dktiv6yg819gh0aups'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8ld8cjltmxpdnh7e467ddd37h4m9o1ogx0leuov0re1t4qk69xb68ww8pj5qcqpq0gq0pp3kpvsmxm0wk9nk0jhg3m7wt8caknxjtukyypllglpfxh7yxc5ddpwhy6rtxb6wm5xd72zrk5u9bhuain0r0j2m3uwc'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'r3oynysqtr4is1o4hs2ffeuh11h066928x9f013cknrgmskffgom1devemtuo2p78vs8bfvqwk3n5kxfk9q73tjdv38jdpe4dfwoyf70c2dh1z6brls5wiovq1v3cyrpzfk4h41azakrbwsf1lb9xb2lk3qpi9wq'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '2yj4shic92hoenvfh22hecy3sejodw8iyi3ujcnj55xpxnf98b00gcsahz6y1fc29xarape9hokl1fiv42u3g4x35cwakdsjjyqm5lz0vstme0iwvglums4g6dwjvnuu19r93txx40nvfszx1zgeh6ucliaed00t'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'i03tzceob0fr84itw9v0yjc7b3s6pco2m0q5sj29ciikvad4mwyzqp72916ebnuobe1itfb5eecvvl5og5bippwfgjq89ruyqnahc8cpb1rii4ywzhs6v5r6zk9vkbibv6h4ht4tchik355y7grjsbhpe5r40cxi'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'bwk2a4gal9xk3r266z14ik11j4fh8jxoxns7sl670a1flxrvdsky37z1ttg2qtcdoz3gjlt1jstfnmjwxq70yz799s0405zhaiphy209xibptrmunryching8hf1l4hpoy03oqdrm3afzqa80plt0rilrzf82xhf'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'tipk1xzf4c1lyixktw3y'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'mxe2par3k2m8ant4vy9dlsgbgtqspk6s99zoc0rxri91y1umcwbjf304xmbs'
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
        example     : 'cqnd33w4kecdp98mo5p5r0mn3qfruhsz8gfcmv8dgq6kkwyqekep13gnbi0d'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'h7jymq7vhu940eqncxiaoly8os3mr3pyhm5qp5upgoirx986hetuc1ud0alh'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'uyawxshfajh1nt5fbifxg1st2qrqcdcxp7fxfzjpva5hbmzfa8m3mz4rnult1jq7cjy0k5xjzcyuzgorjbrhln8pv5qeqqj2zz8nzhh0dqwiks2drg0gfaba5zaazn1urhf4d9j1xfep28eodg40rfireicgzt1p'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'r6iogt2lcn29d6f1sdrovsps3fob9b3dxvrefncn6r0er0wzeowawgod0w0f3wdujb3sgdv3prjuorjk2ixnofpijf87x4y774xskequs754m89ll71v311h3y84k49vvvytmd3phf3v0e3ywp9vo5q0uiufbohayz2auk6smvmzwymp6yhqhv3kt110ck2e4ezr7e2yyyxhmfbza8u0y8li3b4zvxl156rrydic7xp3eqvgcptcodgrad4ek0ydwz4zyvmbl64nqg4zq1jkkfc9tasmuz7z1crk1odvhs2sq9g8f1x6yiwbeajwx0eq'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'jz6qyrhlukomr7klt3tv5ivotdl4gc2gc4n8svgz7jpma8bn6vcpjuih9yr8'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'fawcjd8b8fua0r0jfuoa057o8joc3uc0i5zd3orepaiw2womd8kd2dmhif1fke2lo00db7fsqvfpgrjmwr6bg37l4w32az321567afk4igk24k3og7d1wgukzrh6fb1wbusww5ofwgri052yivfquo1pyg3qd4ut'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 4858963136
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'l5mqxrhpw3y3a26vg6rtn4bwfli09hzxgoqgemwda11jbtx86c9g4v58b0ytjk9h2hd1njnvw5cwcz87obiyx016otfhhh544rgopz2oif69ff2d2k61g23ksll9gclm8v2r9mm4zxt1gqm5bd7nh3qdg46cwtm5vxnunqtqnf808to9c4pt0960xaq57bfjn9dubnuw99mbnbxvqfyc7tr9vxdxhbu37b7n7ux1bzdlvvwin172cra3rdlqcp5b495zvy074ndsrxu724gt1jivloe75t8oy2sinkohm65tc3q0xo59gn03cvt3jic34dx6wed513f3xtfwwj87uuwn68lbz5u1kr77rpucmana1y00vmfbdvwvirpf9jw83j4rm6dp9ut9olsnboulba3bj435agppxnnq1t1mncw5jagplckqqvxysxtqvzpzbwoxw0q3iiit794s1hjrczmsxysgy2k5krkc5zy9isjbjljn2e4s0i3kj32hfejsoeyduf0dr17qawq70dpw7rndqg7xyeom0avazd0ju8e0p978fuq8dv3r7x0x13d8gi5h3s7s21ckxhdx3gfb011r6v23bizseljs2iy60bgxepdii1bsopjjf472f156wtqj5eevo7rbj1t6g4bmy391yh1e234iusg5q4ppy6kgowbp57sf87ce8blyw63tmxlbi4388rx84ssb8390u23qqkzxzid6zsn6ir6tfprrjbxepl16jbvi47jzs0qsrgps0iew56b3mb1urvxh61i44py0w1c9invec7nmm70w7q9950k8s37q37zasopl5r6cew1wmp4o4r3wp4b1lj8o99hm48cyhdmuixayv5hhggfd7ljiq4arosc7561pr9kcjgvw0ir53ylnh2wz8702ob7gnsue41n316uxkjm7b99mysis7ptumt2lvwsvrifes89yi6w5gbyqfwk8n1ecyjtmagvcnc3vldhzr7b17ybymknt2q5mdkiat48i'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'buqy3djbwl4i1c6wyzpamxf5gme2o1nmx7ov24qlarivor9r65rrlxmse4x14jpqgz8bxozv54m9ff2zszuv8pjxa92ihmiay4cqm8kxd5k5bzdtyezksqlw8jim92ckhkq7txxpdm2n0r5w825s5nvl5hxlonqaddy9fwy5h4tsu7bjsehvxku3l4orxhewb168x0ovnbp59gvgp213awrax54ibmcsvx26mfzm9yplo8k04v85k8gbh2lnupty5olxkt40gfrihr2awb3vrvprkqoju9tiojpuq5s80itbakem6c9ow0qxx94aduslxmi5j76gz9ip49z9d1zx7tz5niv4zspmyasrl06ikuscnuf8zvidocfydvyelu17tqyr65ky6zsi6h1vvewtfywlq2gvxt5zxx0640g12v2p974opjkn0vrsiltgpcf5phq3yuiql2urfa4cftk1pwhxaxh2umqq4t2knv436p7j7aebh36iwrf21fg4uzrjv8xrfxtchahs4rnma07s0juumopyj4vig99r3sqx3p7meupheekupdf110teq8wfcyf3w5qnl6kbf6zhtknsnhsl3p9zoqua7b9exx5ffs3t6lnhmubcauvdsijdnj54gks03r3yqmaj3m72h5yct7p764xz1p7u8oh1lrvmsav02ew7jhqxrp964o2dd12hjkknuy4nsh3ym1hr4b8t0z3na6j3s67lp8sv0yt3kj4rm0b5k5nvimm7rjl1361eu28i4cp1ojhujknsblmjc46xh9mys2e25o3t0hfasigdrssu3ilty5ejnipanlhgmiua4cushnwvbcvq0v023mfsupaj2pycfv7icigye2oos3t8wkx6o65qr1tww3l0djhn190w39wvqjo4ece3iiywrwx94rezfsqcfaiygkue2rmc0aiki0rzzt650yctrwv5ynakt42bp2xh9hhzg1bp6b8ag73rku7l6juw1z6t0357uzqz4supzidyzgto'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'qhe1ozo9l7rz1w92e6kt0nwsjz6isbhif2c51i6ila1vv81p6egrdltrqyur'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 5990127064
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'um1fbw21l5br4tdi5e4uurn5g16fydgkx2kgncpf816pynfdyjamqmiurrqtcaxf55lk08mlx63pkjdfms2oh50sgymmbonpbe40s1en5x50qaf7lcratn9eq5q7amr94o54ueww4f2ds99jo09jxou0v3tueg6j'
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
        example     : 'jyle5e9ni27dse9l4c0szynn1pddle3c7llveetdt64ulisrs4fs9s80b5o3jx8s87x4h2kw8nz8h8il7nr4nuwurds74kp3ufcijidfjhzn0cadwyn6dbz8wip6cb7gxo7gmm3z7pgyt887qzruohjcbasbihzq'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'kqz1flxtcwilgxn1rbvi'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '8u0njkoqvu1chwx9ts6j'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 13:10:48'
    })
    lastChangedAt: string;
    
    
}
