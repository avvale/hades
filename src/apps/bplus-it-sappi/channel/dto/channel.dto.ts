import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
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
        example     : 'f854vfa3nu8aqqy2qrbpo2r0xvg3qxxdectuo0qu'
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
        example     : 'jrynaa8cjxkm5niazhi3n0remdoifm34519jslxb5vfpatblap'
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
        example     : 'p01p0oystvz5a4wr9m40'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'ad3iefmpivcnuefxy0g467hnz42p3cw9eljpwwdqugfajfqr9cf6h8w88f4isj5n2dlr5v94n4asuijk8revhvu4gw65398pb6tlynxxmnzh6ksnb5tlznlem9ix83nndyhgbml01270coij36qqgs76e6c9j96j'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'zp2ktdkgzm8cnlxsag650jho71330wi6njgpqzcmtgcm7zmfimbuuxngt42qef1w594qxgjuh2gbf0bb2v9j1ej7tfkg8q9qgl78ft4slom59q5m7sx2vjmds4aizhq8dxu3uurl7q4oqlwjxeycblr4g5lakjnh'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'yljfvukdzek57ws7y86yg4ob0j7kwp91ajtu2rqaukdtowegh9f5pgumivc3ra48s6ebbel9atnht89iyo80wvruc51gghtrnxpyzjck9hx4rut7ty3doio71gsw2zqsuz2p7y8bg07x5ssxpcy1z29sdfe33h2d'
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
        example     : 'unf6b9hq7obpppbjtksuwrpzxya6r1ad81p34kk8m96lq050ez4qhp9ozzjk5gni0sgm7fdbu0tv86b5e9ocv23up2eowzwi6sd7wuv9323vvl0r3elxou5qme955ogi5t5fk6dzx83r74jyk0ffzvyijiv67czv'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '7ta6x6pindc5vzajjv9epji22cytrgzcvloe1y9pm5sarqzehgmon52puneutzvpsv1olm7bqjzq6auwleahj7cehpa2kpqmmmm0wzwt6qr4l70snix5fzmvcgulbhzc2bxjwg6r2kdosofj3ggcc4pcla633k5u'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'dditisry269fbyda6fssslvy9xff8u11q7kccq28bz0nq633rleu12lezahalju3fsuwsgp5dbaq0xw2wpi52bwhkybjxasv9zsb62kod3prnbldgos77x10scugfe68hgsbc03mmb7tilcbcu2kv2ai9xw37tir'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '758qa2p4sqgyq6g62ii4rp223l1zy0wn1jfz0rmbe19z6lyhe05l16ur8vklr9bq6bxh08st8uh5kjdujh8on2wtvicwp10f88m5fzz80sv2pqebktjg18mcdcjrf6egzquluarhhqzu7sh43xcywp2y7rlo0m15'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ivoi1oyuzrd4x7i24z9t'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '0qfau4r9qs4uohb8el936b8wa5zirg5xytk99hoih805fdxkezeg9b8lgdte'
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
        example     : 'pxnwyrp6vtfg0toewzbuzbankvf18qybef3ccm2qibb3s6n4ycc5lvgbqj3q'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'f3tpbirdnutecobuwh6wma5a7isp3vtc5df71iifq3bi1h1oufuqglb67bcx'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'usm0slnctvfbdnbzvcp85si7yjxp9730oeuwom5d9tq0xdw0vdf8k2vs3oyp5ae4a1nmlxog354cnp98ir1u61dvbm35ukvr2gw5irejf2qprmqbvbido4njmgnrmpgevrts661zdd8p4q1gb8zezaiqzrt0irxi'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'ecpae3jiytd4ix5rla6ufp0xr829bj228pjirkj2df2ry3hxr4qqfhl7yp7gno6t8nq9cz1yxphqntghnmx3feup9zkgukjzlp7ft0tisjt4j1hk3j1tgh5lr82ioidxo3mupbrbp50ohag8il2txrso1lvwpycckyjjfq3n2427nmgfhw5qbzfvjyk1gdxlfk374gy86g6rmafavuhf7wyawk04r2pihh1c5ipxlo96spp13hkiotmupby0rhs4abhsco606olpvvinhr490rhq9vmkl0gu1k99fwwba9aostld2o4l5cb4mig4x9h9'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'gnxhj3hkx8yfzabkcni2yof9dh977chqs80d5g610vqfp0cwqftbw5z5439z'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'e07m5wjowpy2vwqmnpgcs4wkeuao6poqzurwhz8ldpzb8b8c9ei50aqswrwilhon38jhnz0w31hkyyrncqzawk7jvuh4np2pnm1fxpjd47v4qxh359xm0af0fpypzxc1wiindu0vuyahs6qaw7mfprf4yzjsl2qp'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 1133380345
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '2osr52p76jw1xufhqnc9pxwo7lgpvuezrk7broljgm6oz0a21uil2zgrk3uphmd9zs0rc5i65zvne7pxjsigze1n2iddn5f67m49dau6bm02n0ga7hjalg1r4nhua7j5rpgvimqxt70qsow9iexexjvoflejsralw0qjoy40w9gzkktt8v52xufb1hrhcravqrt2m1w1h3ni7fczprfnjgeuiaiqg22yuu4om3o68qug3tr1hh3gde7s8myk7kvl42jraynnkaifesej65vdzt0u31nonpc8n018xvk063m3xh2nhlivafgrimchn4krj1kmyivkox2mmkcttbwakedj33hof1bxvnf3tv0uiki332fbterkeeie747rsxdkwxtplxrq0ewpdglemw6lwtljl3nq7t69w8kyknjicyq0mirp4ha4wyy3pqitm8679x1wx81vtrgktmm9yzbdur9n5u23qrxvyev72jj7pu1f19js63ghlqtsqa57vja215udfvmqalq477xsncee6u9m57ujp6ze4hxbpq2w92oymo2ikv3w8msafi9vqzcpcxvnxbw9fba3v6l6tja6tji2cly2xg3o84u57y5zr525gaz9o82gzeo4b9rc8wofw5hzspgauenoozqxymjt78a3zrpbou1ah541vob675nmtekk7191yaru7qg739e4cwvbqe160uh1s88ewgx2mare5l58vagwtadtng0a2dwdh6s24bxesp4lfclhcsi1ez0vl866h09q8166jnqdg5j14ngmunf7qshdq082s02p89yo28egx3bdpto37k951hqkfp70p4hxl4jy3dtdx213qa106hf016mu8xh2qcs0bbbjabidbzgiy662dy8v0vbo28wh22tmyjtd7bmckvya2z1ra5lvle9n8qus9vw2o3k6mo62k93oiim5i5yzsiz17e7uveb0e7l41ky05omy63zgkf7tuetl3s088ltjn06d6rqe9ojj4znwdz5c'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'oc3wzv7zriyo55f597dfkgn1my8mdrako68zrb7sszg1sfsawxvzgeqc734v8x966uwutnpnbftt2xu02zsge0v3mqz6ss3xuz27px4c9ymtep3fexlq1n74gurwfvnh20xo9h50dzlggemv438ezynkhiiodflnvtlu8pj9ghqq5fneeo5uab6cukw5uwl3yi5oyd631va76zdhdqbhqt2jcnpun0hsbtz5fd4e35pxe597mfub3wnqctf3mbv1msutnjgdkxc5hyazutv7ti3iiv6p4gfmecw295cc6bt5dco5no34ct4q9vtxcfredjkr98qdpw4qdjej9jogqd25th6eazr79vjrpcit5ndao4itvjo8mus29iv7t1vbpmzdsoszycknit94l86di6c1wy5a34f641q2liyktaj6if4ikfzybyiznmqjzkrt6dzt2qtwzeydqwne4s9d2lxv66ida4fmsqztawqimyjz30jrpr6y7dy84koogqfb8689y31k1sg613k55hcrnudmbh8t7c1fam7xp9uia0x8qt7qng9kh8o4bdl9tr0v8e2v4xczfyfqt3s8iv5nqf5kcok198etjrqk3jcv1w6v5hl23ohu2xkx3x0sya98ykqmafjj5zmpaze8m49ic3xx47v45f3dvkru7tx5u7grrgddgtvzmip9hdy59t2t4p7bupj7758ka2zmcbsn54nt5z6i1rg1ehb07t03p7d41mfkqcjorsw3qgybpf8dlffn92ulifvy9fzw7tytiw07ki007id272j27deilowc727vbu7njg938ao77k9qgmizzs9o3r6i0gmli7wikjusavp0iqnukyv41g9toew1o62vvuqbv7p6msyxiv8s4xy7k0lqfdy3ge5onvu9md2vfjhq6iily9drr37dnfxrzsblmo93s854volqomv09e9ha7gr1b8lfilkkantraczda3ii8tk0q0tbsclzt3dd9dyxs4s86f94gmwehch'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'iiwior175z1p4pud3x6dd0stry944hl6nrpsvzbrznts6ouexxcdrfrjrdr4'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 3623040265
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '2td01fs3s1yzmqea6zz1ctuddh0dywzam2mnkxavd3v6g3xkydckp8c78dnqj2c7yy6yblxf76ks9d0m368zw867h0yyuugrwt9gkxreydl6xbeq6jqg0c7fnfodcsys08wdsmerhk23gh398xa6p07xgo7bbwms'
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
        example     : '14o1bbce8p4u4ezc1zn7imtmccqggq4kcn4c5idzg5ujm752g4el8l4dxw9gxq208lnfa8xy01qtxp05754qvx8xmxgrnp0hcyj3l0uiiu0fam0cgzyhmlr3zkgvxopl3ks1kz7xjxjsiy0cuqsotc2yei9ogtqr'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'icu969ptanlg1agp3dzf'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'tyhmv9qidc0iilnwb1m4'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 05:24:59'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 19:33:47'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 01:18:37'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 20:42:08'
    })
    deletedAt: string;
    
    
}
