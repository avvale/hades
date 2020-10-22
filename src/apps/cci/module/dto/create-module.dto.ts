import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b4913af8-c04a-4c42-89b8-97f452264102'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '44942e49-7ed7-4dff-9234-3923a5ea0fd4'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'x4ez27qkluwyuohaoig2lc9btd6bc87hicqv30spk6cvm73gx0'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '92pb50u4ydgvdt61diav'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : '2h949civugjkvrwyv50plguj4wvhd6f9u9s3ffxk'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'b9f8we68l5lz4a6fx50euaemk04qiobqh8fyvrds23e3byacsd3n6bmkm4gxkoohj4ijax403tsfkcu7h1uawba57qzj0vajy2gg2u7pbjqanattiyfumlip479njom6figzm216stogkq1vdcqugsmh3k2cbjx3'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'cm7it7ipyufvtbgpm1ozimt9rcwjlv78tlkasf4wbt0bqqqfcbz86d43jft9ezjmv9ebaje5zj87l50cqatgpemflut8ftak6cljlllmznng2t0vgz3mxpb5cwqadr6m162wk9x0dil4r0s7b1qbb3qreio5u8in'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'za6ywee2t94w0061emfbdum0cshe4sss8bpk78dmj61kgqep44ky9bsdup48tf02ilo8b0mlb9o9y41h11e8n6347hlheg9vdx1zsnlaqbu9namz3wzh6zkdhi295qgw1q795v45yqxbwve10jhjj9cz17p06wm4'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '866uhd9046mftbfuj8ibhqs0atr9jbffx8ly6h4i'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'qsb20dxfqx02s0x5adgq940xh593yds32lmebocsqf9yedwvhjxk3ij30ni1rciwh0to2hb81x59tdei4ujwv8ywb8lm6u8am9po1xeli2odjr113c7d5szwubjumyr3343f4r2jxwe9il942a2zjwrgo7gyyhky'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : '9yoksnzswzydflh313ps1uvrti0ioehs28583t1lzcz1exegxr14t4se4np23of4rxysf4sbizyqzasulj21noch0bh0bzoe3w9w5k9xo6yvlylzvf0v9aqea1ea85oqsfdygf7kk99217yjhjd5f8p531yvi5di'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'cpn0zjp0zj0tofb72wloizgtzbs87eszgokft814xfxz8qcdlf09cdnddhn45u0iuk67pzicfzippse6cztf31ttxyq2liq8chqchsz94psyxmulav2jfloysfx5r7s47ic164yzenx2kvv80yykmh3q8re8yma6'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'xy4284fovwfvxyppjv8rbngbnp9ucpclbrvyy5321db64aheyalq6lk4ov1p4zsrcjegb9g1xdqbqoo6n7jmvkk7x68nu4w7i3ezx7nf2mpnvvo92lapl765w8jf9ea4hsi0ssecta12r8ktmtrzpamx24pwe4nk'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'a6mxhzyp06rme1swr7b6tae9xdqjqloj0lz3aniew9ea2wcpr9n7w6pft2x82nwaenn3qtisifx91gfq02f2uom6hqtzq6i24qbw5nvf766ao8outxo7des3cs8czmtz2dvywa974ugh0f511j2xsdski2k5eb9e'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '1rtellnhq6db6t8kuds3o4oaxpg69zo2vfnbbjw0vihtt7ggw1u590u1m276x87zn1hma119wwj991knx248og8h1bddihnk91i6it9oezk6rh7uvvz29n8oohpcqtozftg5nhbkfhyyfwbqyppfgv2bl3c0bitg'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'fxqkzte7dymmdehv8ztw'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'g2s7cls09dfrigkymnerdpbrj2vjgdj6ap0svxo093x48o8sgw828zkoj5c7js1yu4ye4v5ong670prf37j5ryfjcbt4p3su1o6pmhmhfbgf37a8pyie6q027x5tn995poq18vgfl56azhy9qzlfevndc5mhuz39zsv368bnrmdgutcp8e5ze4qbp2z4rmcvdfukqt87cbfm9o5byikqpsh5zx2he6sen6r4jrkm1zbij31ura7k0bvj0romgud'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'b3pvzvqumem5wztlb8cvij3wtqg3uh1zz6ec3xlx4rayhf4bum4v32ev3piu8787hr7yiclr09vuy6qp31yilubu7hbo34u51phdkt7a2i10xttl9ln5k70x3v9yvtx2v4h77h92ghspivw3n7cgpr23z6a35md2h8u519j4s2kb0dpq9ger6wr4nbmbgzio6sux959qksqhsmngewoprka1o92nqqhgh8dj8hsmb9yaoy995c6o3we1pa1q3nh4hvt2o92iogx5sv8zof5v3cbuzvtddsugxfai0z645pu7l8ypa2gg9nsou8z4ixgv'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'lrkauplv89ytbet8gmsojlqic37m1btfm38rql3opc52akr5oo1a0jks7eq2xfrsm4x8mqhn3b9dod8yo3y3owpd7mcjfqxwl6b0hzrzsag6nf2idpy3lq8erenqofi0cevyex1a6wfqfebqce77mcu5vmqx18mnlfkawiz5ic5ttq58xh76i149wyd13t0kj93f8loe6vk77pl1tjl2lz1vmjj6y6w6ahe32bbd43fv6xgua0lf3ziira51v2jbxga6juhlkuekw3r3xmr4yetdgzlrxvp32ire6k5dsv8d3sj2kp79xogbsrqsi4o1'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'qeti7gdhlmw8qrwdqvxncalltiw7wcemgo9wmjdenkobduesjf16u3npm1cvl607nmjnb4ixbks8en4nmv1kw7y0diryr2hskcora38mfoyo2skokqaq334pfprj06k96ro62xci3lj7rew5dj31l606o9ux62haqc3k4gmsziqg2de8auoduih0odyxezabo1wqi9cs65ymacsokcsra9we43wjnpxaf1d83dggfmzy6okviycrf2rdb1yt85a2sw2kf3nyef9v039xylsc0nissodfo0tjs10stpix7f9ulcaj5lx25vxiy2pduj0bnx3djz4yijeolp785miph26xc4sa4bm1xx3l8d7g6ng4k395qble6ua27ata2ib368esqo8xzc1ichoy6aalrjvypzwfw8bk4przxro7mabbah3i603qbeu4dnk9d573c02n0ibu3bjmsqof11955lxu8lzzqvghc9pm9tyd6ys2tk2xxhvmkb8s944eq52xudgmlfpimeqfywd2t2fzjvzu9h19ef9xjtqgdx41k2x6dmdr4po3zgceiuf2v7dtrfiac9gyjc7qj9mqhjxe5mxdgm9spvv6h09s93vdfm16jl0p3tt29c8mtq3j55eva2oevslv8wa8330ltr45vetcfd4uxkevfb4cz9wea5fzc29llg57nijf20z4px36wgavlyvgrmzi99lks0qqdixkmtbmyw2q1jxjra55ekb4ocl9pm0wlpe8ti439z5bu9r6wkgbbdg86ffo4tsk1xi9e9a66bxrmhhm1gkkluvq6b0uwfyda6aj46y923hqq21bctp54x2z3is9p94u74qn91v4riviqookv2sscy5t96ktqi0wi7wahyyd783jjivqze4w6swu42j7zwu7tvezgd65ou0d40gxknqyocv4al833giocxx5t33pfsk495v54yb5ll7k5zc633n89vf80kzjxs7h86y8dacjrjer8gb3knpdov9etyn9qva2uy95r7tafvjfv855k1f9cgx8l95z5pr07qg8jxp4ty06mprmhhch004r7w0tbth980fg3fiuayxewxzm4thz629941xavv8aa7ajw7pn272xpeoj91i8y777c8lc71mmsko646ljdoduke9jfrkopiijrljkj7x6l12xlcbugha3a2uyygknfrm1sbuk73h9g5i7g6snbsp89yal6pmlvwzs9r0j7ca7686slu4tryeviyn69r9osa8mrmt7wzcqkfpi0w485x6axpdpr79dftb4c09mgn11w27woj9d4oy0wb19b5ueyfulrgsppl9ppu6wqo6utixt6ko63jqdebuxax3fepo2vbagk5ahcye55aj8vvkuffz4j0ix6wiizha7uxojh21b8ft1ru730d3wt2y13nxua2t30bm89ueofxc6wq1obr175cqe2rnw11smvuswifz8023mkutps6w490e1i45l45sz5zbjcsg0cat1x5qo53kcn8w6kahj9r4essztfhsj7r8hwo404bup5e3ikxbae2zikmu43ddj4df5zl575q0bdrlot0m91f7cn24wqxlsxvcuvxenx9u0g6sdgea3pgdqxfxxdxfgk6x4rtdmakvxmzlrllwk94agw5ffir2c330cj7s7hbu5l7q4aln7m603ar8g161azjury204xrhosyafdhxo2cbxbwt23mlwnzjq9nnq99u77i2dudlwdsi8yotfvlkucukhnxggm9dqh3bj5bheo76c6hnpqziuh2z18cff8nrvkqc9favc2plf2r33y2j2lt3y3088c50aprhxmlhfr68ese0wlfr4ocrjza2llrgunjxrfsv3w6y03fs0x6gifv98uuwum2vz40xtqp51lleb7fiiol1b37meuizzcr9ftjhwm84oj5i0ja1en2m2kp46uflc32fioay3ry4rlholdh39kylt87qqy8hb2k1scizlq0ngn2qvau2yeroi119vw0q9l77ucobgm9l1'
    })
    parameterValue: string;
    
    
}
