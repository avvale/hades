import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
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
        example     : '0coft6bmqf46zpxfdrv1ly7xao7fbc12o0ulc73zt9j3e9xnt7'
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
        example     : '66cqv575n346b5mp0gmy'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'goej5clkizpxfl8l6cckv68aqpzn2gqqrkzk6uuw9m9v5ud3d1tdyav7zyfyu4202vpox99l9vowdpr8mao9fd0edlxw0ky3jbyk60c115ii0smgye8iqy7z9n8dyyx4ilr2rc00lggwu0gmmfmd3l6z32ff00vs'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'ir5hid9b1hhtk6lioa4zovvcm001w6fvbhdqe746zpt71aldsxifwdtl5q6idqlwv71yvbenf6gly1uh2162b8pzpm46arxhcsr7ninvo2zbxdklo1fkg40hmb6872yw97apz5hke1jfmocozpwr69vd9zkqgztc'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'bvvot93g37g5c1x3zk1ijhjk4hd89y9jx2430qubei338dnbqqnbmpa93j567lk4pt2pc9tqouyckyg2mo0zqfaa0oqj847kve8q9bg6ybp40awmzqzuopge36eaqh43icxqp988z0rgiwwfbglvd9rfkiyn1oqq'
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
        example     : 'v6ng5tqreb7u0jf892l9c0qsu4bfkcyv4f4zk83i9ecf1fugswb9s7wb4ejfc00pfy6u9jl8f5d9fpkosdzi72atjr969qb7rg9psr5fhuvlanwyj3seouwo5cyau8sr30rqim8pfpn4kl98fzg69yhv8a9p15n0'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'vtsknoseme2a7umtrfafjurphlxbhatz3jwrro5ypk2jmbjsvcx0kv04fr0p7c5ysxfdpgdsy3nwtcj1jb9ufih5kkzg69w8pelbximq2f5kprwcma7xodjmtesj7n8dv8ipg4f1l0yys3qip6wnbt87q2kiwwtp'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'di94n7hdz7h0w2zknuwlbasrwtnzwa26tb2ak587dldjai9l58upl56tu0c2btc9mi2gx6c8g9myy8bsoyag6gzvlpmlkammqkl2rzn7651ix2jkz0pnu3lj1vl2umxs6rymszuuc8wgb6kkt5wdqiss8q8oga2a'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'jml6zd9pmfaibqwv3lfk5pdz1mofllk6d0jat2000ck5d2fnqoqyr8vhrkrc0888xjy1w0s5nqirk1u6m5u0mq657t9c6ttql3k32u4gv1zz0eed224k4437gutlewhml1rmak5ppac2gzh9o3m5we2z5sakp8bh'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '6a6dt4i7q803y9gfl4sq'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'i9dbtwpc6cufo2l2ldh5r8iruig5mxcegf20jvga0gyonw7h9zc37y00jyo8'
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
        example     : 'kc9uz5vkoi4ut0ehrr9svqlgi90wsxvtfylpem42tmr3oavi708aknvsj2bi'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'mgnv8ctvqcs0vc3562rlnh6kck7eec9vw3j1fd1b2ddgde7sagwcsxkpo3gv'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'qg8th3lrdlslshdc43evxdx5m5867ksg8ahr6s7ntueg94czkqd3ntdlae400ndo6e80bhjo0z4xkfh0opy3bhz5a02owt68qrij1ib0vq7bgc58gh3h9fmy5tg6f1qtlepjah3h07bhk7p963sompd773pso9go'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '5cx540luhvss5f7s7i0o9w1ve28aynwgqw7lnt1i78vhon9fyxvmpcnoau42hezvrte0dp6cvzowa4o513xy7vg8odd8vqlhgfkc68lzb8vi69lttvnhf98m81jd2zh2x0n1yqu8m4zayy0nw3jzkbhewyag6p5k3z7hqh4y06wxwpkji37efanvowx7156lpbz5sdvth5cxjn7b0ucs0n2mc9mjro41xd39l84ye18ozpe3cypi58gkqdu5x5tdaau1pjf4203oxlh0rl70evfhpdqye5uu6cjm5g0l6cl487c4h7f8ywdtb1lw0ftf'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '71fnmphh6gsj0fgx40hp5q2hbtunqba2sn3n2j14zsgsg34h4hiug89gf8xq'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'xp4jcao6mggio72dn8djcfxwia79k93b77es0k15g4bdaamz0wz9mfo7c21h3uzbdmnfnx5d2fz7ntzxps1ro9b13fi7d05k4qteg3xx02ek85whbojjt85flowtd6y6t6gjsayaano1q08all315pxi01x5gq39'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 7428198225
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'o9s2bc60kom1ky364hvic2bbcl4ii2tte19zp363dqgbns3yoax2qewxdmn582yihndhu179bvez00e07a1s7s91m0nq84haz35du60qql6yf59x8kn2uvbkrvzf5zxlcm92ok3egnkdh1thm9gn54kamerh9fma2r73uwdccz8j1nu9nd6l0jnzs52k77ttos949pgdjbr31942c4bjqco27y66afhcuvl3p816uv8o0evk72nra82ra1urqv373qb2qsh4utoeuw6hpdiu6i3f97rvibpll0k8wcuy3xnxoed76euwnshke4p32nfvdz00jwpw3msd3p8b9bmop6zpsuscpkbxfgf0qw3ywb2ek01lpr5i1987cipnrq4gb1vmaiza4egbz4a8s6fsvxiy3ueaw8wvlo25ozuw9ah26wc2x2zs0v5r05wfvgmwai2gwympvat7duteltouo27vfpjqx5tbxhwi8sbzmclx93zhb008vue0u2pdgpn8zlnv1w7hdpudatsehlah3txz7avc41etaj7qjlgjr1519exo83hje9ghpav841pbe7ymciczdccq78ert0k8986g0y98epcozkwm5gjo192t700pelatftqnj9hj3rw0m392tikc5chl9as7l2ks9pae8kd2p3iofmtqu60nwgbval6ewza6sz97eox1k13ukh4cfv2fmyhdpdh7yv7vmbc63hp7jls4xasbe8i126lnx6fji74ljfgrm4l1ifs8z6hj2bflmy904sydlqzgbegm5q03s18n1u35iwpx59c5xir9hso964advg5t7eengbygj7zny75c1gmfx93uv0nkimn3dpiq6vf8kwbabdd6jhqzfj1eza752z2w5zorl6lch46acp0w49qtuht3n886mea1n5kega5ks4kghqb1vjktayfyuvytotm41eh8sickd4xxch3gvt2bh4nh5kzitpnuzybxcf7licmjoaj6px9j35t9x4oph22xcczs'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '9ai8iop4u48pc0ctoqj66oqnsz5ibmwhdvp459kmps3gdrj8ccndflk729mkd8imqqleqnhvtiu3k34llomc40ngc21prxt4n4ue213ia3vuttzdi4gva2ft82xrihgpc1rz4rmut8ibi00xu0zcah9lp3hu6uk1ddv250d4mb999de3r77c0uxjsmc8zhqsvhbunkkgjna9hey3ek6wsjk12u2usv7lgxbhztyfes5azs2a2kxpm9fd1rr9qf75b1r6piwq834ijvqnxrkxz1yj2eett6f1k23crdcboxto1a9upic8fuj37cpbep2f5z4uyvy3oxt4lg4f6af1b73tq048c9ggf7y51hwak46ovirmi79v8cgi6631q2d5yd220tz8c2jnq7y6b070h7yfi7bc61i9bntw5yn67dtlp5plwitg47ybf2oybrdof1lb4zwhot1evgs4cm0t1imu3xfbmac0mobrkwn4nbzlxjwdqov2u9r9ok0teaxhb3uj9fo2pu0s7u03z9x6e09cefhiak26s4t2v77s94j19ugwaiqfzmdbvmxfa8zky9ggobgzkgnhlyvzi1v383m7hgrcx5suaj4yxco39ix0e1puv1mueuzbg62pxn6l4wpibcam4cesipey4g7d6r3jsbywiax484bf55oboemjls5116yrbtnnqf2acptvohemku7mj1agymd1ibx2jg5d4b7jo0ekfh60a4mpohzdnyb7o1m9cfs6ka7udobc9v1kq3dgsissb53ap6qklli9554meekdv3n41fb3j0c9nssvg7n8rquuqkbhm072suhgalfcg4f8uh74tcxcys0u7d1fmavde44gljhtdgh1mbc9y2rfmjj65dnw3x7i1900mc5x15c9t91o51bcgoeh07whjxnfqd9l3uncmhfjwaugyp29opxeqpb9vjrg5nudrmmaxl2rtyurw31uja3ql7d0v1z1km5sbui8l3r96yfp4mr5u0i2fdwkc97d'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'qusjoq5n63xa60tcigof21cs5yzz45isaou50uh8g76qxi5s8ni86iqchx5k'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 8739709821
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'bniwgaztm2t2usgxanhyfn18ppvsoy0gjs3bb2g5tdrtnzgc4xshwdi0v5mpm8h9jsxrmv9wp9n91905thjwsebdxwth63iko9oeqlh6bq5wghr6ykiul070cpojdja15vu4v0sm1dzk0w1ohbpg6cbqtww1m6lv'
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
        example     : 'h0tk03wy0rvrnuhsg0pt1bi0w60n02a37c9syuykefjbcs2dn1mju74piwdk4pcfnik9pjf0t2mg6fzg6k30xuqn95i9v13jlm4jav1h7f0t0rvitexjibfu514dsydkjgu2pzr2qbqatiexti5rc8w4knys8s17'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'pw56o15nourg818qmspj'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'zf3bdi5ohm9dn3nwnbpr'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 07:19:51'
    })
    lastChangedAt: string;
    
    
}
