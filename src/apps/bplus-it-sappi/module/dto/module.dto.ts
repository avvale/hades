import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '38bc8e47-c671-4c77-8325-263f03539693',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '805a24f5-0985-473e-87f7-e3a1514d95d7',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'xcnakmivfy2dtfcqcz09',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'tgjxcbwutsgv698yc3zmbwb6ljvk0b2q54dvtiqr8488gg6gor0oycfwujmkro5m3fuc2zuttng5myg0dz08o8588yap18jt1qzenr2qxj61css2luahtr2vcq5q09b11hywpi59dapmcrhkwi4rojq8dzaaiqdz',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '38kci9bh69nr7hdsg157uh32x2b3llya6ymgt9rw37km59hgbzv66spzvi0bhqn8rphi6pg73n4bvydfi0wxhnsbpvklibjcs87qzody46rlzp2tqpnwgt5fgne6qt2dg8alfgd4mkmuv1npqqafki2repea2cis',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'cyz7tzt4alvgxjlnhmf4ilslmd9eusa8e4ac9innm0id1503oeazjvl9s7aeztwgpn1lcayi2xu9nw5ykwl6hfnbuinsu8q768iwuqrvtl4jex35cxvh5u0wulxhvi440n6wrqthyf3iwvpnrd30ewkzu3wyj4ob',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '0zkm4jid0qajqh8r5p2mghu9v74nz9r4453ul24xzwt4ddxoy7tjiw572ycrh17pnnaqkma2blg0dgj0i23myfbu610fviyebb1upm3wc8zi95qmtk6sbn0wzl1cq40jzymyvtjnkcze0ebscwfgbkjczkza3vyt',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '5lpfti6bqmd0f7hj8fr3l6ftk233w1pi61m6xy6xvheymny3xj6v7y16t2fum517x1w2ny2ev7r96e9dgjs2oxjhcopxbd2kak3aykjty9a1vd2rx5fh9swxtjjditulsztxvhiehxooy2t082khjt0brtfijbkv',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'tg407vr6kkj3p9p3o3wzll0n5ckx756eycsme6amsllgmzgd9de2pfep5fgwfos6iqpet3vbyse5yojiu9ad8kv5ufzvrae9lliuvlhxb4wahb69a2nd8rww0b2v911dmji9rzmlvh88hyji9nc0nik2vc3gim91',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'bbxvygilvdl7fg770otrf9q3eeahmkpmj8xuwf12gj6pkmta7vkggs5mg88y5ghbwao9giavldppaby8ol3r2j54h9ygg2bi3p0uwqsid7upov1pm1zwj2z19t9c40s4dh8mryqxr8usxechbnt8j6yupu4i03wd',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'xhbgm972cldl1eftdcuh1lwf63aluhi8alwtsqmaq1qe1soxxp5tdiau0boq6dw77gzl6inxfa6rabogje1i7swb50rnb4l25ia0992808s9c2acylutkoc6xque647fjg1xw5d1yjlzgi9ayl2faozg0jvwad1o65l2z2al9jqbnfylpuqm60xyjfsnhyf22w3vg639tnqouf073w8k8jwv4vmpnffg4eos4zekhpowdm3whlcx53ys77vcj5o',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'k0li9zhycvahifg3zzxs74qcoool3bw9ehqvyht16b8j72fj63g8gfedglp4b3n63wzg5m2wb48opti4xgihb3tm33x4s8fhww18lj7abu7igzm3oj9xfeaz5mrrhx6923xm25px3e954szu4xdxk6bd5l00aj9dvj5wmkpsiwb6vsxt02mmcoh4k87ieig9fw5bit1gb6ll6oxfrvy3t0tcljivg1dcxxp6j4oao7u69xfn7qdkdjfcgsr7qke8feh7uti8wlqinrwmopbzh8yd8n8es5kgo05dum2wqw9xyal1roeqgw70pz8ztzrh',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : '2dgstgmm9qsq1nj93w30nmulafifrqykokqkjvcv7deujbezwfnbv8x5rw2pspfarupzqkzygh0gmpcygll2egu23ekciq4ah5795gduy0r72c87nsp3vmif8q9kg8e36fyv73ijxspbmzt60u1puv0homuzq6m0jhz4ds9k1hzcmzv3ydkc7muifno7gn6jtf7kp8etvmi4igqrzj7qx38ix7iho9cf250n7y3h1q2jqq292mochcvf51a8qjv77u3s6k94ow705q9l2g3h26xxh6hxioa3gt7f0f7ky093cgzaz4ay3rfesha7zkqv',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'yz4q8qofymkblop1l4ye5mut4ncctml68grcj5xgm3b3t5ymsc66gsnq9ta8ukgjzqmf0qoycjgzb814vxwdzo6edhzz6p4yp36d9rh9kessbnwvun5i6gy80bucqeqkwezaw4t367dch1f7554ed3nfug6aorlc24q2mmytf1fvkovi2r9qb84btu1nns9435f00xo3t1xnnlc6wb1rjr2qrmil23esm0vmhgpnhug6invv2sdsq2idldiwzn4t0o5alynn6gv1k7g17xg8zafcwouvxrocxigixv5yjcc09vh53m2netbv1gdhjxrv92xj7vjgqpt9c4827mlrte6li226o85e9lvkfx0305fr48a9mb3n1r4jpzsjjp1nkzt95o1kh26xhbtrs6fek8mes9jjxtt6n3ccfqw0peahrmrmbz7k5ld483b11ulopbrergpivpfskji9v2roaluhra10jl874wud3igqai1155bjkj749tcnuinp8zn7bjp1s1cch398rweaj4uscmu114e9xuvik53iiqdnsnrypwjya77gngzpkui01t2z9p5dkev5eeifsvgzdw5p4uu5uclpax9h6q5mru7k5j4ejrpd6iswiyisnkcnj9f3rwfji6xfw233gyv0rxt2ye5vvjffhn1xclpsc6lgcq5w4erfusuwq7modr1e0s4fbgxwgjs8wothz9sn75fd1usw0ngqy906b0o0wrihwu4tprhibo30kne95dhirkz7s976o3ipct5ko3ex6k5w1eekqa8o5a6tpxibckesooim6j7rb7nbq0gk6v94alcksd2qtbkhiyt4rqt3chyu6lke4a5vwtf8s2zi37esiyh2rtbryj1t7gzt7t9t5uymnyi53eyei8vq2enyevm0jzz5wsvmyhqq2lrud3a1tfhpg5w6zjqwc2ou5uadcmx6w9zw64rsh1o7us4kzd75wbtdo6rfxm2m6ppn39j3dzm19kvjfpj3p2mnj5o4b8r',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-06 10:07:53',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-06 12:42:17',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-06 12:06:42',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
