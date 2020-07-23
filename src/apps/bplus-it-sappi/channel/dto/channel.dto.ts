import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '92d781fe-5dff-45a1-a3d9-59fab62885c4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b107a288-9138-47e7-bdef-4256be7b1262'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'kviur9d26wco7ik4amsebfehqrym5cd67bi1y357a1lk22reo1'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '612b7549-36b2-4d13-822c-f6f1b68a37fe'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'ti402n00eynrr9xebpgzvjb3bl0jlgogaj0xjt355v62mqfv8zrvatsxupg74bkkjr3hr6igsk5lhfn8l3j5ulbnqeff4lslnwdln9ex68gpge08gyuiuyz92equcvwatz4gu36ojjlx7noxuzj0cy7n3rptmcxl'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 's5lksf6blehwks80pob8ansg736uqok9s7sd1n6n0f4fbg4c5gcjm73tgy3riakjrgkqb719nx5zzuqlmk2r3kw5cg8ppci6z433xpbpioq629yoszvajmig9pd6frceycv6pydcg5duh6gchcu4htwem6aqhe1h'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ecz1hlyjcwanbq4falwmqzua4cbci4bdxus6k06f8n8bc9zra6tl9kktuimbfi4wbyi7x0n536nfsptx5b5n9g681gigqndrhe4ag6acjzmwobsso0ns6dk0jdk55my9d7uhf9bhmuppjexakodnfmpok4zpp26f'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '46a7729e-8058-4b17-ac43-b7f2a6a1696e'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'os380qplblln50wi9c5di74jndi2vhtfbsx51mdd3tzoxocg3zv30ieo78g1muiad4hvqv763yakti015eamo58mpv63nzsnebea0y819tc4r1mj7mygqorvbe49ubxezeuop7necu87p2ucxv96708vi1aoj9fd'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'wqtt07kez9fbzvag89t2toj86br94be9v17b02gsrihy894w4nii2x11q1if9j6f0kosos2m0ysiv5oaxoe14cyyag3vy0ykruovfa9zxmq513u3a263oyojauzpff8tm18d2rg24i73ddo3fc7pd4zuwxl3ax8s'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'kf8ml98v628cbrsb467t3klarwvzl7gxcpyeiy4uve0lrig69144uv9pcsy1dbtizob0spnp99t0kw3bv9poxgc3vzdyiv7ouiq68dcl53lbxrganw3zu50paqh2aj3og7pxazp890x3xg0x2amydf5ksw89fwu3'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'pp4vnom24cu2oufl7kc3bzmib8r2wj7bye1u3oldrwt0plerbxqsqm2uwqa7v9c25zulf3e32nnkvcw59rftap9vfwdrt70uqrlmgoz418na8zxtbhu0rp871fqwaj46omx48cbiqhti0tn50whny0zh4gmbohyy'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'h48edqks45shrm9al1ladv4u1wzjc7yvvfs22oswqyll7bgk3ebmx765mnic'
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
        example     : '8lkt8a11r6ng92wlxzk3hbuabbrsgruk5wjxpgwxd7lp0mujwn1z8mbougkw'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '44ywpxokpoigq0lgqpleuek25so4m2rylzkol9ymtx07twzpv2cv41s314pr'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '37bkpq3ljeogaq1p53pqehosdmja2tgia4im7kub40qvoziuriyvvv78zl2wi9n64p7j1s7etzri2r41zkapsp2eibqawc0q3es0aezeduswxpeycsbcddoo7ktvddt5lrx7ec3uv9o8rfdfnj7tzi0a1o7r3i62'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'zrbofqf1wdufi5jky7bc85clly9n1hxljemgj0id068vyjx946ucil4sxtn9hgdndc24mqucw3ig3hb1zrw4r9cujwujw6p1qtrc5i53hufmvtm36wk5hxn6jcqqbh8nm7ix0uraysscyoofzxudsi4ji7iyw3ugetpqh5axdfmfvewv0bqojziwfy70eackyz29y3hsgdd2n7xhy1sxvfk60nbwsykosohgaxo2ad5d603z4g4shl3sl4oww8egq6yo371fo7my2ct9nwj9wd8xa4fxf5x4az5u4k3rdzg9lssssddlpd9ttccq8ou8'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'm38tcse02qk9a51jsw6l59375q2fr0muq0q2sx3f52ralyieny7s7vy5teqv'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'tsbn0swimjmcxioig6bk9w6kff9nkqi2vyfaxtkjzhb7wo6zc65mkt2ip3a9iz2ew4po62d5i8flxpjhupxwyyp99p5lbl759kd106l7nmjyqctcpu4uvjrops72j83hcczbynjdwhe27dq5l7iy2k0csjq4k54k'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 6324792722
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '36wuest3eqaae6l3egxda8t5rkk0zlolrccteoxj86jogtogzr8r0s3b5w271cl7fysrqay7g6p2esoz36fm7jzuxn775q642ixwgc6kh5qppm3q27rrxeu6h4odrxi2mmrwv5svrhobutdx4vsr03yxrfgfjx5t6ne3x2mj7c503v537q8yxaljjrv09avojtvzq1gawx457qycxdhpixissi50x5k45k8rvk0tbfyzeye1mm2du986mz4z2f9amqsggqqig6dp3rvw2smjvm7lhwyb8wk0gtjui0k1jadcjhdiaae822k1z855nxfwvsxv5fiur39zgl8n2wiv0gmek77lt0xe0s4d9l3rpjg6awnvcpytxgtburgc9jh17buoev4s4m9tb42k0zn6as665ex9pfpfpp5nwmh8xocu99e7y4x2yg789mlknb3dkb5f4mqlskem6l08bb5z68mxq4iblkiks7thgcq1dpt8cl0qq1g4dfexwfeixa4d57t00sdeucgf4bqo7rnyxyn0rfyca2vf3mh1cy90kd4c6fqyw8w1l6qdp8xol3g9p1lzlopisbtie0b2ulj3tnxw6lj97e9n9oe07tcyuo16v3evj9gozca381iccbed00d7tjrr3n7311kowrcxbr4ojn3g7s668n1wkejb12eunigenxgo41nn5wparhtwry0so5p9g54aloqrgl69r94l1phantf43ci2xh50up6tzcs1x75465p6ua85vrseftr37jtyg522foblc1pbp36m3nx38rbnx446084chk9parortr03d968dn9p75io8ug1l8wmm7e2wc620n04r6udjvcc9fp45r0og6t08bx2aefg9i57w75ci77sgvza8dobxngok3m2rykg0klf4qwsf6c8dad7s1mdiiqcvykeoaiy17f7hsnyishv019cx63uipgas60dry6wti8i7tfsod0i4mm8wiuw3yznivdso8za99wgw5bs7l1a9x40'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'gfgbszir0sxorh4km64z3i8ock5dh9xgxmpj0ih8azd63fzv1ebbcj8li4eaw73kr3enqg7e86awrcaknz4o75lmx6w4h2qurnkksbtxdox6v7ragxympamf7cupyre40zzqv7y1lyn3ey8dzllnenped0hbuxo567sjn352entab5splvfczx8aeztor1buuy94vwx9lful3eimwdyo34uujxpewqjb8om8m0dkrhrgf64q9thlus8q5g1iegmnyn213sprpjigtor4ommhyzz9ewpo70jkczc9qqis3jq2setislh10olebsiowvj5frv8ija0xli7d6xtt7gy6lxyqhpb91il8o25lt5v7vgfuk5rj1hl55jgk5ho2co7opclmlcbpcauqxow6go6207efnjbpxxf5fq0w5r2rfq4od9pvgo7iwf9rscujuigln947xi4fcdiy32yat5mj6sl02crgou4yp0xewwyjfoxbe3u4rkwekzrc6y6qvbyfy5r4bm7ij0srrjsik1kiug4o7ujxy1bzgfq2dczzl76cg3cd5hhccyegpr8cvek43jk9hft99j4zez3b8qa1ia1bp17lw888dam566monh6mzhnr25zf9qu35fxxqil907o9z6hb2go4qhotrpncw1x6j9bhyhdidy4zeqqb1gtfoql4a6io89stv9mtihjfuv0h3x6nh8ro8yy96struvo0wfpiph2x2vttwyxv51cj4kxba2tw13rlhh25lxcq6uc2hri417283jrdrvrw6znpyf41ybs4ut66vvnrc9q6mz5dfedlbzab370ynyso4wfkx7tappf0nno6o4rawzov8bhba6vdc2u9hqrxvqcw2i0hg5f62o2p0hgly8bl8ni7ev4vw7lmxali7xzkjcgo1w2dmxa9uj7u24h9t6qf39k31htvmnlvimwtqm11izva3luw7le7dwdfvnbpnsvybxm55ben8zanzteiqwepot1rkruvfbdklivk3mf'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'ajz7eek6ziwhqbtlw0hn2z8gx6ww16r011vwwykr7q7xjm3lsu7sffjpkapt'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 8067717983
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'v7r0b55gwpdpppp56f4951g35m2qyyyr6opx3gr6recfqnic16jk4qt4ckh14iazkwyntccaaqhqft4xtqifigv7m4j3n92ib3iaqhyohskxltoe5ojri03qnn9yjxg7761zgn94yzw3hvxavwgll5iv43mxnnxe'
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
        example     : 'fi5jkx9mvw6wf3zy0upmw5i6aep6eg35x0oy2105qd30ek5jjfs0bkaoj7jrqgri0qgsfy37d4rokgg8cojgdl7ljuj40j0r06istuocrvgn440v23114ehpttldjyyld7p7v489pz1vaqh2p3wno8u5249k5zfm'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'arxmfzun5tpqgmfuqkst'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '9hgwhgsj1esqn3d39rlo'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-23 11:25:51'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-23 10:16:22'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-23 01:51:56'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-23 12:00:38'
    })
    deletedAt: string;
    
    
}
