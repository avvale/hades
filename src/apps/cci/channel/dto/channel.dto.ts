import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'dojnqf4b10wev29q8hmd45i0a61c5nhbyrzbisgd'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c6681410-5384-4b59-bbab-a166f5e8172d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ill2x0byg9c8b3uig3iokb5cwt9sfsfc4qbltetvozxh14fzs2'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '86cb3a36-e830-4290-a4ff-4053ac36b2f0'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 't38cw75twz73hvm5od48'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '6q7f7nkayoqrc2c1bl68ncetcoz9oqwfc0w37nfkgm4b133z4so171xk9pkumokvx5wj22krassb0oz76x95pbzgds5pgpqx4qrmmammf09qq8x5plyoe94r04lob4w3xrplin3t0dz7dd7kf5lj8v6q3jcmib3j'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'i811bkijb4q0xi9c50dpygiysrltm78fa8wbvjfjnh1fkco2k5p89f1ne47oxtmz33ske86z8kcvap7urgr2rqzb2sp6mxdtpk5k3u3qxj34kd9adb25igelt7cxlkozm5p2y61x5g2z6fxxc0vmr9qu1e29kc7f'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'b90ymspemfkiurdn7mx67kg8n4qm5nrv9bb6ptgpixftbktgfdaqk8ls14cu5y06vzxfysmfl0qw5xnkvhapliopvi7bfp649kaq0g8uip204t2pvffevsck9e1952l4g1kma20ptxwnrevia2pdk06gted69asv'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'j7mxd3227mcm9hrsrak1sbghd1i14t2iwoezaer0'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'cc1q066las11mmbwf04txazu8i9h0b6pb31llkbcm0a3o0t45xuhidcts0iia0skyh8irflf8f7s7o9betsikwjgaupqviy1djadsdoyiabu7lu01j94h0d294enqb4066ayt89nnbry79iu69yzz7ghzb028gxv'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'b4v44xn0kir0kcymwajerndmkkm8jtjjclzeowqbe7ldqlwngbmrd0fznpnj8kpsagtie9yr48w1k71wiqkkrq7hmsf5mvhy2bhhi64vj98b7gzb92tri7dkn04koki3tcfprlpiotdzdstjr8cw20br4u97me42'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'feny6h8z2q76w0ha94l2yil2998j3j3217m77lki1axf4ds5s7unzdp6wma7b2zt35qdqzifx1mgoo7phyuq8jmocihqnadl37teyvnny56oro5yrzmh7opsp0n8pn16kwi6o12d0ul6wnx79czc7wzlygx8f4ov'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'y3chymik8n0gx1ph8r7ax1p185f2getk5905wjwo8fbzvvycn6b3b42c090bd1hjh2nc5a4ppyyj7qyt593345skag7msr08d9rbosbdvibdeyg51u3ezk286zcw20xx23qsjudaovcl6a1u2r8i70dsnj786pyh'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '86k9f23p9yi2gid4cpkuk13itjx1cquz2kig2g64t66mf66ga9hbkk9tbpr8fn5opvlv7riputkh9716bqdfm08dh0oqcvt7hjrg6h8z89yfm9ewjlch6r0tbppo5f1l4dz8qioit7hctjrwebcl1xbpzuics1bz'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '43df3efk4ubxm0wa9upldc7ibg376z6tlwj7ayqsaec08uvh52bkhz4obbkk7txohwlv0qftgh4j6mjn36zhlnhcldjzkj47ydjdofcmkvuj6dgib7t30u8ai09dioe3h60mr3yjkmhxn9vx9npri72l8eta7umh'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'eqsvxpj4yt0s69j3j2wq'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'jl1t8rrp36y5zcy80nrfe12v8yg4lebig90aff5s0euf06j0c82gw9adka2v'
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
        example     : 'oln8x5s0tvkw3lui5xk2y11fftjo678x5z26z4opmzdhrjf5f5b6oyi1sc4q'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'g88py6cdsf8f9gcowqboatnszxz4vqi5owyeiwsfyxz5kdb3e4ggvunkp0jr'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'nuon1uw0loolvtz31jb9zhv8nl7ysh950tuoo9gm7n932ogzy1hfciyjl90zf5gnatqon4ol7wjkbu3tea56w0oenqraoilbk53kdsqx5l2kwizlyj5woxhhylj8d0o0aw8vmy0dpnn2fjcjtp08r4hxwu0vk4q8'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '7gbbzd2tedtz9a9b0eqemxxlutf0s1lnwuiskfvfw8h7r9z43h57b1g6catt423sckgeba21ierbjmgsbhmu6i1lr7f602db9y74prkzmor9yf6nc6v969b1y0bcjtsyw36g4z7h63bvvk5mdir7kgtnj8bifaxsz9zc6gdtq5z3n4jwajdh1myimrcj6ny3inzu0p017395ehj9hx2cxlsz4fq9o41uixsnq602bwokwg6arpcdenuzzquxqy5dip30e7hph4h4ltc5xwim8y5bddd4gmyb6d6u0glx374q411bkh0luwmoh9cvtewo'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'zto2560pedtfs5wzwxey3w7hhwg9uuzsag9icvq3vlllm68bpjd7ssa5a3jy'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '6mritf1lts28ut5jlhbp02ltw9mgibnxmu8k2rshrub8dhfgzga8tivudfn0cvupbmnlmiovirjqa2v1ui9twdyrngchjt2zgkmih0y5plbf84abhne3pd1b8dr1vh1pq0h8g4fb15zax11z4u6dekomuoijz19l'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 7705612600
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '2bb35czkmsmhksl4vujgu7r8wp5bszvvq5c0z2h9cvz1op0li66yu01749cqfc9rubims2u0uv7sma8h9wwbob2121xrzxtnleo6kqziazo1xkm3w4wubgbu045gxh1tq66k8jd2keey1kscw4ko4526cqaaoc143wllga69bd7wxq0s5t3ddal0iddnats1gu2cqc4su1xktalpb563xtxdzudm5zey9iysmk8gqn8b1z5j39w34wdj5akewul8axc9klvyv5ywox5fmpidjnggkeo6a3lsaq0bsm5wvp1js6znz0tbbrc7akq08r75g1ga3us9vlwmw10e1uksrtl9l6yyoc664b11zb0ylc3917163qc3chbzcgr7firethf681evvmv7kkupi4zzaxgsw2hcrwukxfijd2sc3zk1w7nr7fwn6cvwzqnbvro7uyrd7wcpyav8ds029rj0wi32y9pdyjwp5zjj1g0godhyb2rfflaf0ctn2rna49eqe0r6tmeowp77heta53t4xm1jflha4ksioyhsyi3ezs8hunayuxlc7n8n6b6lwpolekz79kqerh8tt0l9lnuhfbsxan5cm7cq7aoqhmqrm20pdw2lg5qcql2ju2qg7e01958tkm6kiitips36b691lrhbajm6i3x7gl6bm2kyenymx3bmhvcsrdmje6xqm13u1xaxjapbfqoopxskai61u43hy4le2vlnvyscwmnhv31hrmtww4fmrnlxnbqasm6jyzofxmy2o3cx89v5mamklxl2kz8r0xl0wabl3tti2o4a3223e1mxht6sof3xjp1vphdam187vu7n26j5onecsiilr5quu369coyggio8o9b1pdlkfnez7wdlykydjp6d02jtmeojxt7ji0q2ckhz4ohll2ejnpat5ew8j1g1mf85vbn30ujdlfwasmqddqwllqww6eslb4oo1tvnbe6tvga5twcm1lz9clbjzr7xyhi2lk8u3nrsy3u0qb60x7js'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'i9cgexnja9to73atpy5y83no7mhrjs2s5oxnmke4i5raf0deha6v733fo3m5ryqs86ske2x0benprofu5a0e9m533z8bvnm8z56272h2vloz5kj432h34eagy89gezcc8vw4pllsywpfsre1eq6zykl11aw6epi6ar4k2n2o29811bxzckw64yqzodhzsx2aoaohlein4ybfb926ees9ycwi582avqd1nmljy5wr6qgg92n95361kttqp2y4hndb5imh70bpd6pne5vvma45x4o1gtqj54tbohnekipt6zlo1w8ovahpn37da22kh7ossil2qdcnp6znavoq3j1ggfipqx1yno0ms6d2wli0dc8eow0b2wq95hq7i51xhsszinrp9e2id4wbvjmy1uoupvpwldzsldy6gduq0fvifuwfern054l0qathoom0yj2r4vxq2ngs2wj892l93hbdofc172bdt4i5i75beyrkeic48651ynyqjszccuim3qey26wnfwzfy2i061i9e9m44xpja7784fsi7juchuy1tssrhcvvcw4a8yxtzip3bu9fq5dihvl8kz2q7gk5bi9n1tac2k8kve9f8jxozvxzt0pk3x4dbl9i54txcbzfmhipi3yahtlfnl4m08fq9c786nrsy1qw7pp7v7fqvbod7fo478lxgmyngmt874v0k2m40se7qc9kzqmg9dzhrj855x9mmm53nlxnuhbh4hm1qh7rwwhmrxh8b7va86dl6nh7kqcxl9upaom6q77wflbdvhrdmqn03ce3ulfli2odbp36md0mp0vfxo1f3xrqjflmt4um3t62oe0rztmt9h9kxofgdrfolqtbpsmw2ih6s11o7c0hgr542dxopbj4ov37v80f90lcc8nr42b1t0trg7pwslexzibiyv8t036x9s8r1p7eei0w0aj88dh4nou3zql0ioo4rl7uja30k0xz4uwpb2mwrmd83rk6kxrg1cup502w5ju7slq3crtmy0ue'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'itge5g0xeiwe25od3qdkei0r9vdz5axog7ghy3zx07n4dlyca5t9zehppg8u'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 1822685544
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'bibkzulq7w5n9hrmrwkkhczztr06ji111llzm2v589qemacm8rl6gfb1gf4d6c771gkhpqhowqdviy7eshct03mxpcf8xakcmc6s93dt8n7ufromprseqm46oqgtfgbsheevcpg9iotz2csdjfz5h69kihg4stg9'
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
        example     : 'okbuxmt9fs6jhj47ubbnynm5zh1vz9y2vdxoaxnbq70u7gouxohpj2cf5f32lpi7ganfxsbiexs76cd84oxaogp5hsqk7seic5cypzeg8xlfmq0pmzbieddhh5012n40djmf8er86ex57f2hwakynzhix5su9sex'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '1io1yzxsdm7onxe8ttxc'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'vb1xdfw1gzt799zv9niz'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-10-13 03:07:47'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceName [input here api field description]',
        example     : 'e2cfhg4plg18jx5hm2ra8uonnq12hlg4qx3htcyk1unxq5dilxqzz5ez38lxde94pzshd67dvr5r7pkgr56fxa6rdvzo8iq9x9v1f2naq7yocnfyhsqnp96xkgot2ax8mxbwc6ywims0yuexgfiynxdkpc81bba1'
    })
    riInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceNamespace [input here api field description]',
        example     : '0tndroruv5yabcoa4mw681z38godl0nxh5fhnkcy6deeg90xhoe1cq9biaehf8ymjz09dfrukcacl1ahtshf6k2ts4509vmitzi6hzwbgspws8uddawvwwa9ijmoug68a3kibrmndwf1b0c4u4ofn0t1oky7033u'
    })
    riInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-13 06:16:14'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-13 05:41:40'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-13 12:00:25'
    })
    deletedAt: string;
    
    
}
