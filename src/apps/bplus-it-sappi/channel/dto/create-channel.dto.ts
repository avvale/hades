import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd47bacb0-494b-4d76-b008-ce74da0a0ace'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '62d866f3-920d-4623-b3d2-6221c5e15c1c'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ramdm5wemqraxdnsm379oockb70d5g79rwyjapigadmwtpkoob'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ncv57vi34gkd7d3cqtby'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f321d9e3-df8e-4659-a1fc-a47234e36929'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '2a6t5jj3qpdipczw66lj1ximsi1l19vkmh5e5rztrpxkdscp7r91azl98e88wjai0tmcsbqvnq0c59u4z30jklva8uofpu6r3lldmvyjp5lr9tbbfwppr1kq8tdcwjnd0sjpksx8amulxicl7fm68o5djapl4470'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'u8dnqt4a2v6rbdmetithn9oldw5x1pm0nvkqlixyg6xqq1vckxs32cr9qrhaz4q2lva9606pa5f0aqlqw45wf3lewkjftnw3fov3p5t7ctkii6a04gucgrziijzwsz0fxf9zuo5l8ph4xgaq85d6gvcicx2qidfb'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'lzz7o1abk1wwq5ond8jhsca2dms6fw4mh2xhrrzcu8hr8vvwu6f0jiq24i6lwksbys8c6k23iuaai07y5mg7ow4so314sm7onrlim8cqjr5krvuk1gzt38o8j2ht7gllsz711ill2l2ha3fu4dcf2zkpx20ag5e9'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'c3e04e66-ab57-408d-a5a0-be80e24aba84'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'jwv6g2gj97muej65hqz14kgqareq029e9wenz68ew2i70y48l0mvgtu19tyf1y3m90w0ndazz2p71wjc4blib2l1p2mpwcz9kpm9z8z4717yfapmpa8jghpc5nx2i1fs4gzzka98c9echds4k940mq0wskmyubg6'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'gl0ck1zk24c5po74p2i5m0d9jawe7ar81tvl0zbqn0ogm3snateipif6ahc1wj3ysrpbbu7aw5ahlcgt313hvdnoigm6px4e76u7lo9s9ik1euegasjqgu7v3ny8f4qrumcm6i87qezgrujb65gxweltdif7oumn'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'fymiux0d8a5kb894aszcsay0z4nqbcyarzt2qzncj3yn36zqvy56bzcuj2ybss9moic4kx2ifbcy2hsfuhe1bjjr83rxnprujqvtwoqb6av9lpuvis5b6hdttv3lvrwvfmshdjrvasy3cnv6b7o01jvnwfp6a2gp'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'c2yd6kfebpj3pw7ejmy28ifsldod3oy74joz5wycszm1dqjbqgvbfym1jyrq888mtkzwp3q75mtboqegskxolukukmww2atndods68gb1quofqlsz03o1l3ag0bdz2qlqhzbpkcyu4vlhdsu8s1iep1o3hkhjxoj'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'mno8cbkx9wrtezygrxx3r2n5w65gsvqgz9ecbmu9b5kt6fofev24my688ht1'
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
        example     : 'ed8hgau298vas189vppv3eb3ans0dsjafo9ahdggcwq0pirtwuba588sznbk'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '90ferypwow8msevzd909m9s6mf1337py7ha0pq9osr24l6hr0zjzk5w2405j'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'sr0651ukb0vkxt1qd715deqg0wueaa4psbhkmv7uca87wugam3hjb8fe7yoi3elpzam1atea06xl6esxdnd37m47qyho5o3abkvqxxorebblo5hpbp17b0qzekzs9p1r48uiywyyw8zawo1kvqwxb96j70x1za3b'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'y56kzoz2zdbmz191pru4175zscrxabtr9f46gqme1b86uicd0ywgmopw2mgyuqimk7ey3j3e85nf5lmeyg5fjlhohwhl2gkfdmjadgvrb87osmkkf3pzsnf9zowk31c8gy32rko1jxxafl1afj7c7e5lyd6tzyyc0r8juhf1e6mj7foxm9rd6amsbjrqixqn6tanb2mi3b1quect5mxd4cdtlmq4src431jtav0l76cn700tom5v12u73dar9mnjq5xfd7ylxufane6bl6sv9k2df37adwkolq7zusv9rerq9oic2rfejdalrxn6dyvt'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '0ho9z92i1ccnmtwq01gm81ojct114kt6k2nd3ei4wd49ll8cf1yfa1qx516z'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'xcebhzswp87xyed4vsee2e28kbpnw6ue57k2hel4hlk8c81fwktwdb4vwp81kiip0196g2vqtq5j42cjteyxejx0ag7r6o1dhkkjfiial7e138fz5o801dp8vppj1o9z59fm91e07ieki3plqb50mjfic1zosrwa'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 1341148414
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '8thu92qodmqsgat11zwr8dknn6bx233v2ppgs2hh89opdx8hph62xv9o83a6gp675wt9kkgh8bxfmh7tefymhxxc9au5253sy62g65tvux9jzfpev3ia3p3z5o6haleahngdoa4jf1vmq9fwcqe5dgd500ymm6ci0h3vshqnm5af56dgs50szygowye98p18eha5skuinh01asc6whh3chd6ueez9hu7cyq0uxup80rd6bmq1slj6ad38cu9skk746lbm01fk18p211wujh95wnjqr4tpbp4r1fm1497tekf698hjxkfde0u5pvc1942ic4u03p6ot19t680x4eijn4kw890ebzgn1cdhw1urdqwt234fmjafb75rtpgip15g49jgb1ees6gj6tefpfxu18ar3wuw6xadljw7rduu7ztxt14haeqz3rqi7zppfpw3iy7yxhauplid5v2mchjfcbg09ovnkwjr4as0a4c7oursksgzvpww6e6nx2l1ei0ktaqzfhu7v6mibjxg9ekpf3exei4bunotm0h72t5c4t4hg7cej9t8pgge2ck5wq6vcfqz9j4n21mxvd30s0x7ubwhjujkj2wavtsgppnh0bvirr9uvbmqgh0vuwqqqtsiapn4x1ltz6xcj0fm1l08pn3jceyv3ye8t2ma0qz606bjn9qh17e1slq352r9hlsngmx0hwox6umqg5o734heiely5iwakbz0pnauvrfq7sy74b5kg4y6misjuw1vfp8it32kmw1f96bgq6ux4i0f86zfzrmjou8bt56vy32nczib19wc7u3l4qiiyzd4b4q2at2h7osac9qh4hjiulrqwcvhzpj4ww5gbwb9zni5lxk1ermadqfnjcwzgwgtesr642jnprjjl73ivugsi904k8n9okxmbadwq7xva59agzqasegb4tx6a7u0seoxxhe4s08ycrb18yj7s229g11om4hqji7lu3sfwze8qpldkomtcgie2tees0stsvu518v'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '7sntmkar9l51h1aokqu0ed6ho83qrit29wzfcktspc0dp7lzb35wyb64u45fqn4496n2itjfpctqv5fnk391okv63h88fsr96gbb78uki6p1j3rcjyfiwovwmdgdxkyd9nxlw4ya0ap90xo79cesllapnug85qs2eug8r17rlr749igsupe0ggzk46w1hfecz06wwy5sh3i64ntyszuydh6cmf8f3uenjihbq0edrzcbzy80pssp1il9wv0dss4q4g1a3s2xp4jgmhtyaxtdks46u5p8x9hmvgop03324qu9pa9m5b3oyzx80m6gy1fjwbc2saueg39ptrsz9ueh2lwjse8bb23srxd7wns935ml8456ftwz49qo77nqc656yyckt1pllb16gsdg3s4jvmmg7wfb1ely1nwhsswqkscc59w6soozjh21ybdeq6tnb4s49d58efuwx9yhsnggew715tkyh1ojc9dby3uvl1poz8xeiff65o9880epl2tuekb0c0nnpmicdzu3ybda2yi2trmrigh4d2dhx3w1eq7sch2mo2575fcggqsa00bhrnhjvs4dd5ewkcznx7tmrertx5lgpv88xznib4tar98924xcy465xjz7ax7z764qdfg6b4rc0edkvi7gq8tnrtomdp8okhrm5j1c7l8yshxf169ea4d1qbb4bmz9rrcl5gbkvkn9yjqu001mncdka85pumzhw8wg2qyagk9rns7fpk769k626wl194hw0aj36dqnkxcm81wpp8qeqjlxngnvqswxqf2ra3hatgww3vxhedr15mi9vpq65mm58g9qnlpd9ikf0un6rrsecq74vgbv78h4qh04ccf35c4gklq8a30r4zu9ey8x2sfhnvz1u5wjjdnx6zwiaepbtd9zauwqdgvvfjov4wyji16pj3kpq50xda8kfw1jcthv0a7ysgqqqtn6unzw5j7a05bnxwl57fh1r25egb7w3ryg8iy1s1zmqr9ddtelep49q924'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'qne605tip7fcssojj35v7cbkk44rg1d1qfx0huaa1eqqqvlhxukz23mw3eh0'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 6024364503
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '5efr44bftiqhqxgfexbv7t71stslnp40ogvdcys641gh6b5ndt5s7wq4q2kancspbpxr8lr9dw6n41fs2fnhvg5vcglguv543ew665av692d16vfcv0mu2ai66bg9vxc1qmba80itw7fp6dp35ozoa4pjw90sf4x'
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
        example     : 'qickwdjcgerg7tuwljillqpknomy9cy3vnhogkqzi3g68l4c62yh0rmrxtcf0r7bcwgraz4fhhfk9nf4gbtufvct7e9u4ae0tf03fxlp5muty0774mgix0uu2gfa1w29zlleud1jgj5g6dmf5pe9a7boykkl4rvs'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'vhhp3pl7gcmhcb19u1zj'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'flinxex6t95jgkd4t2qj'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 03:53:46'
    })
    lastChangedAt: string;
    
    
}
