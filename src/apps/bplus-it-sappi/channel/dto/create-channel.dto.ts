import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '59cf5246-34df-4098-8660-a55e589e4214'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'gy9az0jvzaakbmpzvhh8pfqmhz57ogzf4srzcv8w'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '1e6eb83e-8f30-456d-a977-466d6a0acbb2'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '86ioaamybco8zf6ru59wjqq71gtpbr3gnzq5wt61wo0b4ep3mz'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7558f16c-7e15-46a0-8731-13140d2c9606'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'q51i6076o2d7rhj34okt'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'u00wmuixwkvff4eggd4z9qdsxoi3nd1mefug3c7n29w76bk7tilcx4ly9i6ipms3bjot7jfpf8287ajtaxqxjkbcwhkagk2pabpwoztx3jje9te7ibnw62lstx67pytmxs1uh57dbip72hopyuhk2guy0umm51hh'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'j84360f05bgivqcveglabxc90ctuwzwqj6z7m5dvr0sesa3eh6vakgwrv6ooyadmurtmiz8mqxtuyg5acmz57rq1obuywupjc74w7y67fq5yhp6y0xe7z2wqrvjsbpujko6h83z0h6fiu4t9lp4jii148xxm9rgt'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '3vwgqcnchkoxds914ervedi5muwgpkceyoflpvloxtqxpkz5dn0gj9q5p5lb7ytcq8vju3dl6bjox8z1xwoio2fv0t8roev7t6snbmnx6u19on3i3ufoau49v1q4p4vrh46j2d7ofilbnwe6figpte4vnpsj03tk'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'd1feb162-e4a0-4594-87ff-e7762fe6df74'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'lqgcdklb4s9d6e1c0n4xrn4ovruiuc9t32p1rippobyee1oel7wj4mz1ep4p145lhgiin1mu99zhexenbuhxbtxhlb4d32lxntq3cp7bnuf7wfagyh84sx9wv6ddrbwm8sn0jkrc30kbfvl0vqyh3t4zydqmbo7h'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'h9i5wps9swc5k6bzgi3jv0vjcdqmycuwo3ns2c9olajabkzzkk1b287lntwumeqtlhs5nzywia2pfcqtzxa3sqzxleuk77bd1d7zrm05039kpchwqt1w77wg9vqruwbvwypba1wjx9vuiyvxyyfkmpulhtc37lkh'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'laeyjrhubte33h23ztrcfcvgzjc9t1w5sswgd893rsmscgnl1h301wjp352drrefovaj8tfds3kucy942bpdpy9jjrpd0evvzk5nnsjt42n0fsn11egjxtd5s2p9yxpegy506g6vpjt8omsfnld6vc8bx7nvkeix'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'pmben0nevx3sr003pynfk5jm2jb8k3hwr6i5aj5oc9y1flrue8v5sdnp42ibz6yddd4fcafhvc466hdpd3g7c6bi8al0g6r0683wdkgv96e0zvpuoxfjchmn7zlhxamd06fmpeba6ojjvzsi1ah2013l2t6dfmtl'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '4wbn79y4thrdtdiq4uvn'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '9hr05xsvh4ri496ari2c1f7744msysmwetb1qoyucu5f71joct8xitpd693s'
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
        example     : 'zbh2rme2fmmadqn7jhz5afvc5vds6lfy8n1c0stwp8dstirokol5ituocaoj'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'e3pcm7yfyb6akgcbqjy0vlyy2b5jfxqvwh0b6z3lmezbldlq633iowtesvs9'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'aww7z1udquukmhhhz61shz3m9xo9wpb7zbumqxcu7k6vxvtlwz0n92ezseua51fdhksuj6pv1q5dzmn77wsz3v7rh1mebvtuouavvd9e73dki55zlg6p71fbzc796ngqe30q84iztqm6dft8u1h53ewf0z5q21cp'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'y7wqlckju1wd3ajy27gem9j4mgdyy0g3fbmd92jbx2j37znj7pwgyyr2lvgwiilmffhbmts8cmiuaqjo99y0glb0rlhanbp8xdiwjfchew8f3phozfeywbmo8wm89moivm0ukdj8o8bshuppk11nlj3r2aj7uldz0tddonfzfm4eey0rc9t7amxdqujczwjlitcxyttlrstzg7spw2anmm1pqbfjcfacwxyr7g7akdbstqlunn5zm2vn4dz5cy9jg1vywrtk42lqku8j6obspf0h92hpgsunele4o1lq95znisb0ii0nep70i65rjgmc'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '9eud44g6mlu1kgr6ad9ypci0vi785q91n326ou9p9ieh2o1i57oxk0cr6kzv'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '9qmhfqpkynfbcxzchbv90gjottkhltbptfytsz6h4kkd1i55mjsmgvkr8p7l42422rvylc4ej18sbwqpxxtinlxz5al18l7i70swbam2y13c7rctuywnsmsjyjyjb27o4a0sao3tk70b6fy7o8rmrxhlkclbd9nx'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 8686571161
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '65d4po56plhlit39fbi42jxh7igh3vwmtcigw7nui2mo1657a6lfs1hsxj0yxtcgrdf67f9e9kgu5ac0mt6d6njk9jp82n41xrgpez3ibg89ugk8lygj0kref8w0z3zynlwgpumb3ga2iqf3q9vtt8q1oklays9t0mlwp1hxat9bemycz3mfoux37bchjmtykuewu7hzluc7s92wckr8ddzrvh47983xo4ecgcr4a3963hpo227dhuwyrhqf48r7tyk18syav7h5og50rhzll49edclosyyteuc8yz3s0kmp5mskzas3bynad66utv64xbz5sehd90rt8bhwxbw55ow6m3garbd3xuhoscrtxa1ksmkr3xg6du088pi47gr3py4j9hruu2n1d7nxjkg4d853446mljs8tulcde34cbo4oy34npv1mdvwhqafy8rip10m5hon3bq17iskfnvz1e73v20owsedqgjlpmumkwp6algtn2h2x3a9kzx78qft9n0fripsb0v6alzvq7d5vtbre163t0pgd62bxkg3tofscvcu5mhh7acq69md6ljk3bdzrswxnclligbshogn7zv18t9jrwyj0uqqjo5xwfodrzlcky93qedubk1ijm1bl0t84ayin7txs716a84wssyklyuzjc2qc8h75pyot7kbhrcgvtv9f6k855dfi9aw4t7hormei6620zct0gpe9fom3kaawwgwu2ea7vgstr1xp5rlgbro68r4h9cnni8xwiqiefsiu2xged8july2z97kngsx1v6cw0p4kq7alvzhqfcj7rqll3vb2m8ic7337tbhe5lvi3s300jwrrytsxxk0ygri0d8nnjuq9g29isak01j951982t3bpgd8eol5txcbrzlcuvhxu6zjk9111vdabo030eh8zmtwjs75obip7zvxott1sch5a6yzvnfi319dqltqpcqn4bcg9u9yz9rplttpkml7tc6rqxb1mm469ogmlh2wrmws8kegmlr'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'x713aaf6alakixzikqckpiw7azws9enti227wmg2e4vinqwvcb2qtjykb2895r36lg9d6fxrcebyohhikilvplv486rlt6rr0v4fxiftj79lumqdr21gbzvu0gtw735wxfjenzwgtv3qah0c9qwrmdtrjb4fzuecidbvpowyf3d27wrltsr0wxn3nuy09hoqr8pvqegpiai20cfozfavn3ve357njvdzuyrhkha2orsakfqv5kq40vwx5ahn2vgxv5bqh2pu4egnssmwlduwgjbj833drjj9xg6hg6uyuwk12jfdq9jrj5iqi605j52jrwjhizz39fppapgw2rtkpxhixd92ljamjaczgjvohf120y18oomzbczmeekha5dc0689xwqnosxix5fiumj0adyie76jqjezmorhmane1pbn5t03ejdwa5hscn575opy977ehhpw074q5r2agqiypi1a5bs5ybpc29zlk5kaokvhxu7n8duojtxhcdwl3febh0le9y9dj4tqr09dkschs78p4m1oai6ivyxo85bzacpjhbp2i80cqqdaaev9622p4guozvlhbl75i0yjsnmjw064quqwvfgoifkvaljkphr6h6txo2azad006en259ozag4mztdzeg6efg8t7awfemirypv4w87a54ydui247s4v7zktaecfv5976g0pg30tmjkz13sd4pmjbb12fcszx8mkt7ihxttgfqe3pvnu9lduy80cr8aq06m41sgbxmfaabov8dhhu2nneg7eheqmwuyzhkf7gd7emfqquh7pq7kn6vjzsnj5je140qskbfnf2ru5wrv8xf6ehbqbnrldo19zlllkwf61l6q5djgro1n4sfcl701ssfotae2v0mgeocxj4pjlhusi193i5gy2k8eqgeuogng5eyfek5lkib2n2wno6m0637ovps1kxeq999z1mm6qpx0fajp33z1bmp2519u1s7qeiw8nzn3gt8ao8o03e6eldo1pfuni341m'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'e49mwjfmf5a3208xfexjw251jb5jyarp0p988gazo0p663bszy61588sjaqs'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 1434783691
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 't375mz5w7d54lxo5dh0ydo4gfu1hgmcmg1nynw5vnfn32hswtrucrso1nhy38z6jl2oae8641kuy4h05pv3qrf5253obukqs2l9f37ajjyebsxchsmca3sr1f04ve093npcwrxc6mpag1zgz76jzvrxkhip5t55n'
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
        example     : 'mqcozm7yumpf91rm49idd9txrqlq41psdoatify5gk2uoj4y92c3fthc1ctq3zqjznrp1kwn4x2e96bxl5tlxyulmrtqzqoqcjv0gsox2r5gdwddmq4gawzws1l4gcuwrw12wcx33i2xs12khp2t9p2udq84v6v5'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'b75q0zimfxtdqcl9qrah'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '655swkdpdodc87qybtiy'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 13:08:26'
    })
    lastChangedAt: string;
    
    
}
