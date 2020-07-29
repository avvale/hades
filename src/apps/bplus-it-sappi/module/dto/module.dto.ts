import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9060068f-f191-43d7-a82f-9f4383d45192'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'h37duc8x3dpqq056kcpod868cm2n38k6iokxxct75s037dc5yu'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'j3ra1q5ra450tadkpwzq'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '2ebd8c85-6286-451d-9c45-cce811930df1'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '8plp018ye6hy38lmghz0ft9bn9acr0xh2zqb5qx28ggnmawhvkhmrjg6ufntrk32ouk9c8q9siljckmd5dca5nz2m9f57zgnuezy8nf5ecdcoogfv33vt0r27eeql2yku98is8fvf5y4v4yk4scad8wq3sk2pdau'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'dhy1exz7jbepn4bmdazy1uwdpem509m8se656s9suf955d9euelrl9ggl6baa43m4edmwwpbw2664smq30oo6c6mktmavuq6nojedp3qcp60ji2737y68gy1emf8129uqikpjsimsrkn0iagqifpnxntc1clkd6x'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '8nf7vdeutx5dom9ogdt3x2ji6hs4xmenfjai9nd6twurhi233qrkjz9yiztuao3wwfuzpzm8ol4qwa09ltoeahfgs6p2ye992my5rbgb3dbyj75co5n1virojr1h68a1kba3q2n10fi0frys0iy5773co8qf1ty6'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '75ed4c35-bd6b-4793-a9a2-8c77de318c6f'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '8px4m28t02u84626fari99mgc85jzssurcdoqtdf4ostyeyis7f7qufv9n0ue1tmh5k8hurruemxk69f50rycobga835lsq1tb6w7qwzha2qc6p5f82bw2543cay70tiqyorowo7j91ybvt2ztq75apwmspkfptf'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'n4qsps5ua4zhjyfk99wop0wvatmkpj7a20s9cdj65pfjfp1puaw76zb8ish8hpxzq58khjpearn4abd0bq86cgaf85rkmwhni7q1jk3gnkg8b3szs22pna5de2xiv3141y782fbq9fyc8k6o4hqev4qs2t2bee5g'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'gwndsa61exs2o0kvi10bo3fbj4w0hjk11b1n1nkorn312pf9cssp0jie1chi96j3u2clbkn206s0wh7nuh65wzc33jfak3jxfzbtz0a3er9i6v3u4kb4jqux9p1tcc5ewwwn5nqwx73n5ir332f97pkl91mqq7e1'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'h9uou5ajiyydqz90qqwbwj0l2vtc94nfwan01dqb4xevtr18rpro70g6jb9ptmwcc5z2zath1lakf3c4ocr5kqprdqnx400aqvr8rf0m4lggssozb91b98udlrf53wenkghbdazpjaceuz9jxhc07662gslz3kh1'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'jsbmay5acdb9avmechft'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'ffv2j2q8lp0736qj2to5n6ntv1qv5ydlpz7khxrr2j8cmllpi0dx2pkxfm09dpddjzgyep4ar0uy0eidhzjxsquh7fv6qh2r6h2nrey6pi953mvado2areft9julp0veu3tn2sgsrbsgo668kda7ie9ucrlunwojwd9hc5emdpejev5oz9hdxvrbgj0x9r8o59sfqyhl0zbd2amn0ikvkyr3i7ao9wg1zdi6r22qt2ogryyausahyhwydxvw6w4'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'kzatsieqf91rojvi4rjnvyl006qxgqvju0nv3uwdvqbidj38at6a9cl6cw3trzsn7v5mikfh6i4p0x0wv0sbhgw68pdhbihkjgnod05uk4kvqionfaxxdmzjkja4ucx9pvuiu9jut4096is6a0th98f9bv5yd55tkceew0ex8f30xz88x9huugcrwpzgg0u41unc2whgde2l8e5hu4q6ds61mtia3ukn4z73e3msywscqg4uid7o7iz2jb2bmqa2hzro92rd6kzr9hanyw99fbr2r5pmn2ktvwnznc1mxnj9lansxf29jlgrc5bc1dhs'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'taqmubnicpbvg1wj6fizztolwxcv003ax3alpdptcd8xkg7ywr3ub1euw0yfqc59cj4wk8kgru3tl42s5h1on8a57qxi8k4fe4o809kze0gew3c6gl5vaa2knmwxxg0wlbi9af9sp8ksvu254utenclwjst7cz1cz7uarzjpjfk6yxsmoywvoakjktps1f4pv6vp1yevc5da8786wtl7p367rzufcj6frzc6949mv4owosv0ayikdtqrcaj2ku9jgjhzif87xj0p1z45j1uk5mylkdk6ohvkvfakg7u8z7l5lednb0jvj0xpcom8y8bj'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'e2sr5v9ex58twcf95we5d266w0pvitkb1mdf01ul77p8pxdnj7toae79hzgf0jipbeytek9a04ow643a88zopxt8c5vxp9oy0hihpnpizkearc57e030c6bnu9kc8ksxp9s67sruog222an5sgwpbny672scaq1lyiab9w81cpot3q6yz3gx84w5zx2l9kmmitoc00p5h406km0705bqdtmaj9pgpykox0zhar3f9b66sbra3e5pemqedhzljkfcev3fylh6vd2k036apka2nknhlw098ekca87vm46tv3a2qp9zhcjg4l2za6uzec9p6yw2zggv0srqk0r9yetq7h5sm0547apkj9iiqssv616iyh2l6zqw45uw8jk7f3pqh12vtharig3u4tthmvfllikcoxileafth8hj2cbq55ezo175zaco2hb5luofcxw7hiw8pdmkwe0xlb685xe6dh5xhwbp1xkogp42j7cweaf8pucb6rrqscxl22dh3ufygbmpcvlabuhf9euzdrppf3n640zn15j4pcm420opppxjdry5qdpbyectoopw9u7s2ojqb3lo9s9khs6iolsu89h35khr24mh6ztf3nijj8ovodb9w90pfz5lt73ed75arrrj68fb3iw4rcaisasfh3xybk14tzdv5ozi0fjmm584mfpl7vhaig69crw4tjpnarbuu6qg3p86qr2k1gr1h1vg85em28umoed7pnwoekxibq4a5dhvffq3pyjbxi52p7k1une2albimdccvm14p2scvazsahdq0wn33ugdmx4tfn65z67hmp3ryuladgrj4l1o83saofgpzu0zmo0sdwdyr3h1m19giusztrou7dza6t4aef7s14oxkrstail5hsseez6btuxf1jbij7yt19u2n21kqb2d2c6h2dvzsxv8kg7n5ccyhvyklw7pcqlw5dmd9vlh0io5nuels5m9ohhe0lpgm7011d8vfdqx0y66l2fyr5y01n88q6kymynh'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 10:51:22'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 03:42:18'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 10:45:02'
    })
    deletedAt: string;
    
    
}
