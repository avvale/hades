import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '227dd6b3-43f5-46ad-ae48-6b31543f4d7f'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : 'dad995ab-8a20-44c2-b73a-a37c488191c2'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'party [input here api field description]',
            example     : '1uafbu2iipr6xw6btpeohe84nh0r3w6o8vnkzy2sc00xi81hmj6l35lqxwvzsovx1a94jb5o7hbg4w4i8ba7n005wbhc0tmis8gkco9y31h5yn3imtni9rv69l2r8vss0rw53q07mj6lh6yd8e42o1zn1c593iso'
        })
        party: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'component [input here api field description]',
            example     : 'qxnwyqf0r4n4xp0imjpwoz6n607bisukm5vg02unbex4sjgale2er7tkdrdmhn5odl0t0fm2feu4p30skjm2nk1zgf2mno1heux97oz2iqd5e3sxqrlmi3pme55at5uao7dgzpehucuof95zsqrz0e6owga04u4o'
        })
        component: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : '5nwgzuia2kn5cny8jb5kmthmhnwnctfiqzrhqxmr2rhil81wexi5l3gpmt2i1upldhkr7fg74w3hgeykye6qux4303p22yc9npj5rkhzuj9utlrxo319hy5p18q962lu6m9vgts7psfnh5q3s1amh3qk3y92cud2'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowParty [input here api field description]',
            example     : '2lt5fo9zrrdk5m8uab0lcfusuwa49oc8rr84msn8pll8zoidrwuzjayzbfi4mx5uroc5fda5o7jcoah7unbkhzd30piughm7ayjkstfgxo4gwd9duqs0orl36eo79jus9tqp919o4ie69bdcwdlbg0zn1ccs2m9m'
        })
        flowParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowComponent [input here api field description]',
            example     : 'ogqtw0sfknz7u4iyja6rh75jchd5j6hqd3bnltz5x1gpspljidgtn1yg5sf2zp4h8oxsodz2urmiyet0lb6jupkis5ak800pojbk1xrl7o6r1iqvkm14i1etbqjb4nveowtksu11wvkfu0rvxcql816196pxn7rf'
        })
        flowComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceName [input here api field description]',
            example     : 'vldez1srpvyxg9r0pnqnaoouyxziu7u111pobqflph9qlk6f9vmztqnrq3q2o64dpep6mgv1skpfrv1jiuxb7pnazlgq5x6bnhy8ycui3lhkef4lohipuijrsuen80wsewd73cm7apq51dy28400folj8i3d84nc'
        })
        flowInterfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceNamespace [input here api field description]',
            example     : 't0hlm10xviygjz0jnksxu1tzguz057vf33bopiuwstrk2625xhqhm129llpvll7ii2g2o80j78naxf2c2eb4rmul33sph4syg954wj1530yjhxupcq1d1ld52b7mvqquyrkpdeebfbhhn943gqy3vt5gvbaapfj1'
        })
        flowInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'adapterType [input here api field description]',
            example     : 'wau2h1vayo4p1oumk5tbebag2nbwkigbv69glh98h3ssr1ylhd5wdbgz05up'
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
            example     : 'uixysjsjwk2h6428jo7l3hlzlwt8yl1wteeiqx3wsrx9woiz2tm6476hyddi'
        })
        transportProtocol: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'messageProtocol [input here api field description]',
            example     : '5ct1zkyc1rfunq62bd4eohel9uiwwt3qek4tzp6fyxhvwgwbhz7dj520301r'
        })
        messageProtocol: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'adapterEngineName [input here api field description]',
            example     : '1ueg05n1al0dqs6bpwwanve4ccka3tlagu1tun81debr3mla9flp6ncwi7llrqhps77owdg36lie4f1dylqg2t4tbipcmlb25oyu3t6dp3tu09oygwwpe6cf8ci6txbep51oefbqa6b25dmiqb9dqaz8jnq7ixt9'
        })
        adapterEngineName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'url [input here api field description]',
            example     : '5vfnym6deiubonydgjcypsbg5wehtj7sja96wv1m4dukhl0x8piw24n1019ilufgvwbrluijwvoumq9auzlzvazw2iqqpk45oxgc5vvpm00q012jycnm4jphu0bhzftfbl2aw983wr56dmhkbljdgsxua3fj5pmspplb0dvkuyy8izsnz9gwjwknppmyxaddybv58nn53co7x2t9fa0ovt8ak6a0vmv6pjgch5ply85iodrc8zs5wcxv84119cai1wksux7d55bcwqu6anhuerw1zn5lf9zdbc9xx6h0hu8jmmyahmvbvve17mszyrh8'
        })
        url: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'username [input here api field description]',
            example     : '107rnrrri9z2qy64bvhdh93szvi6ug9hxt06ugymswxmmuc29zol5fzagy5e'
        })
        username: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'remoteHost [input here api field description]',
            example     : '2flswd0mjxh8ca4ra4agdhjdg91z1ttkvsfhjgkra2aaawrbbh6yj8lwqkokfdhwigjwpb5h9fwy87mq60xidpg0mlwcocybhj27by0bhc3fxxplhoes8i2rfls42v4mgayv9upaa80fwm4muzvgtm319sksyjox'
        })
        remoteHost: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'remotePort [input here api field description]',
            example     : 7969059641
        })
        remotePort: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'directory [input here api field description]',
            example     : 'iwx6b80sq28alf6kqlr4c1cxq3c54gv0xnfk1nqjxm6o6yk4ys8dtyxypb57r5ck7x4b4gjaulqyvbgc9p38ni7x05gn98x7l880vy2y13gy4m3yjzw4j1koxrxacve6p3amgf8su78a7m8xiuz3yusrq3sebthvlzfe4krfzu41ovbltam2ptj2x86lyadh99s9tvrzkudkis74r2j272q4gi0f38w4zl7ogjy9gydwh7dti2ooga32l6lr6s9p3dfan5b28tortd51pm1prv1kzbgafpymwp11vbjwynn4s9pbchswuntmarqeiqksp98ugfcjtsd4cx7v8lasx5k1q456syzx1d3nb30997g800qf74n00dra1zxjslkmyyy6eigrvdnbkerot47x7e35uwddh5xfbsrg6wfjrnhobe84u7yaptk4i536hx8oax2b5zz1dha438u031e1atfipmc45x8q7qrmijlanbzqbkzzwm8zs4fiz5zadfylkz61tzfl93ama8k9j9vtx29h323y37zn63fxo1pdchvbaifjdhfdzgign43pk5xsczko5gs6rbtudh0dbq5msivdxcyng15phwrn8lcdk8fyigldd4jh6mxw93s0wjaq40pwj1g2vd0gtt3jexlo19x2rm0vfyrklvopi3yfdkxvnw11mbngt17lny6jx40caeqo8bu8o2cckbdulkg0c39qnxy28t0d34lp3x67supddmw87n26k9ir2tg0zc6n2vr7z55yt5q9sx0j7lh1n66i7jq02el15e1zrr7zrwwlfsiowsvd7fh8vnhq6cj8hrurxvu4sg3a2ipfayo21kbfewubuughap7sgdlhd99ds78hun8di0bsuls1jj2a3w50ob4pembphuy59tgbyhilt7htoyaw1t7v9amuyck84l5szq3qubs1rkou4vtk2x44lk8fmhmcoylsnq5bcpnzsyvpn1mpu7eb0wdhiw20z2442e0418hbxu5bg9jc'
        })
        directory: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'fileSchema [input here api field description]',
            example     : '5lcudc8s2bctzr6wyakzudnra3okt97i7mphijn99r55cimgnsu4c3ymhnm4eawedb5npxq58gfyzmwdq4h8lq8fed1ueyt496l9gxiyzjkw9swxrrag0sfn9zdtt6gxkmesn29fses88ukyec1ad7xhnqfm93x0mzvykr3kiuenl7gq04nwlveshz6pg1vsznaayo9klbez6y1u277dklbra6xbpanuo339dt79wx28jwxuksnrcg11qwvasqd60lhmuf7uxkvutb52mjg6b6ttzmw3z8z2lsoe9ch6ns2nlvewokf4v40ekrhkcc5d1wbayj428wc3wxn6hd343wtj4thv8v7reyrmy05l1zxulpudlw53xkjn267d2q23a94u42cctve325yrsys2j2shyhhtck33xxxfx75ubzcpgbag7sy31p4oziao7wt4jusbhssczu28r469dl44qjd98vprcx7huc5k3fvphib64j6cn3yk7o3x842u578ou3fuu1d34wqqnunc7ngm1wjgrcpaftvwhz6u0yesps1b4g6epdxxtebhct75iiomddkn16weas5h8b5xe4u84fieodskxl32tg9z2286a5vq5vrcuwpk9ugx4hqajbfa0ieq2n7gbvj5tbt7d6oe8lngw24tiyg1q1cu0q568t2ts2iqwi5hgqqsmj9vof61q8um0bjxhd5glt5orurhpi6yhpu9tf6i14frshfzjtm3t2l1h2aqp710n6gfea0mgiqe6gtrjsfkxnjh5kz8rzgz7ivpedkrdk65gqfmk20gg1nzkfsaxrv87nhmhlehsu2fgshwkdc8tn6t2bjh3nir0xcaim9wfp2g8qnnu36p388e7evafa9lx5oxufeulpyr0wjt2nxqeaml1qyt21lwzwvehxn4bt6gx5ojks8cczz00e5eqghvvhwg5sz87wfm1fuxkuzxzmfm8afdhf6ypoo8024a08wd9yo8v7bts3ohz980q3su5o4zjvf5'
        })
        fileSchema: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'proxyHost [input here api field description]',
            example     : 'yxwkz2ztl6lqlm3pkswpr3pqj3ylw89em53f7cb5e1b5oy8t2mq9n8iunezm'
        })
        proxyHost: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'proxyPort [input here api field description]',
            example     : 5745841304
        })
        proxyPort: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'destination [input here api field description]',
            example     : 'aqblg5dehm1aau2e0nq8ddgc9s1807z6s8xw4lyda9nfn2y28z8ekhl9umvrw8s6xyara425lvqsm5oztusp77u9u1gtv6j966kjquqw5wk6bvvmmzfb3voiabf7rv73dsc1flbf1llisvnp0398c4xpee9gpkco'
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
            example     : '4vihkevlny9vzdfcj2i33iafxr5f94ktl4vdffxczwppsjjvw7r0up6mhhqby1hx8kan24kqwk5fr2wrccvpv74btkchgegr4s4c8rwca5q72vtuklu4wxxiq5belvrvws0wrbxuz6zvlmiaq2dwpql9qlfa7jz1'
        })
        softwareComponentName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'responsibleUserAccountName [input here api field description]',
            example     : 'yscv136jw06fd2due468'
        })
        responsibleUserAccountName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangeUserAccount [input here api field description]',
            example     : 'f39ecpf3u2nefq854no4'
        })
        lastChangeUserAccount: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangedAt [input here api field description]',
            example     : '2020-07-18 16:54:28'
        })
        lastChangedAt: string;
    
    
}
