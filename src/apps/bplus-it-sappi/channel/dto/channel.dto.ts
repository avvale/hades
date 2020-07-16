import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '26610baf-b32c-49f2-a506-ad321f68998a',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '64b53c23-1ffe-44dc-96df-0f3488af5681',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '01996283-9bcc-43e4-9963-a18831786df7',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'z7k0vfjbqze1o3bg0p5j2r9bd6n5oy6px3mzunppmmgd5udk4vmg2ax39cvfumxagybemm0flcex7uhhqz4rish9du4ygk2axpkjnurxzxo0cgwnpw0zxu5smzrwo7657mvs7v5aa1erv3u2hpnvhd05yl2zp6ev',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '9v5noq2crar7ljucc7f5su26kbmgldoxp0fd3ukzn6pzsjb10rrpzin3j0tj94o0mzka9lxuirjmf5ac8va8ltu8ljp37d1mdb0ylvikn4srfdzags4hmqevmo9v658wqgct31brse9q83jp6lt0tyxal1rzso52',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'rf8bkwx6zmvkflgjea5addqqbwp1tb7u2xf7w0d5xp61xf654uylx53h8hfxqy2c58xm9anlk8262xh2vw0r3wjs6yi2kcbtnstx15hxje85fs3hab6qdd0gwpyefk3p30kz3rb0zx0j9vux3200ui6573kykt3r',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'c1u6abcrug37f10qt3jg270tnq3c01brvfs0o5045rzzaz6bjwzrylcllc9hag7vu2i9z2p2cnyyie29tf0tjfctquj85gyq9f7qgcembyys881c1vp1rehx46svlh6nods3msvi4z7uyxfprl6z85j51f5kfowj',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'xf5qpz3240eetmlnxpvb2pyzx8g59nwubmxydxcgxstxhh4bb59rnq4ysbn8k0yggl8j50yn36wv47b0r0b91yrxjvxa51smumbmui2tq497umsx11m7atcd1tsvkr984gpejn92ghvheypv4j4nn1xihy3vg5vw',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'ynatl0r8d1b21q1yxt063sac2ijtbuazec9rs1rhim8haita7w0kcy3w907oypyj5z6mncwynq2v00n7y70nw0ish8kbs86fhl86f99vejlnkk8t3rixgzz1efer6xstmbxrj53ahifyw16xml1uikgointbih7f',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '40asm2ayhhhkgc4pob46ayprcpfnhq1m59jkp3cm8tgoaej5tnq0uci0xbqhhp9nvp1f8ids5b574gn2396j0rpm0nyn173hu8jlj3lv0xdcjlw5zzch1kxxqbj9tqh7eye53lrt7uolfo82e8gthuy0vlmr1fap',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'gkxpu7qjujr4ma1vtpu8eaghyk6kwq9br4md5zw20fwslugsx1n3itzzmtgk',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'SENDER',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : '3yeddyu8vjrthl00791exf0bw0qaa0zs9m3cfo9zqcjoq3rctt52vp932ykr',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'paj5i3km229uoppmm9zssdnk7dcw5dkfiz800564gpgciekoj8f8t1h5xl02',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'pcb6r4z3cmhhidf28kmzwudrmpcwc76up4oh0a8ial44o4t9qjskd1szvaasevroggjnng7nxcfg8x5jl9popwe8hijxzfyz3lvwk0rg7soummcqk109zgjz8n6o9frei12n6n4jlcnfwy6pvu9oik6mscr2jl0h',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'zgqbeh7w8jz2kx7bqzhl2cxx9ao1s55arwuijvduliygt5g7g9j9q0xtceim3nf4axt6qmygr60sedh18rl7y8fgyoys1wsfmox8uei6nrig20iuds7igh92wbgmmb9e1k12u6g6784aohiftt1vop7nff0jp2onvxdoqd4qyh0uk3ahblfrtw2kelvbiwj1oy9uct8ciztyfyamad5k16eei5b5v8oda8fza07mfby0i6ychn08xker9qzun0pzncrpbx2h88070k3hqq4gxjwchcmogf4gy4ngwvaxnq4azuxebd9b1thpqn0om488',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '4q7v8giix3w8021mv28hwycltiwqkj8ppo1zqgleh5m0kr5py3wftrm9x1s0',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'tcw6y3sftdojaqwt5vuw7pmyihoipb71g3o7njsmbv3rcmtd077690o7v88eponilirinurh2stqa1kpce3yyeesmf9ocfz615b2ge77579aq7uum5gfm7pboq7dqw9e5nz8br0z1c41rzofjs201vpaw0bjb20s',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 6847274408,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '0jc7h71zeoylqjknrfs7q4l9es2kjno5mp34sf8cawdxqy4gj04zlsao7d7bc4jmhjkahpbe0qgonc90hjluzkva8ec9ur8a1r7eyq55cn1gouqo7wevk3sriukicbw4je3wxwvbycacj2vm057u6rau1ydtdkvgr6chxbr113ibx6h2y8vez6qdjdh6i2quqxdzq9nz7ca4ufs093ijvp66zha70cbj20b4e67a4pb4pgspulj1z8evrjyhpog0m8vlk7i2avga902fuiocs9w6scu2duas44lgin3ua5f3rqcezwdbuo6c4pvlp7mfg4ejurxl2de4kilbm4jwvpiqx2wfiiwwtu324eifelqtw5b16vsbgjnkxudlr1ujnwfvyd1nk0h4pp940m7at552q00o390bre4qra6sfsieybfz02rqiqvfuexx64swhd9jj4mb3fbevvwcsumcvsiuh420v0m5z1cfx99fbuxmdrtf32u26pg6xxmz4j0w5awxyixkc17bw1jdxew53036wjuwo7uzrrcgyo6n3mgrdmf0bj74l016o1462kzqk6hh86x3g9vv40puvjja7okjgciy9h8gos5ypgi4sjpf0jifiv3yoi657m0x13in0b8b2axh63yljsfc973ebwwlq68f1dse6w0it4f29xatv3kskfd1s2wmv12ylp5sjqs9wnfcbhvcsa8hhiqkm33w1c7zuq0lj211y2d7o45h80ooweae36h9ejrblp8slq1qc1jk4gqawgs3ae172vgnr87tkimsn6gdw4hqr0o3fny47k9ptr8dnzb7ovwapsxcuydmio5iz1xr9tgeoaz81kfled4prtv9oj93nheaylrc314jg7nnoii93dokpr8pz1gx6skounjl9rp4n8q01cit1qd29dwu3yocvrtfcgxhptu0x1irsj2g8ujzrmkdbtg872zrurvlf260br2ax1k56t4w4rlsgj2y25yfwidjce2igonnvs94v3wx',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'zoq1hf5sbv4fqyzs9h1ppsu08ngl81pghu0gvuctcv9gx7u9lpzht9xm0rji0qrpd5s5ng8advzxw7wbb994gnfjd3vv52dzku0sfzlh8tssr0e93wny86dlgsu4gdwnxdek8j5nfwyg4mgjv3d3mj71m7u6gc8evc6egwhytbu9rgj1h51q5lkccb7ltlxyh0dzxkqp8fu9ww4x43mz8kqrputp9w5kbqgchmreyzjmwsmwelwtd646otlxf3pt0tcw4qela3vef2wr2ncei8gkb8wzx3039w7250dvj4zgnpmwak1ky0ipefc77a13xpuo69ecirmkevh1junn6hh5kveaw6gxc02rlms9hx3nht6c346z1qdaq4pk5iysyippwji3xizie4wrc70ayovzcfgugel5qry1tvv7utzkhbh00odaeq9rmxjmodcanabes16vu2pji7tn49trs9zgd4nch1zqo2uk1hgymrk4ohdusfls7spiy4e6qqblucyxzjyf7sfwcu26vlfkfs3npt8h2ia4a3xvajmeh05y0x7qqqy2q3caucfspqvu6f7avnmhaw0eznzxlx04jv62f12pf7mvgiewf4r02p22e5pr6xipdgkko5fomcqqarrxfinw8tikj6d238htbm8rhpg3q6ooenungin4zw29mekamrsbeu5ewiikyzed7p9lu4xshxh0dh2x42q7rcswo1u8g39u7fph6y4vu4zq9tg1585kzex06ud6zlffej7gu6m9z93hyq5ex5ev9l7kxw7er1y39zlwx09mo5bk1iqy6qm0geszh4w2rwh35v0rwug5syirsts66rwn1w2wce85ifvnor4umh62w6ejzreto09eajmxqz0buk4xpxv75lgq2ifaa8b32rqgnrs7yywddrmdx8dcumbmpbffbxvls054up9npymmps0d5m6l24597rrj7ti8gvzeilx9yw03qs9bw8ap1j31shttpp5ytab5pyhq424s76yf',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'eg1dta1va2fuxnoltjxvni0heligkshrzxc3l1aynx2yk5nth70il2t7kuq6',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 5361702675,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'g3sdqpct00xloppq1ajpap010bs7shs1wm4ll28oxoegqotpxri0oms106wikws7weqpynbxje22xqeqg4esy8m3c2869ipwonv46nn1pkqbrr1ttz0k886b1vauzcy1kact13y1mcie3igkfjp0vzri4eum8ulr',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'ACTIVE',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : 'x19jics5rglx9wqxjw3v55em822rjphlu6zzafasam2c8s8fdoexwvd2374oawq2oen9cx1xg3cra090ioerhgik6yw4j30d9pqliebkrk97h01rrtg51wuz9sgddbzojn24eye738qrouhhmj9tpjqu8nyy38oh',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'tt0ia0cgd3pfcqu5dn8d',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'uzg5a5hensxjr7it7evq',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-16 10:06:39',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-16 06:14:49',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-16 14:40:35',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-16 05:36:58',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
