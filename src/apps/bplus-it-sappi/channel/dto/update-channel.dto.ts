import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9f5e68fb-933a-4154-9173-ab92121320df'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'ohlezhphfu2ji1sdqf8q3f39yx1e98legh83wj2z'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f15f1df0-54d9-4b60-b607-eca015049cd6'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'l7awtk1x9vsj405csh7gcnq94qznt852e9l9zsl21bqouey70e'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '2fab7672-6276-4b3f-ad9e-15af490846e8'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '7ibvqoi43n9xq8gntql1'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'endhh9ku2t3nt3tvfs6j6fikhniyn5esupphi79dgkpnwbactte4a4qg4tj7a642ytjhffywhqmp1k7r3cuus662kl81njeb46pb0mwg81dbdzqjzpfedj37z7e81k1sxxcpasglxkpes26na3qzyji80zhykt81'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '155yjc2lik6877ozn2992z04hmnvtsr9nhyegp9veo0ma4ts7d51ve05phiucd4wrfup3878j57ge2z5ek2eqi1xwnc60ns4bcl836wnajezyrqfjv4vuvl5cw67imp4w4xkjd28v8qbtca1l3v81585i87og0gp'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'gor3203m3frzq1wmft7d3e2ccraokbenw8nxftlz76vyx971j1okg38odmi6y7y6nwcyu3qyiir2px17uk5g117giwun2gv8b45lp8n13di6514pkqfrba55vabaf2i6qoz9xcpq65idgehmdzt16de5xk3xr3ni'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '1fe511c1-b25c-4937-97fe-e56d441688de'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'c1qn8rk03teitabygwqxzb7ed8no2f5s2id6s6y2uzhx4g853amatw9ao45vp5plejltrtcmsz409uf6qnu7qj9u9c2ob6k3705jxh57gggdoikqzgdyuq7zyf94scuscn4c4pc1dnc7wj20zn9s18kcesosb50l'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'pthijr9d30pfggs4n5gg28gmxdst1b8xnj05ixoobgalrdwe5vf2encnbixvyaqp93r67qjkpp994j2nrpcg5xfi64whjj1kzlqba3w6zc4kejyrvtvqlii0k0y7nqgmih0tyh2tjvr1kfpdz2q1pmmzo9uvz4xy'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'arh3g07bm9v0go1g10vx23nfv8qz595qx6qgtzb4ee36l4jj4w2f6zs67w1zh2g3ip04tfmcpkmhoqrpeq5nmvxbbspeeux37bryu54230ymehukmam4mg5x4l5karl5njt6gypnk0v6i5u6e6ak20g5zyzdbako'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'b2y6mtxsx9afipdv87py7dm49ioqhvah9dnen8g6nxx3srri8k9w6nnd16s7a18ia4r2mb3fwzzpocmskz5s7s4h0n5gj1q0lmp5648n7iblu2fpd73zxf3t4bcbt1wmqunqja6n6tttdwg156y89u0kfya4olnt'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '1l99k3ufvd399sei8cfd'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'uurd1fojsk0tjodad7lle0b3y9d3vdxwr5ftfefbeoelij5d90e3yxehhc4y'
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
        example     : 'sssj7ei9nf7xr240u9kklafhymhd0euxkxa7485810jlsetx54lb8j2pxre4'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'kpl1p2sq0xefug21dx3tvk4zroewhq5w3rjaxix8fo86s3cgk3vcxysucy3m'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '2wpr72dn9jkcqko54uqh05qh9lqn4jsijahwbw4ysjozcwqw4uipu5111pxaonphjt4a8jn32juswvbv5aauhzc67srtf152z6jo5rs6d1zaqfv9awa5mk6j17uoqqi329a4b7r1gfit1pwkmhsu1n6ih3ghpslu'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'x357ku24n0ptcu7bmtxhdzr02yz9514qnodk149wl8afhi4xw6jqom52gsis5ixpomyqk381lh5colrn17vunv828zamppzdno8e2kbbvuygp4wlvxbruk5ddaefxnu2wlok2172i20l9l8z5e57wr5jj5oagm8jr87sdyzlwi84q9jx46lk6aukpvufgv6is13dgk88ambbjakygirje1dfo0kd2pbobgikdxv8d1btmrztk1yin75bbdvpu8bsykqe77p2lf9ilkcht5a9mv7gocllmqzxmvfkfmuyw8qtlc71xm6b5rjzdlyy3vrg'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'xu4cgmk39ehw3785yahdn2tjko04zynqzufjppr9lthvjuwpamhwrdf0mlnh'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'g01i3d1rsepgl7mxu8u9fn7l1xz1bvy4nwnhdehqjfawzk08dq8rf96yxy3u4hfi5vf1l2k4wf1623irell5r0k3lh5n1u5ko9s2kfwwll7oymyphj199rtrg2syzylc4mqvc3d4393256escjcyfz74vc1mg6xu'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 5200421662
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'mokr0rf2ls0blg3owqifi605r46s356j6i3frd5cgxd5rlplxs93882hgnfk7bom9s9c83ph5sftl8njcch7eoj4ukav2k7g9yocpv3fd3fxi2zmfudglu46p3s8s4phjazbdpud9w3794wzchn3f7xy6dz28hbbjde1i7twu6ravp8su8sgl5y5gjb2v4jc01g0i20pc3j7oamfcesp52aztin6buii7fmy4jyn9i0szrhh8416rgjsmvk03yter7uthvuqxoq36uv95al5pnj7v4nc9bpl15mtfnqf587ng69jb6jtgu8yuxko27gwkkccx7nmj8l4qwoa8euq656s1yu1kkjhoxwv5782jb24w6mjm9jegjtbfdr64ziji07gf62ebyhmejekmz8ieifjuafx274xhta1l8xc1h7p99vh35cfjk2n16p53feifb98ed5afv9brzqitqf2ehus6leukiev183opi3uxgnzp6m6wym999gg66uqxpc8wx8hdzvykuqioxiq3esfvcnciu4vdli0o0grq42ekpcq0bft7tuavcicuzcpueogsxicrp1jfliqng50jddo44mfxdkzqd1aymspgjs32gprnf1dxlndf857nfuu6hvrg8xy2rw8egbxsix3hs0jsi5v0cpwxu60si4tgua8vm6u13dwtytx35jqe4q5bvk9oyfd0savm2cyv39cdtul403e4kzhqxzhr29ye1p7lmcv04ntah1j1sqz2xza30ccpi1imx59f6wdf0gt5717tkeqzij3k9nbnsrse6v4r3jf4391lqxd4b6zxx3i6wa5zut4suac7sggddxnzuvbxs4vfvqq9fzrpfp4ywct641eo7g3gq5aasllnuxmb4p6gdwzdqihf4oyit5d2xzvruyh2si2a21gmvioqzca9v2n5wwhurnml5fpp4vq10rjqee7gpgd35my4r3f7xgc0wvvobkz5efjr1wd3qf39cf8bsoqraxcbomcgn7iqoi1'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'zuzkensmak1ui2x7rattrj5pwkd9ywcgz6nstmgq9g2ylsoietnn07i3jc99e3idokumzky9792pbemv36mmdnl0mx10bn8xn0ysw7zs74zm7xutgf1jjtvt1wm5kxpyc33xj04aom8qftj1gblzof0bgli0s1u4qxlppuhxoi842xf0pvr5zfz56tz57rom56xmghajr9p9qx3md9wivn8o6tm9tecm05ew2x5qio3gnwr9ek0nnlx2pzk39lmbkplu5bkcafeygpqfwclib8kcmmo742oe2xk39tyvak3ys33t5jydkw68bga86bnozr6c79vp4xqw6pw2o10um29q62o1fgs07597x6ym2caoely9o851lti0nccpw3iod123yihuxmk8i194pqa8hl5qhobgj70vo18e6k4n5a11cmmxwi31sgi3xl5j670m5dy8ljsd1zyjj4lfgb773mb6yaia1s2sk7hqk6kz1g7jzqm57bka4zpfx76mgkxdsowmmfl863hpc9gge29p2ztkq7xbtc718qgb5i4j4vgan37a3eu6fa8plqts9wz58v9qwad0f424iu9v2arbxierei96lbfp8h2i9lzp030b4awni62ezuhtmq0t3s4wvurnto8w5ixhhg538kmp5354zjrew4aelupjxd24hvdblcff5erquwn3778cdxukwfx1eb9hu9uzc5ncq0y5q2h5psuzpi2yvz846uva3img43jixx9bpbsnkkosggfcg8z810qnwog1o8glblylqjvfcilx40ezxjwvyimeq2tyjpk8wm3bbvlbjq4gkpw6wi2e2krbs1gpmx3199nkzq3quu5pjepc2lk11t70aeiio7x0uig8hs06e5cpxax8mhnymuf6hbxv28g9p9t2xm5vxkxgaoq8lif5vaoo54xxc0la7m26l3dewp3zqhnom6egju5smmphdel4ld6okqyfoagd4spg90zl4ysbwo5n40n29q7n0ilk3nzghq8x'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'tid6eyyl7w7m7wvjeva7o2cdv9j7o8zc63p9kj6u4um6ao05yrjxcmzndclv'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 2112380696
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'uwzbt9e2umbw6j4vjfaovh6mi58oxu62ytnayoa4ygbv2va7gxrl6y0807d2h522mi628brjx13skxspr72wc5a3o69eu5vubz4xw1y3ff1rvbnqxmqgcovctx3rwluutlghkm5se511sov0t061cvr3kwz0kdui'
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
        example     : 'wbg0wqy46n891700lb1w1ojjbg93t0e7t8fr5h792im4zfmmyujrfhvdkuh43wf7xhpyc7h05rotag5jgxmii0e6ky8dqejh9wkek4q5t1y54w2l0z4oe034ym68e2msqpuuvm056k87zm4oz5ezzl96l0hl606q'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '87bsdwy3nxozi6nd4wcq'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'ovy1p7vmnpc432tkf9o0'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 08:44:00'
    })
    lastChangedAt: string;
    
    
}
