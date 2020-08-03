import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ca360478-6988-4e28-86d3-10aa75f73e68'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'sytroy4575wgvr3ybd93f8wpw0xa71nw6945fthz'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'dcd78845-0d79-4bed-b02f-47a91163fdfd'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'srzmhslrleflunu5a3so3w1manz09jovucdpu8ah01gymnh5k7'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3f03b1bb-71d3-4d16-8ef1-00949a1aad44'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '13b0rzcpxnfbopd6hpi3'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '9hbvr02j14vayvtamschegghkmteuxsk0cb4g6xsqkm0kwt9ucxdlmzdr5981kseex0wyvwigmubeib6fij4zud7a1v757h8ykvx8mvgti40slx8awgbc59bhg65bmz5n8pbp98nmdz0mjgp1z6hyaplbfk9fdzh'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'guxqfsoqsrbfuw0hzh9ojf04co3prdpmb0b1hadf84brh0volyn5zln8smqneev9tau8w0qqibtx9k3gtstc9uqoth13c3dd31c27bh7h2bwvailt7wpzrgklyq0qiuf4e93cucep69h4xy42jyd0mq8qwa8h1pl'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'kdd01lxae2fq5pqf8iqtxjt0j4vpnam647uyojmlabx15tsbm6110u18foj38sclmqsbqsrhcmqglilcr8rd7n039mqr7hgr3k7jhookgt6fkcuqzabyn30qytgrqgr64rleyzhe9zfz35gg66ngu8eenxb6uh4b'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'b6547879-31de-4289-8e9c-6c2a75de6604'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '5e7s5izyhup67jhjfbag5vfwleaw2hpjg5kuunayazwwlvkrtx1tbhlvtvf5qvw6ydypqi930dtg0b2o3avf7ifcxa319gsvcohb89boz6393cqwcrxsjzkuhlj44gmnqhsr2g4ntzyo911cb4v32i9n8z6ebm9b'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'ywiuc034q6d23yvn4euq20lsiiz4ly7n3abgskt8hoh2slu7eq4wct5mjhw9dqlfl6iee35s8gz68cd14tny4r35xuaac0efcuhdpfvzjdy2yni9xcqaa22b7571f2l4udb7fjg8qw80csnd2v5v897b0pv0j2h1'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'w3li2wpz248uaegxvitftx44u8fc0tjeo2j00pvoa65vo2xaszrmrfrbqnop0qzs11uajptif7rkrswm8ena65g0b03ju44us2lnhsdoxn9x55oapto4mok34mxuhh0xb679qznwc8hiy82v276xvhubd8akbuje'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '1y9stulnn46jmsqg0zs0lt1x5pdj9of20d7ro23cqgzebrm0suofgs76hi4z0j1mcty4pbxldy8whphrqnle6x51yrm79jpu6i19j6rvsp4cd14bmrs92ty6zkhhnihox3y6k5iwdyng1znp88u2qcbc8sfrnwgw'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'vnqeyb12y9wm71gv96li'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'ysna7xcb7f9ac8v5wh1dvu36s3067edgy0zuj4f2uabid62ymodvr46edclj'
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
        example     : 'f8ccoyzy5mk79bmdgba7zbsujf3xo7sj1ouw1ro3iansgcmwemhvy6iknbkj'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'ndvvtao9sxpwhbztz515wgg6kow093rhaoaiiozeci7wvl0vosc9sfkzngn0'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'mpqxdp2pr3aqoprg0of5faui4bmr0yft2f6i8io0y2lrvrnm9h4octxy0p5ysmio1f88wz9kxx1jjnvw16hv1mrm8tpldzt63gthgoc5kna9m0yzapntf75ngshlvzvq5ecjmrj61cvp6lau11ogqgla4zpepd6x'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '42kib5wdx0qbhm5n0ci5ivyzmdryy69kd6fiara8lklg4g8u2u8e5gs170835mj2atb2jjb7vguadd2eb6vgrxhlz2vdfb16qeph4x97g2aeiv69f7za0s31ym3419upwl1yeenywhpgxffew9d9pwafld4nc1loqne1ltlo6p846oqz519lpm8hzwjodvcbpknapj359nri0j8zoytxnl87zbaw6pckywzvtnw1j471sdagqwnztejj07tnu53a66xgai8fwwwoouxutxptw2pzv8dxrae3f8khqwxjkar1p75poopactnu5ojf8kjs'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'lda72wsekybpb53j6m2rr2rzz57j9oyjve0afclqvgopol8nxk9pqsi0f7p8'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'l8tsb1wp79n9jtycc4u298tui245vjoptd2bgyrid2m1vloo2p9kxnwmjrf199423gza3b3hj9hlewspusdx829zhgshh9o4n8vrv322trpstd5k5jw5bvumsqy641p9duzivchunblihwrv599l2irkz41kjgx6'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 7294241016
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'ivyyp5e9t19wbpe41t7idcujviic2r4wkek55bx4ckihprpy7f5ayr6uklm8k3mhzua7vr2pw9vg8fdg7t47eat16iqqpcodldtclyqldq1mx8whzeig79kxdzqodzktwnbzm4oyitjc1m1mt2g353o526asn1h28cj4ldepa23sexhya2v2fx4u2dxu8vezcwusnidlax494f6amfnd3dbquvym4p1edq844562ragb1m4ueqxwfikezpe51fy9p0pv3xh5xnrhidppng8jguqxmswytdh3bkifqtswfekeapcato4gf6vwxbjtn08h2ldh3lf1agm7bdaxg24higuqws60xveptsukt2ttkativ2qz2o2dkc30iuoysyfkipdpq6mo0vo50zfnq1pq4d0r49i75xemgetun8786bw8cpvc3llpo5v1r5m9j0ew0amza4zy95gohs3w6v12mmepi8ogqfoyl6o4z9fknp0d780k8rb6smqc5kuqp7ccq4nder8h82cm6tapfhnp6awknzz7homzt0vxf3q6ivfiw2ud4mg7fpjziczinzz34hk3j3h9i7hioy1u7ox1mnma59oamfv9lbmo5lh076m6q5ooya1r1pequ683zccb891v37zn03kadghvvs8il6v49txjnthb8v1e6un4yrt29gat7azxtqvi8q6rey54f8clup2tmkp463zj46q3prhufr5bh7qek3jg4g58267ajv5w11q610fwj0bewopawjzqnjdk4b5fj6ljzqwh3qdgxli1q5i63x2db3j517y8zhc5qevykbdt8u1z9ek6jvao76jfpt8u5iv2ofzm3nra2y37cvogerqtcbim11c1m3fxtpm7zgm0hmfh6hytn3uvjffl0ysmmljeqtialcvz8ygu8xfk66x0k82a8xilx79bm2nwxktt2yez7t48tmy9akxkbdp5qu47j3a4wuqdczcadb29jmhrcnlux71z1d94mktwh42e2nb98qx0'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'uuw1li0mdxbz4ptnheuzz3rw9c0grcz7h9oaz7mpiuarxlex7mol2dlgkn10jmj8xh02nf1u1sauxlke2u7p4qm72w256vg6rsklmpr1zo2qaptg0sz057nfwv0cv43j2g2s4k818d7r0smrfihbjutu9g27xkeox4lbgqzl9wtt7vql32i11rg1c173x24ncgyjii0oxpnlnl12kz8lju2fuioqprul8a9cbod93p0cp7k4arftodz65j3d3zghfekftpd6snls2kdowligqhf2jlsxo5w9zzhelh218enaw2fi8x87n83wkngwvne4d3q3610nduevhermrk1jwqcxbqtx68ykfpn2hrxutpl3r62cv5x881st08vwcdpq7ryd4jc936n5yqgte6j0x4jsd6jwjln8g2x1nuncbm2cao7ioakhgqx97xd6bj2tmei092tfkwv5ft36amcpnvcpgmcxjq4u17l001y1qlejgbyuxo7c1172uucblajvsgzyk9x0et0v0xnf8dzdqw5o70n0ro028jcsesa3fo4jiycwv74nlqg1byxonyyeuf9sw745rh48lw7oysjuqzi4ruqxij2kcy23bphkq3gcykiojritt1em7ejd6xyxrmwthk7ctg5vukhwxil4krz7w9ji21ootg4lat6e8kla0zctjiwc4cay1f9dnw7rw86f833jrxjhkx2390p05fjjdrm21ynk1yqput0irmdv4xcxrbzwu9ys2405tyahe8kwnd298azffo6ygn6ge94tel8npk4bovj4zg7jnucw2rm7vve35tec48ugzqp25xhjwic7hi4nr8a2dm7d9ylzglj5vntaj4af2xgwq9nhk1uyvzjs2s8im3f2t0vx3j1y8tjgmlcmk83l7t8mzg42ihr41fzadxg65vldlbjwxc5yquq070pzvx51qo1pemzo4vk2r079sao8mvcaz0s33ql0ewk12xip3nw3jjt9b3ub70s6o1q72papb9uo'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : '6jq1pma7qzdv5vgqhq411iqip850ekgm0v8mgkgh8smdch87a0o2dy4qx1kx'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 4961292487
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '2w8rqqldbp83l553l782tyvzcymtvxzuxc92e315tiqr025lqr72kqadi918bmfnrq701xr7bfyqrnw529i3ksto8b43q0lq6pwv0icef46kx5hlmx7rh1ggw3xi4zlr4i5blz56xqkni6q87v7doub865uj12n1'
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
        example     : 'ttrznx4yp2kyruubpaxza5ocoza555uf55p94sxv001h6xx5pac3wub2xzsq8wulh38oo6hn10aj0akkiz0mmjonee4pgv9259jf1d9t422z0sek75q78beuscimp6p32j5oc8afigocykxjmbqcq2arce400436'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'wuwukpwqlyedoczeyj2p'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'uznhe946ecnte740pkon'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-03 03:19:33'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-03 13:34:12'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 15:25:56'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-02 23:26:59'
    })
    deletedAt: string;
    
    
}
