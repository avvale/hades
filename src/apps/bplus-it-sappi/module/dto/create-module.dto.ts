import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '64300cea-782f-453b-a5c7-256772586f85'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '797027ff-6f70-46aa-bdea-41ed9d6b3696'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '491mzjleld95d058nk4chp1bvfqgw17r60ktjg3oa5wlr5x03t'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3321c9dc-3c88-448a-b48e-887da60ba47c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'l7gyi8ty5heuk3gopctl'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '6bfae48e-37b6-4b4d-9f12-3fa7349e7a05'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'x04qag997q8r76q1hf8dy3nozasu0rvo8ezkgf4osz085px9bdgoud0357ak9cce7d48on0f5sg4ojnncl58buxjdphiz39o6qwx5kfdmppx63w3j0pu5k4dfp4hdcx2fw9422apwl6lg1106le88c6hpqm6shly'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '5vjxyf4coid7kruf64j567o18q5nec4uib6skoc4bdrgbyi6r723y6ypdq0xpxd47ydca7xrlg9tu06ys4lyzpw7zxe1wtisgyr6lk26tjg05bbe6rv3qh2vuholsqu0gcitdtpzj47huviyxtkgnq1972yx64yo'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'bxzy6loiemo7obzx1homfffmlbus4is00dlchxx8z27u39vj6ojbp7w2cp2ycyf14guqy8xnr0vjrxm6pgb8q9t4hl7qvey8myd104as0fdd4sl0o0k34c21mvmz1isiove0tgu4cg3zi0t79wohn7badmg6j83u'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '5qtuszr508pxy5fck1410x87ur52ef2i4ni41p0r'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'c2gca34tflhivcrq9ghx04br55gggybn394lhxe9uk26j0srwi01qm78ni6gnv7bq783wasa5akzwy9d72yl6efatlr3vsnzp76f5n8f9t33hlgb0i9kqj0uajvg4apus1bhhonnzzjvco60utkyei1yy0c0ynyn'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'tahzbzj1h1tx2fy4lgw3ag2lircmtmaxde857v3kn81hcltr52rgje5hnj6yvtyb3t3ozw6of2zjycb07fo6z6mqxkfnfxykra8wzxe3rurer1a6fe4h2npo5r8feu3aag9vndil0emacnjlek10sqrnhv7dadbo'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '3ht38vws7jcn8afyfwp09vagbt9zjtud8ii2svhwgltatkx1rbi3zsinnfxt3ezzcoeuu5vhu0iuhbawt1nf14jebygqsl51mj1whzheuf1xt22ji67e7dcbhx6zadu0gemtb2ijme6m0pr5dczfel6v1yesfk9u'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ut8abzipa6zf3uk36i95i57sokpr7d20bb13bjr2xwfu7ku3hxjcw8z9d4wnkeo8xwftetmb1ll2uhiqfayv5n1sy7k5yo0xq6iwu0qfnhj2eksqgeaunluzt13t7prd87z47a51chouc4nmprpxzayjx10zlxwo'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'f411h2uvokzq3zw24puq'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'es8tjwcmw6f4h2s1mc1hzjqsyf2sde3i5bom176r0mqdzasgend0z9cqilrt3ln2p10qiujpbe6ibpbl1lngk4jc0sgg4vt4jt55v6v5ngw6diwlcfdw4a7knkjp1593w3v2hthl89f30dikipassmrz6gd5o2wsi2ym159rxxirdqd1ou0wb3mh4khfh36xj6i7o37lpaocdtrheuaal7100de2p1xo7mphhfoa965lu3feisa39aamph0vfut'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'jlxavy086vbvqbyrh1m8elbzdoqc8dv8tn7ukoexpw0k5dyn42ass4lfakoetwka0pw0wr8w3r0g7z5o1ybd4qbi6fy1jsubeblpzl4war1heedtl7oz5nbctcja1nh19kptwy19rbl8svsd43792267ivrf7nhy1ne9wj2t0jrlw1dxr8p82zi3izu6c69j68aa5i0xxqwh86cuta798gs71b16wirl9a5490mvnrgb0htdl43cl3lyncsk61q1627jjohpte8c43mgadwmd4mxfbf7rb30llklwfj8qhcv00h8camnzf01mt728xk0'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'f2qs9ud6kisiis01kiyf9kilm23fsc8634h79hvvnza4b3glwumouluup69is80oyuupva6nvoq1g1o98oqi6i6knp9vj0z10gyotoxnsgbjoslnvisdq6jxsdmptdelr7via9bxes2rorw6zi6t8a6f8oc96q8ow0hacocp0zbggeerq9kr6fg59qi3gkvgbiq6294r742bsywxxg8so4irbgkl55x5iwgc0eyaviv0naej28xtgeacr054r15dnr1qyphljadzpfm7shezwze494subyr7bkue4yy8p1wlxyr14ji33m899dlh12rr'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'pb6tft5bp8n5tvrdr905ls1am12eohnaii74hoyhkpror2d9zyi8dhtafvwaawyz2z23drgh51nns8ukh0jo7lulenb33am2hud6q8uv887aluk8ouew19543vnx2j84qld3nig1uf869sactdmc5i15ic7d13waswoa6n67h5fhfbtvd4pp5hzgavmlraftovarabmkcifqkgv7vb98rx9sno5li9tk2kbwmzv4e9ueqh4r9g4ucp6mbx84sk5w9de0jxstjmx8dw4e7rnzrsx0j4cxuo4ldwxspqy0r7kmrma8caojff0unymcxvgcp67g176c1d1p2ezeqoagvsyhxjxgjulkafvi8cgtdmbxx6q6vby31r3y49jio5w4jmyv8bas219cjn26kfi3ltv071ky79qc2z4m3c83wesn39r3buh44zo2hx9cww59bls78i6hd0dgm15l2b3mvkqf0e82qhwfm81cbnxij3o7hvomuavme9kuunhqb5n1vcpb9dslov7dsy99adupdhzt9fop5ube2wd5uv82wqnla0jldsf00lpufdeglwo48l2n76lx31npa0irw4ryxutcrwi7aefattm7r7885baixw6ss0qgumepgpvkeomfhf9yloe3s2twsorxzhw8e7ei1y8qs14wdtlwfxlxsc6urkmyvb48y0ta1n3fck7lzxxfwxqhftgxse2tqn7880odpofkabn48vpypojd2hpcdng2mh1y81m8b931k5190k64fh38ptq8qoxw2e7wq8yrwjksmtixqj6n604le2nlw48bklug9x2agsw3c1q9xn79luczahwr9fwii9xe6rkf9m216d0rxz3lu244xr4d1pkk2yd39zscg3jfyyp0yhs5mna4vzhjlvierfyl4354u2voooza3thc0n2iob47zhmdeq31apggrexr047fbnfy5l9micm3hmaitx6a2c20ziyth4mzz5ddjp6tm9kwju47fvldjo72uhsnkgle'
    })
    parameterValue: string;
    
    
}
