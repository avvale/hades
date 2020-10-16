import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'eeaccdeb-d348-4c26-840c-3ec824b712ef'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '1ux2kkjd5a8bgbov65d4cu0uvm372rtq886zhl12'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c2e96b90-3bae-4c59-baf5-751d4363afc9'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '8s6f5l10a5hadj8pcl8vrlr3639wxu8qvee9gddobdhl0pia03'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '36785ee1-b5b0-4748-9062-91654b880438'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'hrppelq9zz5ja350lzlu'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '4o60wmz0cvke7nwm0n663ztep6mxorrloz2p5w0lw3bhiy32pfc33ioihqcye4meloc5g7ls40qef92hpt5dclnvbe9l19lr1z7739ukf88175t30thrdfy9f7o3rmuqo3ur2l4e7pas3d9p9kddu0241tboydqj'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'ra7x76cje7h5xnyndmrnglj71et0jp17wh8sft6a7ah67yf9zlokrkgmd7xcd977zqkb4jjb9ssnx1hae9hxnnoox78zekd9qe50qx5dpyo6runtwaq6wsbk8cjrtvmv00mi8x3s0ke50elppspckplnk6gmwbc8'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '0hzwqcel2n24syff5kw9ci1g63mpm0btmck0yrt23c95u8l8vxwhm42gfpqz426akavj3rjgf0sycycz0pt08e7pp50kmnkfqbqiu70wx5ryhsq4pd2r2o7zr11jauv1ub0g3ratkxzupkzop5qs6orl9dl8dikf'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'rz1p4ed2t2a6x02hgtvypdnohv7jdjyrg99axhp0'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'obt1h1puazov6s5v122kj10yx0gcv51mvv6798r2uf6t5tyqdkqt32nzzlhm4uug7jym71pylpunao03x298onqdcb9y0aszu8y7w239sbo4vpchu7drmqjmfg4xey313e7oqaes32z85hr35exebiqyz9iaycjb'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'tx0zqbzx0o5uxhfzw0sho5as5az4getdf16a407ku717rw47hrqb4cm5tfaosmk487il1j4ab9l9kztw5bbn6b6z4v0w3a07rmjc3asolh1ka1o3viz61y636c772oascfczaxg6tulrg0ae1efh43qjt3bu6cc4'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'obzaapebcl4ykeoxmuk7vhi8c7pk186z8wbnedajjrr6sursbtkjr1vszn7h4rglf5vj76ifeikytmopwiz55oxjs486n7iadchyxryuwxqe4dvmaxb3olhqu40c10lcns5y32he22b7ocvclm4b183jwoegu236'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'bxhs5o1xh7vg5flcdjo9moqcss8f7la93tdey4chjj8zi76gd5su57kil3zli1vyfkzrejgv3n1lbuer5qnkyvi1b7n2hu66qlg7ffhowicybng8zzc4jvnisdydbosjl2v1jeej67olsrb06s0smzokhwhqznsp'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'pvr2dg8ijgou1xmlu2sqy23sm0m30lnfxsk7p16o3bdgvregwndb83jhuy2riwlo3d48g04l7a0rzcgfw59n606qajzs2jcxbtuo0dwtod16x5fzhwl3fxqidqj90d15bpsrcu1lhzqqbz64hq9syutbsbtn8ju7'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '57vy3rfd1q9vokfet5614d5abmc9d9bvi7twggfjn3w9s11yekb55voq9j7hkzex837lgasfz7un079rw4yyx1024zxup1l962axxolp1r73u99ycju1nvug2ozzvyp9a7x6rweclm5arx0ecqngit5r6e6gq73u'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'vwu6mb0zbrpvxgorek8g'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'gqtbjmliciwlafnj0vvygz9agi0mouo70qunzldy05msqyyfy0uhvmvgm613'
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
        example     : '56gozk0k82o0n4vlo0r1hcyjniabtvqf59cyybgck9jcwye5c5ho634hw7ag'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '5ve048cewjp8d1oz69pcwq5phgcjvrrlfvsz5y7jq2m33jmhxolz3ti9wdu1'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'uduxxy820h2vhfzk430138h38985k36rz3vt36cq2brnale1pqyb75ccy7u3bfmen7ebkjxjnhodgdtv4vklfc3ep55kskwur0tau1ah9g0vob6frdhlot3e71p3lm6gg87msactntx4epqvfncvtlm0rigsv9tn'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'i433f92cpniviro9gdk66meccmmnv90x7tyyhrcznxe2h1ewf4vxfbjpsox43ejeha399jynfzf7cyxbehpwz1t29fb184ctxwx86wzxbfdjde00lenxyjy4gbiarw70978ya4w4i9qh2aqv39hb5brab3fj0c9qje2qu2qgof37o1ze9ts5dkytrqmt3enq61p6s85qidpq091yglbnq4xxuil59jupuuqalladvhhcgb1mltsdip3zu82dd3kju9daiwpkcbe0m34a8iywno8is01nyzi5x3sit6rypz9f6uwtn8ifvoqigs6zrov0'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '1lyknxvgenvui4d8d3wf8q5rxf7i7k9ub6esro6dm95safi1lhrv6ps4lwl1'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '0ufo6zp89owo1syyl5wsfjedeh6jxk8erbwabaiccmp3xm8erh79l20tqslztn0ye2b38a3jn6sgf4jyjaph0stgui95o89nnowk64v1pu2nb3r1ksbca8mu5ipwzibfacubi3pqrw0thbhammdyan9nyk7l7f39'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 3139463249
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'cs524nq1v4j16xkg77fswgt875tyxzqm0pyd3h9sz1agg7odshkjt4ym7aet0bxtq7mobi94yi4m8ub2qi25x20f4w6jhn3u1g311dv6rvj6tv0m9i3rmgibwdtb9xa9yc4vxbwrl7ynuxq8dnt0yys9ji7crl5x0gy3zt0d7nibna4we6hn4q503lvitf6f21x1qcjzsuynkdt420ib5kqgg1cfp0ir4203omu1yonen0j52bbu5av0grap3n7xibcm30q8zmhvwo5xi3e3iitposfb0b6p7hodmls1062397isqnfghvh0dxfdin3d5jpc6c3oshr169muri2plc0svwjbuwmzrqcvwtr2bqosvu9l84kwkdkjp8e1g9c4u5970ki5mhg7vjsyue09uof8frd0t51wdrtb4lzj3vp4ra4nzs83nf805y2ngq9ywyigh0as9k2ggehd50pmr5hm0z26wiezwem7izx6umk6615f2f25qe5cb7eh4eli2g25padpxk4wtswrhfo997dnbtpolpsx30ri83ajfnl0hip6b4ddcd9rh3qmfcfleuflc57u0jphfat1646w2ntqv7pzlsu4hkdi0e18ba0qfnudrggdq7svvzdz6cudqn7dbxa6px23q3dqzwqkmbqzirr5r36avikah961v5ldkndcvnfsd8skkq7a7jf88s1ws7vr1r7qzta0h2w6pcxek6836nrlcahtw9dtykjlqtde28w32srap7c0lki17d6cdklxx65tlmvdjyofy0l97mhtne1xrcdjw3o2pra6p4y7fpbew1hiz8n65edhnhywbrzzakoz4oeniha55ru04cgbc2642qwb3rwc1kydkdfoe81x0nskq78tykbqei9ynnk3nqgtezmym7hkfx67ckdnj5lpy0z1gkbr0i5a5iz48bt03v5qpsvqprno8ys52fxumdummec3cwsrd5obl72de2k1nlpnqagadpx2dwifc8fisd3qel9xrkgo'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'mcmy2sl409yotdn4lw9aw4sgo8nrpfe47lzo4e88sz5p1m5h10hjpau4a2012mqhbhjtsk172u7oe2mvktt32ruprhb7qs4th0tcr11i7wifnlp4348g4go6bna764cjtat0tebu704o9tq4hzqe1ca3wok65r1g9x2eh34k8h2dw9o2gejffk3z4970mszl38rfqko4sjz46zcku5kkiz2xpekp31kvhckpylz1c0d74edql48t00fztt28082ttisus54jo9wezyb5bsrkdyouny8bmvpefbd757xvjhcn5p363st3ejpr0o3wcwe75qrnfxlnfx13qyf3th65qb5e5bzbxcjvlnxizh8h047uuzolpoy0h2rdcpq9fwq8h5piayq733rifajl9hli7xhbprn1ob8faj0xi3mtul621xg52sip7dfj4mgwxinfjwl4mosx2ilx7j32vqk37142lheu0f0z2iultystq46q5oy2cy4sgt3n4g9zjilapoztex44ldeh7l4jikuts3elqk09x899dbbgf4f2yzem5duyhmwgz9w92ziydj2h4ve4m3nszx7mdn4mn07tkfx5ny6217y3p4w9hmbsh7wjwpagknpnfm4ijlccku47dyl68lzbbhui0xc7mbpz1seho8g20wqj19q75h6d7vtetq5o6g1jykodvzr2dug82sxi2eo0z4qbo81h1uk770nikwxafac0p1bki5wmmqvsmeze8o9arfxrksz16rypzzgp3qe5mo922l63g7se8yxg3vwor4xjf8h0vd0qnsxy0230tmkg7lr4i8bj0knymhwvfzg65brfx3pazygqwi8pg089q9y17qfstanbps4k9tquo43wbko1wlexffve65np70k7tiqiccwr6xwrmwj6pp7h0x9a7gnpm38tjvmrg7dtj1dxkcr5b7r0a3cv7j81scwae1jn4w0zlsdf6lukknm98cmsicobx44fw0ttcwrtto3gnmh0xqu5o0h0'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'hwvugmuc84qr17tm5ci5anqykacszanxh0o0f9jms4lxqg37g14sl0rbwl62'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 9670710281
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'yu2c02mqecdl1pxccb7um7gt4al5rzc87jcl73zq3cyhou0rt1b6nw6r8wpdnd2w4pl0avx0pwfthcfuk9h7iwuaa6x624wbu7egj5bmuhhxilvnk7tei8rzzq9e4na7wslxk4xc70k5zf2lrkqddop62cjxpumq'
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
        example     : 'ytxuv79w9ox228jpm8rank1n4kf8ittxfjc24toyerjdgh1pnlfnl5bg3rnxydk1nvc6o9am7hoptgfous6wezrx33836empcxev1o6ijxsczqpu0l9m3lf46optw3ffp695qik9msbqcphcao835j2o2v8wrwvf'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '20k7yggv76qtu2s59jic'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '3jpv1ch5o8psksyrnot4'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-10-16 16:49:29'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceName [input here api field description]',
        example     : 'o64rxe1lihe4poca4g8bqp1wzwjrs5886wamw491hjklvqjakul7b0n2hjlpd7fca5brvqfk0a3ax8npr5wqa81l0cem2as631ztn5yih0h05eaq7gaw2ct76wg8ubraym850xldmb7rwf550j9asc61hoi8jmcy'
    })
    riInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceNamespace [input here api field description]',
        example     : 'rtsfih2xh9noke2qjfac3wydz0d3vgqe7dhme4bthfi80dtsz7ji4ur9igo5p9fee2dv6wzr0hijqizxf4tfceb15oorxbkab9ch69gv6x1258lt8qw1xdryn0wsmpmzmu7gvneuq6s6ufkqhd89fatd6llmvex8'
    })
    riInterfaceNamespace: string;
    
    
}
