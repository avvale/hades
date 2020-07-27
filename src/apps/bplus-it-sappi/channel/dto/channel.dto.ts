import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
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
        example     : 'faq614h9ku0kevklnv5osa7brnc1j1ctgpb9xw38fl4egs48kq'
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
        example     : '9h3wt04h0vh1978ywfou'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '4zm9htvmmyxefl0wgbz2helnd06fgtqcwxah52zj7evp0u2cm4k96w4vox34pzjvhp5ma76qfz1lst6mk2bbmnzsvv0gu7zhilfr2gmrakbnggwno8f59m4pzv8k2y2my3xar4ssn2se7x9elql8us616tg6t1md'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'j9r5n44bgahz4t4copsracm15960hmkaf3j9vctc56r0nt4uqvlgva3xeq8qd3hcv5p02d3vkknz7644n7cr964a8wtz22rbzeq53psjlevkx1g5hds5rp7z3wci1coomum8sb41rs6dk97jo4ifsuavt53xefz8'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'kitz91p6oolc789fs99zvoy0c0s64jv9wj61jxd59mydqfisgzfaxp6tjw56hjw0d35rohm4oc0ve2sghna4x1bulsx4v7vj8mox85wmurt0lnczw4pl8almmh0oy1zqo384aeci2e9zc9caiwstdddtk3u9krqr'
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
        example     : 'zjecvumpjqg39qkji7sksa9yi9sab19b55uhq19u6qnz56n38yrf3ityulor6ut0tr2617bqg8fictehxaaeppmonmemrrzvbctwtru5er9zgqggp6j3gjkexi6lty0zlf5bpbcja6lxv5c75bvdldrfmfm851sf'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '6exhcfkc1wia16dkrq9bw2f0hc68t8mgqmda98bznm1ser2dauowjpp0cqcwij2c1thfhqbo3l23s29jcs6fx1j6s6i48nm1p68d5ds934uouy45huf60nkc1ql80c0lb28i0k5n51ncbipuchakxz9uft1h6ay5'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '2f7p5n3ueygv37kyxjoslz9rdcr2s8iko5dv3lqui2k3kkaofhzox6gggwmgxtujjinfc9rxl5afci3ai4w2fm0p5kjx3db82vw8xui7gcrcb1rin2rul3wp8pouti0in7qmrzpdqgrxktfgufu3mk19ffj5rfx9'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ksobmamtn1w99p3pj30cqe8y3amny4nskr5zqv7ef854dgun6moaozpd3xlyrcyrv0p12j2dpb9i098igh8wipdsdvdvhohimpnd4cclysftutwdkngvkaqlzn41zuxcjy0hsnyuvn1nd8m9tvrelr0krpi6zcs3'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'hltr5ore8c0xuyc4j57u'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'f649k90noin1bz83wxz4qftm2a7r8nmywrlnfywnfnc5x5ihedu2dyp4hwlh'
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
        example     : 'u8j6f08tljgeklbemmsj9c6vcyy3tpfycafeapj20wtp6q7pd7q0oj5cwmu3'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '5sbvhx1bwgql78ufrtrdmnlu9t5ohgv7iagv7x4z1hggnff9nmhde4d2kgyq'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'nz8b7e9k14s1hsbi0dm40qm7oh1il1qi4oy6z1pnhpo5m0kp9wqgfmmhkzgll8gljc98moyuysp565twtgxa2iyt22macmalkkm9oktok09unaoljyvjw1g4rpmlfuo6mujm9fdq180i7y8uhksvxdgzgs5e2xhu'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'zbxvd86v3qoymoa9f3hajgzeovs3h0zym96zofq967b5plp324f2cx0gq0e57m8r2i4xvefu5fz8qt216sr7kvvngujp2ey8jl4e05t368cawpl8uo4oiwkc2zxdddyagddwahieffcvu89x5bfqrfk22tjsk6q49jo86huu2zo1ufmk7oic3g2cz7oy68w5p7qu8nzcxvz08303ur2dsxwufdfdgyhqg9fcnxlla62h4mwdzkv7qzmgh3negudsb835yuu80akoxmgu2iooc1kw96mwx4pf4z2ilzp9ncc0tb4x7ers1rrlpjbnvmai'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'xtg5f4pax7pqel2idbsa5yf0hkb6a0w9v7gdiw3syjvs1kqqwyvoo2ejpmzp'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'rk4wj1hcdwu0iyczsrzjhv2407d2ouq2trd0tvt786doj770ci4fy0zk8nlplucxakupcn09gk68bqmp096gas20k4852askt3bajbxdhkleojpt8yisqbdyiw6hwri5hgh94vylsmurvdhyv842jhmdshdmbp7d'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 1479469766
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'l4s0vnwtju7bd3b46gzqna6bisfc58j93sooc2lie5qe2ghkb57so836czsxhgs2hmvxveekc5yr07vzr3enzt5lx3en8sgwvk20y96ln9ggd0qmr2i0q9ecvw2mlt6ap7dzabfdarx92qn0s2ybc5z7mpaf19f1nmb8z70nothdypophcjo25lhb5j7h3a74y8kbwmxdivpha8bq7x797unkymo72lgl2vdh9i2af6w92xn1dusv2ms6ltpa8ti47af4ner71i7um07v5kv0o0316v6wil33o860jwop9mt8hqo1teonl4g15a5vb6h3x77l3mmmdore187mf8067ff59perxk3i51x03u868wrw9dhdln8c5c6n1s9g4gbqudb0bv9ch80fsl9anomu7hcwu779sv4wur57g689q5d1m8k620g5o38257ns87ov8zbvnqo8rq6nfpmlyxqizek5pgjew2x8leb2uj7s89cz6cdcsdvxf3r2hgmz62pmnxk6np55luw33xvjj49nw2h8mtfpjd8d5y09zqnja8k6fpvbqrm6cdgpmmvhqfhpww1wj0srj43u7382s7whlf9vmui3x8hnq46x0kba6pa1k7dv38telkp8xw67ar6fjl6isn5j8k4oebq4itqw1102kc2pvxbct0ggygz3ssziga8cxdvfhywibloh0qjf3piruwfhn7b9fll6efjwzjt3ujbzpggk6mtxzncnsclnir8u67r54zm9krdvs22uvmu0p7q1f0jdz354rhciswztlpeb7z18u5dsxnb3h7dgnowmsp0j14q9dbey7kcc1szlh4dxprl0mcrppt6x4brhyuiwq4ibbd7veqitcjl390114yigc6ngcki6swsnio3f7vceh1t7bdqx9rj2u75f8ahsbeg9e8n4uwfm808ad12ugdzjt3jz24id4nmnhpsdcxbttdnzkr9wuqxg0a5z3lemdt4a67yc0rwg793obpnjzs37uh6yrc8yffq'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'qyh980ykuj8w1kc81h1c1u4qov58t5tyfn7lsvtmj5u2tn2x61kp6cyxgisjatlcmc5jti6gvrfopu32n7hvre9ydt45jzvk66s4ewawrhto0pepx84cjxjafe9t1b8p91f8pdksjhnmtw3w9kbs3jjk511z6kca2u0y2ob6rrnv033cbdq3in9rrc4goyogvbi559kjnhr6x414xyfbcrjqc68gcpafkqmh5k4npd9znnb59r6jqm41mm6rag5xuuimam1g6g3kkpkavdn1rp8ol9btwm2ffuxl4et4hb6dwkaag6yffd8kkrxjw7ldypk4nx8nw2v5827pl0eb73hc76mq1ytpucborshvro1fvf0rvjhzzc91h37o41ws6r9vg6h6urjm94g36p2qv224jsw5aovckxblgg4w6qs3c84www9hwbtz8hxorw3yopqfnoa00guh21c04hru2hsoko6lcq6bjxae0mcaogios9hzs2voz72o4kyeq7qzofwa1t75v1vaw0mszagbul7fm3ph3mvuslhs2a7ou2ew9w6jyaelrhgqrgjdg1zg0huh4gl1m6431jrhqhtkjtqy06zajn4q6ure4wpi65v3tjjlzv126dgsz51fqolft3iouo27pml924vpjpla5smrndmxzfa07rndqiq930ug7ru5j1h70rlruqml59teyj21i6vs53ui4oy86tvqwfy3ps7d4hd6k4ufdn4jtz065h7spif8la4r2n7v53hkb1j13as6o9xn0qvssi3mhilingu99cf9rraj704xx076ngfnmieoqyubwojnsn9w1xbczfaw9njghmq3la84khpvec3nomsbfk2wtjo0cfsinp82w6a6pglzjd9fkhfj3a397iwcv5dyer6te3jj18hlnbado304f5kvxhgk26zhri9wd9h0yoixrlyp1n009yamgos3dmp0j20f0rb3q8q9xl19826204em47cmin37l5gvuaede1xm1n10a4li'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'al3e5xz05emkfyti2c9dgsqk2sondja0o3l1lcc9xjkrf1xdl1u94pxawhtv'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 9087015323
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'yylmi3sbonce64ss9y9ue99lvitkbd7v7hf9n7mwq9h7ec7bnwmq34hqi8zkkfouwgpu3ly2yeluzd37kbfnn45sfczq5pz1rk95ksopgw9nheye6zsnp93qv2yxghtegagui7n9rshpngse7wao5b4h9xeaygjo'
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
        example     : '6zqkfhr78lpsp6bhdzz8kv5qs7ec82uh57z86tjwb9nw7401588jwkrydi5vvn1xghpj8jslmc2xmhcym90sjjh19szwkrhaxs91lyy726ldv4gznfaq7jgstcve3ikrjbek72tougif86yqot2jnwfqm0dkkgv4'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'nqc9ns1le2a152199dvn'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'kejyhy3gic3pcswdrxed'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 09:54:13'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 12:39:27'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 06:06:00'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 07:58:37'
    })
    deletedAt: string;
    
    
}
