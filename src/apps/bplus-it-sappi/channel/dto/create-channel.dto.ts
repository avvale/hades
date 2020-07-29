import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a3e2baac-0094-429e-be55-676876505a68'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '27h491t212i2kh6v6gkpqvop5hstab5g1okp6a7g'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'aa4097d5-332f-4666-97af-11cfdec00c0b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '8m95mdu2v0wngiyyuea0ymu8anbbaij5yclpmf7g4qr7wyilh9'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '8ca98ace-a2ec-490b-b8c5-e4509225f0ca'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '59xy0256gk0cfs85bqt4'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'tieqfp9zp85kasnjw3xgda5ko5mr30vxx7pybb8xtdb4si45x3yy110kyglk1qr7rqv4rdb20ocvlg5lndotqw9p5dgbhqam887v13i1dmpvyy7mdw2t7lkrvdnmfrf538boqxuhqfhimxsr90k0e4wn7ojqrtoe'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'ydi15jeyvpln0l1lv0w9lkdrfrm9bvcq9o7ah69hcrg6pb3tyi94c7dbiid5158v0ujhibbkj49thlfzalpea2ssex71g6cb16hydx1f07ay1ayrxq37v3ijv8bhigvfnnueyd7vlqrq4op7l0utzoebejteozw6'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'hn3r4nqfiketo0iekspfmy93v7njeb6j45qagq5ihdgicaktf7wo1tjuzs0l7zc8juy9dmlhmgpr3nrk0ukhlp7sd8a0pby02mfre2x2rxhz9odkkb997ujw79esfcy6cbja3c3azrl1x4l1iws2pn2nxzmlbll9'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'a1660578-ece6-4348-8974-cc36f4065216'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'mx6x8svbd2h2793tfg49tceea706jjlkpp7m8zbctncr9gf8zl5x8swl3jo3938eaetdbf73hc3iz3d2gchhp233bp7mvel8t292ujp4ju5f1t5duiyorte2ilf3ta44lr8kv3ylquo19mkdddreai5ftjltpm65'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '5phkxl6jghl46krykfzg3qx51ab1h4jaocm47lqhyqy0els13zm0q5qw99r8tim8ll48jl0c94h9u7zwvrt5njyr6koz984a1041jucfz248d5n4nlc545fy2prvzufg5zk1eqesu0y49dqozsge3vj2h1gcw5m6'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '6qjaj50g1mu3ly07w2azirgrsolbnja1o16cdpw1y45d4770jhdllso45grmcfcc39s5t457omp7wp33hygy7vsv1xkax0nwxjed4q5d52kb1ijufjr2jiptrr3fchya91ct5roex94jzmf38fp8x566jfdhqoxh'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'djzmqzpqoo7tvcrjixokfe9b030q62syabxb53qei5j9ey1t6laig5lcbvcnnty13ejv97e87u5aqc3uioyjompl2u4w5qwptk1fpf3msb7xncwz9m0fakv60217zwwp0siiu380wktxewbhzdy97lauob8ow8ag'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ld5pxeyf6a6q121j0jv6'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '1pa6hmpt2vfh51j4setec9yb3rbqfy5mhl7cj7hjqezxc5ytcudhecl2zbhp'
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
        example     : 'ippxkxkxc51m2t0xp6gkvsr621024dr6to30gjq6oowhfymxnycvg3y3zc2r'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'wycgqf47775t033ilg15v7e5wjzj6d3s5qfkcgjypdxzx0r5orwdeo6rnkrr'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '5cotlde2p2k67e3evetucsvyqg2lp7zg2xb4h83kglojyhvl7jysphx063ufcy3xl3u5f51obhq8hl8q0m2127t2sebdyadk9xoksf7ybb6clsf7scb5fyr7num69cy8oypt7g50kcmp68n5j4eam1k10p959la7'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'aa7i1l4suj46lyi107r7bygje86bkbcqam5p28o4ubewa5x2cv6esj9exnez6ze60vek2bmba0fwxcqwygnimppxggrd9pqo3xd0nd3rrr44xepvawu86ze2r3hkcoy8ibaz887gf4nerhzj5zef7ooi6sef4586b4vl143rhjgpzwfxez26t8088twhit1u7wai26xfj7mo7sz9litwbplfln70uagyjgv7j5xkx65qkc5rp12njx2kbs6gre671rxj8aiaefm8bf4mndy58qrv7k960tm7a4ohfs7dj31fj4fofj0frpvwydyxjion'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'ogp926f9v3pdnepr26e5kk20mdms7umrcv3zmgzx3vdtsxgv0hjnlveascn1'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '0rdrhwsd534kcuntt1g3urdxykxnkzkf0ir0iuq0i4uiazqib173p2gzzmxutomrp765mww2ic2qf65kiwnuq7p6qs10phj0vlvnqr5i0zk3231em56geke2qhusozcwhb66px41sgf3cz02anv918p59py7p5ly'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 8045421093
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'cdx2jszx3wsie2fuuw8kieje3zrj98iyqbzka53gg60gjf7itx04z2i12mvec6wa6itjxdv1x08pb0a8bdqnf5rwvfck7oxq8nd45y0ggogqa4ywamyeepymjke4e3zerbw6t6mc9gqzwuzcneghprwxbphxtynlm6cv29dgc8s6i3x8mbnhkkvyzfsogwyc0p2m8f3512v4o3m30rovbs5d55kc5happdq9dy5ylxcfs56447t1chffy40gt7uo5ovbg4102otnc9pquciiy0b5zqiisjek0blakxxdtmjbwl8zffj3k0ahdzadju7j2cp91bsecw0zeaubmf1wdxe50rsqc533ija6oey0f7lsbcxdchq37ph368u9e5e6cuvnjsqzic1yzjjcedwh0iondgqora15fj2ahp10dp4i5z2mop76pshmg25incvqmots85bjctttvg8nvi2xf53tj511dpo3odubspw9jyakrbc7k5i63wulqgwg5vd4w0q20pzhwpzk3bi9uaa0s28f3ow338gvy9iqpit3gpb4mmjdx4wzum5zdr5ppq300mnqgddusfr61tgfu1ubcl3zci84tb608ad9l4m6zytyy4ochasvw5wd1hyshw8poah7x6n1t9r13gb3bn89czvicky97xu5wsls8l5mtmzeo2m8ud85utyafmh7zma8zlc4kve593csfilg0nj3dcu8kudk56szpz8lzhce6hssk4m00xnaf2kz2gam6kc5f3ixf7xbyyzmqxdxqtrsnd1293hxg7a4fe1f7kro4d0vf5ydll91uar6mbwn6fp38rhj40lmim69kftrkrgz8oek7gw8gmjrgl728dlsj3td358bavjlxs008vde11baj3zrh9j73fl4teceptfbhqpkyo7jx3wnntod9bsnm6gq406y5mscbsu3f04zh1stiga51h4qemtlxgndcewuq8l8eth99kcpg606ph4ijeya6t0u2jz4b9p4pgpiyb3u'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '8v0f5uzfj9mijuuisstcougmaz2plxwa0xldq1rgl745yqyqg5er03dmp2x8lfcsuml4vk39hp7vdy8sjde7fi827tfxlv88shn8gvu6eri06jhcobi8efmos5owu66v4e7raemyd4l6l9ib91ovdvjv5o1hl56jmxrluxxok2kyx36fq4bfj2il9qi9d1j6hcivh92ku5rbqu64cim67bh97bs1en2euyauhucrl2yfubislgnuz7yj5td8dxcjyi5ogqr7f7i5m4mvm4z8axej2uqy22rzer2i55tcu5z9b3pu2cxwzoy2gvcu7ajv43eqnzh3bato2tlbmhd4j7of57slhi7bmc3e53p3mb71tckccxyye464avkp9en8rgf514qxofp7ccr68rrqp30c2b9ysy9vamu099n0lulb8jiu3nzsubj2ndqid80kzzscfp20h4a3a1yfc9w0pmjbjkib3hkpii555ur27yg8j080q2ssfbs0kc2m0rw5zca8wo2wcmxig197lcr2dcfbyw2z0dsec20fpdwijsdwczq016j7apx6yeb9kpb12f7r8hv9yde8dduh75g7huh95uaiuh0eeplc9phky8xommilvxw030llph25ezym541al03bikj9s2v41d0gefnuk9pur9z6my887as2cxage9sd4zopqc5ilt3m1rlrfsk3oukulckji9d2r56hheyv66fgvlxuh4cwrya82zjow5q5ctil4fjz6acp3x4jsxkfsb7b3imiizbtvgkjl8jy9y3v8w4nm9nwlwxdq84xh9at0o4vrdufgxnnhlta8wmuppstms4lri4kb37mtdfsxxn8afhajjmar25ve6tkrb20snvibakisfot8r0f0gxldjw1z0hti5kkvgu6ubmsmqk73sg7jel8gtw6yn1h9y2g0hnvgspyfogtqm1zap0wj42ti7mr7t2c9emapxqil908nkxkt2p07xnb7klnmlp452oc7tlnwq7c60zm'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'vvt67bkj4m9w6uxppoat2owr88bz4kh9fvo7iwcv0t0jkee0gfttxwp05q9k'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 9070447672
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '7s60iy2cy1hdfbxttywonbhvh0nex3wxqt2sochjss8jg1ekjmev44g0v0g3t779v8mse9ebc3y0c6q8masj42pxtriz936cbmscs1bs7hzs0bcvoa1ok882vohg60mr3wrg5ube1qh48hx1orutbp1ko96gurk3'
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
        example     : '8gonauic33jsnxne7ltpxp4qg81a5bvtnxcm8wyf6etuwnt8en259oabijke6sys8qvxcfhlwhuj12bdze3er9ewdthibav94o0pwwppkqrwxg10miogic2h23bz05zvywsmq575bq1wt7khxyv06wg15b189tdh'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '4ya4n58gtguh2152fnk3'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'v5uxmvbottgr7tvxsy2y'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 01:02:36'
    })
    lastChangedAt: string;
    
    
}
