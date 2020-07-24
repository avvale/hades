import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3a8e29d6-9844-4a64-a555-c2f31e8dd07a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'kc4pyb9aeuyk70yh0syp6lb6t5sk3b9anfrisxvqsqyc93uqlx'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'q8zc4msexncbzxrl3uigd35j9pyxhtu0ew7zsvwmtks41bbviey6t9lafiu7nqg8gvn2g026vz5d9v3uolvad0hw8f07cv30nl11uwvu9k8jhk4tar68dta8e2mv14a8se8gjm0aaywsdxgpyfbulbj4rk36jers'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'k6xz87wjk5ayc4wqqixdlwlgixbe1rm5jcrxbzowy9uk9yecdn4s4iy8luyi1ucyl97v1lyxnyntqwgbv15ksojrsx4tfwe1ukxsqwq0n72slmdxzrwfihsurikoaerbikkidti3093p5g08pnmm0ufr9pmrrosj'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'psgxh8tqy5jn9zu9nz2raxgsm23opwpbr13p6larq21vp7a5hod36y5ud4fzz17q3ebnh7cco4ftoce5vo5j3qaqbdon1xlx0vsd7jc58vbimfshevrbo3fedzocjhx6zhn941xpi6hajipr5h5s4zufzul0mt1o'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '0fbf68b7-c9c5-4334-8024-cc56490e0298'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'ewb32gtvkqe7dkzapluh2x6q26w5bimyfib2dvmtzjyf3779lxdwdatrcorufpfv5s9pn48nzvrox65mevi6r6a09fcefem2vs4apz7eh175jeyzutrolpmxejo9gohjki6ctlkshof34wqklwt6zr1usbe6habq'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'y6u8rkp3wnz8x7ukoupsvcov41ikp0jii1xc6b7s9dfu3i5n020d9odx3qqf0tpuwan6cb5mai60acm5fu3ecp4k9526j4kewu5cy92whkrf4pmyhjim8hs7fb2q5bsdx6eug7piel26l1jp9v353g8q69jpjha9'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'm0mvht39bt2w007cemp3tew9cwddhsgqvx9fug979qlswzskbb910i5bevx5id17ryl07hb3i0fit1ur35ladcf99nl70jmaecbsw1hw33bbf4lpabdc01ge3ha9bkt9675o6enuir4y4z56w74a5nv1ejlcr242'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'fksg6d3fre3lr27y7x7uv3en6sudxlqe4scn34pnqxvvjs4406fj7v5gmzpiuhu1q4fv76zyy3m7k578aibb5fwb3sxajhtxd6ghiy0ty3e3mgamwgftnborfksdnhgn9wjlmtzz89xqa5koidpoyhyob27m5yan'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'hr83vsgp3u0xl97r0v2relvus6uqmgtyuzmm2cb3ml32mqglzji3f73yp3ig'
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
        example     : 'adzdg7ubgvywjv4y9pitd0bc769l7w0r0ojd4nz326ad1bvi9tq8xwt12p9z'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'uvqb3kzmaqaqe0ssodfmqkpc2c0dvcmmvlj703byefa1ozz7iiivfalvq9ux'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'cln3nau7p5p3b8noly0d6mzjai9r6dpd25k9iyv0d0ovpgcpj1q38rzxcdqq05bb9s53gu43oiouu4qukxyewvrxyzhg8k61tgfsdgsvqdwx9p55cvrx3okjhx69ymxao4yzrnmv3j7zedx06j92hvxoxo8gm024'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'x35jncc72lgc2p03poqgx2qkpmyhh9bez64suy5umybw3yk3vthq1jqmgw0dthpm6hwp02c5wdxodvsji3ratua0qhrxdm410gens5ybneh5whv1q1dwsnof0nzp009fdu3qb1tnx05qhk90ruj3zh79xgz18mps11q7znbj5hmqn9nzialtnm3uyxhoquj02m759rz3zv18gvop1sqy2v9lr6pay7meqxy2x1tcxa0awsifxiit034axt2sy63ay0f0wm9p3hnl4egy1ttxjsr0gcenne2woeeq1f4s9nueevsoe9gr3sbi1yy7zjql'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'np5f7eymz7j2ay7xb2rl21ocndjgknk0wi12h4g81ik9rgokjmnoy009eq3c'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'g0c4cnf02bdqduooj3nw00a8klk86yadgsmafnyda0bouqcoyltct54m4a9cpcgffijiucrxuktf9j7vybvxb6iznjpvhkhkz4gamsgcn4vnioatt2trin5te2alp4pjp2ivxmdk80h3k46m08v8kt9wwexv71vm'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 7527811194
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '1fsyq23nl03c8fr4qkzl08zyopzuv0qdbbzwsrop9e357ozv3av5touau9bj09kvhega9wm04ng2ub3mw0jtem64hammoyd965dgf4gc4nb4n3nsk2qwxbuzep40s4nokjzlwqb3sy124n2rz6gzs1qnbmv8jgb854ljruhk7p8hmb8jvc5txk1dibeluztjho9yiyqqbqo8m6t8itbs6ewa5nsdzkw4rlpxn5auvt072mvupj9gz3b5td3q10amtfgp6wc0z3h8af004q32jz6u4etudh081kwtkqisshcn0ld34eeh81uc7p9max6en4p3jscx0erfbgejx2mq8tn1n2vl007ulg8hqka2u7jdcck457ck61ntg75pm5ks2bqtrhuhyjjrqop6j4lp8reevvpnxs88u4akzzirfwwbukylpjvqrhg4mayec63ekgcoer1ty39tmawog4n1gaeqibvz4y6z03jfb720l0pk3ldn96pkwlzi87pd7olndvfjdpb18o8s3ft12h0bn7u5jis7epoohbaps086ewn5xj0k96ne16t7hqfyu9qu17bqvxim4ljjoc5uyrof4mpmdjs80qcerfi519cvvn53nct6ad615px657f65b1ipx23vkyi4ihx3qnmrbekheo6mvmytpnnm6z6w0zt1dn4znmex6ub3nt23iq66s5659bb6w010kfakymmjfv6woougbbzapra4dl4bkiw2erdxyqly9e2fqzui5qx30ic10mlppuv2by1ltnpt83yyiv9sagxlt411ub21gr7yfp54f55ps0qwptvlkoqnobcil09yti5vrvs2128o5aveyphzly3n5wpx09im0t2wt55cqabaz268700k5hvlrfrmiijjniih9upuszf04wky0lj89vgun4o3sk6z1gviabv9jzy0vbp4d79cpk5xd5t1eu2m5ds2zpgd80erlt00y0v7iveguqa2gpo3g42iwpij7f9v2t4c0ar4kj68rjn'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'yuquem2p1qavjx4l935gfnj7mlzy1wye9gtlus0gxczu7ppuyelzdrwn52k7pgsb6728ycu4198o63pvp9gu42vgvjwtp1w0m6sqyurof7e9kcrgu0n6bz69pb2f5j83p3jzl65lb4xqas6ybixzq8bj7r6jd2gub2djwd9911c1maz9kbeqcgws7msjs7elwb2e5ttdf5aesfxh26lhsthbsvdfwgnlubagmx46nmpehlg1gb8ehwabnm7mj4drenoqvo0mjnq62vhqzvqwr8tmg3s9r1gc0xl53h1uf8shk9ajxjrtzhzbybe6fmy1h431wohyg9r3mw5q3pax3rhyxa92yx0ut151stm1ckf5qi4ly5vxrq60oohtw5bgexhykiipdbts321xbsi4eitmgtz944dqqzuh2xegs1jja8jbeeqvr9zua9favdmw34fxcjulh5igd3iothwsfgpppmtiura6tjwwjetc5wikrlzfdu8doiwzlojgsnp4778p4go3ctsl9kwb88rg3pd44ykx4h65lutmf5fgufv9l5q2df6c06toh4if8zg1zmcro0wxt0dm87a4s8sk70j4haz0khw7hjr7udzs6y1oiljd4pahmxx85ey2fp2hivckkku74dfa6ouuv0iok56bn8qpukg8hzxj1y6njps3qboxzi04z07sz142ojgwiexnd48jlmk44dh119avzljj9fd494rfbti1tlpk1204dcn5nv4vmki4y9q45ncnefod4s24klpaiie3lkuu93v1iekzgg6bob2xr13sslus39r6pkrhmvu3qh6g7dnk9c4se4wwbgkc2knme6ndqp6r9eo1l3eq42srct9jgbnbcz9at6dt6wglw5v5aimfiy5feh3rjgv5upofhtdz3y765jz1wyuqshsgu2fwckmikziakm3okq5n5eea3gdfforz7w3ll4vlugfy92isa6rlee71uayk6n2sxm3kflgjr0s2esgm5dvuuma9rgdm'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'bqzein20fxl4wdts1fffp87bbgsv2yfl2bpd1l9kukld1gpcg150dul7muhc'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 1529759287
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'izvxbbhg7nwifn86f98h90xfh7fe0ujdacadx9jnip9vqviylryzoyqvtknsv5r01hkbpeghzaegkdu8dja3cluyokx3ywl777c78qbqb1fylz6b15n90lgdu61rsfb0pzd15y34m0m0m2lm4woqx84n23zt29h8'
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
        example     : 'u30gltz357rx68qpl4bgqajk17ttegoekyn99opx7rxjxk3xwyq4adsv5bxmcrbqxqrbqc5kd0h84vfy9vnzq9gq22cyzo0dy8kdkvqcj8440xzl6xjoi2q457mmg594x54cv7wsksg90fcuuak4lolg6fa3ok34'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '7gwvqf7lwkzf99wr2mnm'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'imzzy51i5ukvb26rg7tx'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-24 02:26:40'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-24 08:29:24'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-23 21:49:36'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-24 14:04:10'
    })
    deletedAt: string;
    
    
}
