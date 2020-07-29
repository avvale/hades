import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
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
        example     : 'lninl73hcui5y48afkcz32lci9zuk3rdnyx34vhb'
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
        example     : 'wbw56v5eddfgsu9b1rfj3b184f5f37gwdusmhg4twvkiaa8ta1'
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
        example     : '9o14hm9qzbiw9iqgnkpg'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '2kevdq96pvhr25zfla27f6tpo9v80c4io3i13vs0eafmxd2b372rhdbzsywp3hjnuv4z360abqrafgmx74shyysuhr7gvewvkym0nxon5nkkt1g8oxnb00vqhkmpfoya64r2w38lv207ftok8k0e120fi4g177qc'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'kzpsjt6gzg1u5j50p7fplcbzao35wowlxgewebmlcp3khtbsj21ufmon3199ov1eipi1f6gltl0fmiqoh5afm6v3sk9vui4spon1s5hoaouefo4pj661bdtzu1upycfmwyehbfz5csat4rb0sn95ckdoeyal5oi4'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ulspijtiber7o9k503iffho0veexyae7glnflnhg8lwz5e15z7j5vlscrm5jxyn2a5lmw0sv79m8wgcoyl2up0qymbgsks3adiovc9ilqytihd1progu8khe38ayxq8b61oehwoflrsvrbxd4nm5ebk83d4zx0hu'
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
        example     : '53hghkf4k9rc4jjwcjnsesslem83upm2g7duxd80g03mcermqsubqwp83wmy4o0ah599h2h0sq04m91mdkv1j4pk6op217pio56g86tlsqhsx5iqb1qd175rpywlnak1cwur1i9321qqe88ozb8jx9yot7bihhob'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'wobzp1hzbljz95pq8iv5j0x65jmidrxjzr43yg5m30ck19v93k2vs4b7s1osfav6vhfqy95hcq5qv277jvjukw93oyd2sh5ovlhvujz30d2248s574r0q8y321k17r2qvlqixr17k494amxqdyo0yochu1x3jkkc'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'jd92a5ggzpej851e9hyzwj2jj5771xdnlweuls4lzqb3y3ma2ozkg8uiv6a8kmej84mjn75tprla5suxgxyk93fhkbuxxnvf0l364eizg6hau4ii5zpp70rveqgvuyfav8pu0vnw3f36tjz8wa5ceg1wt3ape5kj'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ucpu71a5jf5cldojwhtml4ahy7lktj5ew9mlpr5tccoro0plbemgl46f0hpfu2dcyu12hehai70segozgsajuyqp2vzf3zeml8tn0al1np8m2gqpsqga25j01sfk2176wn0giaee6o9s4ejix4j4bg72fjwmf0oe'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'twcu40yltx62y6ucynnk'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'mylpn9hx1iowfcuok780y7nr7sgaxiq8fxfmczesgh6c22w4m941qhgcxrzq'
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
        example     : 'nzaouwxfnrl3oxf73t39fjpq7z3ez30lzjovfzsmsbop85yqkemmyoqrsb44'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'aucbmw4g1wa6np5q3xblk56typb9ln7afs5namuk75116rld64r8a1f4wd73'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'xfmfowd9uv9u2ac81smfteqpwfjm258xod0wa97xki863wbe5m9sq9ocqo0gs4xsf7naqtjq5gobun6eged4hcfej5dg9zkxtad8ae3ednglirjyg1dad439a9nqv0ydb9zeo9sld852p9z311gxckkac90rb3vk'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'nows2c4n9s6oew0y8xgu8tz70ycf0gecik396axb01qqj5u1skyaw2zd1mc3rgcrq3ls11r0pm3pcgxyw13eemhc95829d1a2vcjhqlzm03jsyovntkh94cvxbg7acihvc0olj1tj1xrjrj54rd8xmj4clodh29ihkwdlnvao1kasl5353kywfq1ess1240x42i21kpo0l0jufgcpeemc2fa2uh0wg96v9j0kw5mai5n3zy8pjpwsp9ifgikaw96ypexe3ii5ne4ydd7fhhys73i24nccgg8hhcdf30726fyj584vs3rb8sjzcin9bx8'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'x5oo0d2i5jt7z8hj5ge64yw820rpq3vur1kais41zbqhuv8lge6bq2wvohik'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'yzxk4jp44b9aatyhwh6kisctehq0yb70m3p890rklmh5ahc6kyivthst4o6f6q12f3zq6k0fkz5myzg6wlu4ng4d0mfou8t7nwe82uv5l1dcg1czfeiklyqmewerozp86z97ypmif0drrtvdkuf5py33gz5e5v8d'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 2510791305
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'yxgahjbcndwaxgzxog3nqf73c1rsk19e25ovmkzgo019dt370rdw2x9l2ejk8wqle8crxa49t597yf5oebqv50udm2czg0p8eknhx8xn7scct2gz0ti7krq45cxrtmslo4f8bux4k0wbpeuyfsyxkqc0yknwgbb40642hl1zpj31ngfxl02uvcbi7961b67djo589lz6mq84p19thhakabf2f9cn3sututoypaudaog7ekhc0pn1nhevz7ijcm68bgx1lndoebodm7uvbfe5sv8qv0uu51um6ywllukeh5f3n88qia6q5gcgrrno4ee20ns5hyw83i2pn88vbbz18ypvpjnjl0ud2jshtxaao6yfz52k7kcu6xf295cnz44l8zi2brfyuwqkz4g3dob8se4jxt6h93op9p00cp4u682jcg78x7zyhnxchw2u7nlegexwcslvk48sx75kw3posp0a6wajivxfxgldx6er8vsljv3vuz5qqj5wk3zw63xil29rsw06nsjtwnuruo2mdf7ju3oivvrvm1wl5atodrm37so9aivak7tk4kolsf9dugwtq74huo1ylyv1bxyqym76wi4uac60g7359kpj7s49kgdeanws2rfwf3x8te5ll92kp0gpwdnvhjjf3t3es36f29jol67p0qjvcxna3ad7zxwgf1c75m615osh02cj0cx2nw2tnsa83jsijn8m24lj2p91ii3p13x47ayso6wuzxkuz8q4qiblzxdbxgpci1zltku3ow17eqv7y8qxc9nr0187u7b6solyez3rdib4noi58g3nog7maw4ratutu0l8d2lwdud5we2wh0nezoiq8m8ahthsc1e5blheaur2jgadat8df2esmg6wrcnqcc79dktx14qfoj08epsfy9vrro33yb2staovwj5k6lw7s29uuljcfd2wzxrm7utktmyjyiki6ibiio0k4a7oikflpa88yh3xn4d1wvu6ztcxaixzemp1mstdsjonuj9k'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'ndqwqp0fg27a8jwivdo8wluo2rh35yr7f2d3sbu26s2vc1dm55tskg5u7wpohu1luiz7r7w4wdtg7p53d6czmyk5tm25vhzh5kkq1c0jemn47qeox3r04mpn2b1jpco2xnv72qxckhl1xxu963as227lxulq1hdwoqy92icyi3sqvzj7nu5g6xf8v6serqi9l7iui0w7lupov3xakb9w1xl4nn1rjudr1333g4tru51h3d9kd98z3c6cerl3r8ngya2iysmqyofjdy6g8th8m7o9g4uvupfcaosagye8motkbkstjajl21ao24r66w37e5szi4yng2y3bv4wkhskz7d0zv1voyxy6q6v0uscrthd91ivkg945w74jge9cteuzoqu2pezrnc9d1bhnat1lkvg7xczdkzh2adj0rh8xwb8k4717eqbu1bmzo4eg1xbmd78903yhg46cbpecgr0xhfwhgb4pyswym8w5wjd4lz7gx8awkrnmeoc3fiyq557cqth0ceidae688k45zc27vka3jgnxgqyheai5ehyb1v93koh13zkcdgch8xfb3oecd3zan0lu0fiv1moxwyy8sdudv4jvat27orhfqxix3msjbicz6wkawcykxa8mb1at03zbwctlw4ny0ir039g7naw602kfcn63b1j815kgpqb5ngwwfd4stqofv894gg1ptmn9id82ioklkj3t7zgrhkzc2g46xc5o1qrmy2us0kjpf5a5gyjmeh8mfhwai9erld1jxqnl8mk7x0vu8gi8nxh71yikya92hcr5kw8xsg20zvpy1lf6qseln04swzydwr1jt6gegiyxfc7ucl4uwrxs8ap8xtfhz4bssfy6miusmrltuwojotgs87x1yi5dfa9qdkcioe6yd2xjzsw9dsio74bzfdk35msrgt34pb6ag4iiesd2xsn4a1cmggx8b0g9pzohv5da13s4xxrtmurpjea6dgsa5yov5y6lygxgwmbjsoacdtmwmmkfwil'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'iem1jprwbc0dlup6kn302tu9x5e1n59ypkqw0q2w0i4qr62q7lgftv58a1kl'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 8222286334
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'bveqf2k0lxua7wgqf0n653i5ixopr7htzdgten6efp0p426migzrdskxbd083nqdgt8nfw0yzbspf2bt92dn83l3w680v2kdykdmqr0eci5kul6jikeojh9r3oat3ps3h0kdir3ywvd3uefbhb2r6h13nfogprzd'
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
        example     : 'ci2z0aca2rtdbbf4l92oiqm7vgaxj50e7bo1w7nqoemsvw0168xt9by0mo0knonkccerdjjdhte1qyt5wxhpgrjpdj81t82f2gqx6zlhyybxcvkl23t5wt1xhbo12fc51t812951zl6b4m5x18qoozviqlvlp9n3'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'd31cqir7996gs1cksnxp'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'mx46awwbcyj3tj9x5t5p'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 00:22:17'
    })
    lastChangedAt: string;
    
    
}
