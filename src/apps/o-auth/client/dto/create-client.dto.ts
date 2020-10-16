import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3539c36f-9b8b-4570-ab78-fa96ac8f5192'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'CLIENT_CREDENTIALS',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'cuynkvludjvicn0a3w9qvcvyadzsbxt04lj7u6jvraj1fssn9av3jluzpip51v7x59nhfjnavjbov9wtq7otjx9x80z6q6vh0q1fm4tqytz4hle8pzglots99b5rumhf69gnk7a2b2gkoskpydyrzasv76wd0wu2365dlxs6xtx1ajd6s2hx4b6ortc7z5nvkrrns7yfaie0fgcxz4ri2ag7g3jl1yinq403rtydaq4fouupmbunfoms41326sy'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'h73puqy3244y9vdg0q93ty72ewnf4zgsbt96or5wjsyakk063thssu60uv5zxi32amadcimrzll5nbqk8glgy6meh5'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'j41a648tw52yfvbof2g40qkt5vrw4pn5dtn3fzwmy63q7dts1ygvukub7h5ncrxpcstmzlue0inlkt1svw6hdi9ljjodm817y5ml4cnyayfmdykiz6i2lcohsquygi20ctrm1bfelkskq76xs0q686c6grzwwaz9d0aw3txjv0ip7jp4e0h6w6zoe7xxggean9dxy9juobldqm51suaet91elhabvni4nf8skopm4wqk656fo6mylkd3cac3yk4465ffc0kif9j3qvpvcoxqqnamrtz6crbs0q8ztaq7jmn2k0iyuyxc248se5z1pvupqahl6krfqtlnc80bs9zw6aazqecjjosps1bg36cxbbulmcc52h1xp3rles2k7a3b5uk9lgig2zdi9xt5h6950h92qvnmoycgzrz0y98i4rfl530ao8tjoaczft3vec421k35fc51zl2vrgtqp4oh0k4uwu0xxz6k9zu4feu2muchr2w0dpqgwdlz0okt563gyv451ig0t3ouri7w5suzrlx2qfkr4f9g0afeo6xsom1kupdd620yu01qdd03uf4jjhivpbri8280fn2szgt3gzyc5f4q5czum33xortsrhn8kchrmapl10b4f43orxxo73fn7zpy88w6y2mpxez3d1c13qaq3psvvxzdejzlrv2l222iy54w6yj3pu4etw3vqopoxnw9pw25ml7wqejgiddphc72evf1w9dl5sou5je29y7f39kocu3vw8sdrlb3bc5f86o1yyb1c7iwvyj83gdop03gjxr55nz6rkyjtk4wmeuoh1n869qi0pa70dbpm78p8h9b7e8zebfuz26uh37ukswur5qrh29icyz706vdnegrjoh2ykxuhxmnocm3ngu17r0ag3ybyly597b9kf4opueucbv0c6mjgyjg5bkvbmvbqfdg880lk2jzz0a71uzrnrp53sl4yy1nzwlsgi6c3ce9ef335gkrswegd7mm4xjspvbh7wd6yh7custm73yaa614smgp7wxpjf11aae2b4fnhntq3tx94ufcf9gndqqsmv9yd1kksm5fnl3ae4uu23sbm1ylee0fkrdc2d4jlnpbl98wk05mpe7tyhvl3mu9s1a99yz81lkszoa6ek65mvhyc2yand7idmseuj1d73z0q7y2tx4zwmjvf6kwyaaasebfewsobnjdp1pw54ak36d5xv1arqrh4souo9zqdvsvft2s5d9o99fogac3stgdpda9ihn5yiq3m6ronk2mkniszul2axw3xulcr510swscjyy6ovedubrbeigsl78h2gpc721ve59ehyjblu9ei9bi3u14nk95e8llc4pt6vf42kd6bhhyzbsgh1cgcgrj1zx8pzotpc89yzckhh3qv7mu1mj14zqupy6ndhyvie7wry3qqqniidjwyetav2d9rz32qaddtqn47iuzzi7ihdyyrk9s3or07k1fsnmqc4flic6kwrbxo1ysfrqarshdaiqcsqlyp65yhu4d8w17148vqu9fs7mxu7w5yujrc93x5hfozaasied4r6fl1swfe0pwtiibsx1zmbx8fpv35l0j0981sy5e1w0oueyyzmn7n6bv26krb4le6ep7uz9r57dmxwwku7pote67blzhaio6uil5kclv04gaq8dvyx7f57lktvpy0r2tzyaz1b6fnk8bqz3ktvipks0ghw4u3vdzslim3gu8hjmu8qssvypcdhbw83m2eraayknlfhrvvo05f1lslust3iruwrk9qiuxeiktafduf8i3jztgl2uib5u8hdpzjzfk4m5me3th4yq3bsdeaj32mtj49ot801ghaj82lvq9ohn7dqzob3cy0n2g1605smhtov1sm8ufhd7dcbhwuj59e1irpmuhm0tfbeju7vom7jo0dvj7lv7cdilar2hp04oww0505d6u3l6w0r32k7nfri0m5214uqvv7j6y6tvs9f4e39cfvq26g1arinyntayor5fosv2t8yylb2q9tz5hsk7y'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'uomquin3nqru99636ydrdm0pai9ktj3nyye51kmfdh2bzcej1450o56xbe8630ayysp1ypg3uqpfbacawt79z1y2dahvh14knbob2teb88kb7hxzkzn1hhino8u5v1l9e9qrmxwqhpxm5h3bazfcipbs88e9vfpti1iitf9lvtep2hleaor99ggavhotgzunbnm7u859vq2fg5bg8xqkpiawlvdomn2b4ybm0f0mhi49hr8axrhmghggh2dzjzgstpbm3q1jcsxbhjsfdqhr23oj2z1fu12h9y5gbbvroyve4n57wpv3qyirauobgxzuoeb8x4g7fk51piqfbzi68rxk7b9l9m4x75dpux7f8vju6spbwvla33grkifvk4qlij3owro6r0pfba76lpg2nz3txehpkjuktust4ft1g76f0q30lsuub2c6nz5un8uagm4bc85s35wpb21nrkitgl24ls3k697n1kzbxangdnp2brc7njm9iurnetyv5mk4t6atzrouerjiw8bucoq9agf2pr9o0tbh4n5cbkplmjlfi95lhgekl9q418ke3f2ydoees224ro7egsnzqw70dfuecjnwhiai1cdveni9dwzmjc30admw851uqlqw68olg0mtjj8sg7glme1egizrz0yexb4uiwk2j8n3ngv0j8fx7yllzblgv311d1az5hutwzg38d8x1bd96h4it7cinv06iqnj66vq30zjwzxjimtp37o4fvseyn85p923g764g6hh8uflo0db2zo55x9hw5eo3zz6tce6b5xa3pmmn8jipxijkng4o64r5d08yjxvqa4ro24xvtnu6z3oebqbrsv580ozbtmtl7kp567hfh71wqoreb1uk36fmtxf1fx82f5k6wx2lbdkk5fc1wbstxianp4gdrkh95fpzidioefruuqdf5wuc3adcr6bamvaqcrjp3w9ieuh0qlkkrvo03n3qlindvu5am6fwq4xtzlrkenqpwlv2qxio4fzfm79h9f262p0pdephll66vjj7wsek9x71edkwplgc29fkmqt5xdeuivxf2sbtgeweh22auu3wq0fg2f37qzkz6eegs0cx7g4oj4ejns2e5kim1enlvp4xqbaw2mavq1vbvmyg7dj1vtbzle6iwnhdabsdtxwx3zu9yy9mcjg26h9r7goxqwrns80arrniprbjx93fi1i7fouytd82bzivc9ejjai5uqvi64o6f07lb1r37b7y9mjetu8gk27to5u0li4wkxehokf5uwrlc870tjwdyoeybep2ns7alhmtcgo6dyr5jzt3o40jzl5p454n35wkevruertmc0s23dprbzfhsg0rum3i6d4ico0hzhmgu8y642utdxedczoq1x4yf6bp0h574pekkuct0xy2j2rm3nzvsx0bmb4y9mjym2nuyteg3b52iau6d1iak0o9qgkluim65a86vt4fhx5et207f6i9g2m3ym453907vcyvbkqb1316ytromjfmaj27h3qywz7ddq31bdryo31kohp0mmqfdfsvz2f3rhmrig3n83k2zpz61c6wyg84mtmpiz7fol8cuz6472h6pjd6rdvvy3bgngfcxe3gl64ui9qdg6b2hctvmo323o8ngz7lsocyxb25imwry3qv11thg91t9pbrpbbtpaod6d1b5uw9zxz26gdc6k6gaejacgk7p39f512lydqofqpun29d62orpt3s51soorrm742gtcdv9za4krzvm38wrvbgwcatzui0b6lkob88oizguz4vy2hup4uvvhzkp04knrcfr2eb8e10yiippimk6afiq2z4461rkblco8izjcnvo1dnwp0nie2036rml9fzrhnuc52ryjv4uphoy7dqg14vuex9yfjwgdn8q86khu5qiltgvwn7042gty6tovn3mb5hwf80p6yw9g0adqkbw5ny7re84kninu2cm22vc4j7utkrvc0mdg062kd802m66sl214ktcwul8vvn0buwcpecas3718c'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 3606056294
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 3686820233
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'applicationIds [input here api field description]',
        example     : '',
    })
    applicationIds: string[];
    
    
}
