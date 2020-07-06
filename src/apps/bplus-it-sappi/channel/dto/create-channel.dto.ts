import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2f3308b9-8169-4361-a5b4-8d1a0d57e67c'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f25f22cd-3121-4c65-9930-f5dea13a6019'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'g5890ayu0mm2faj3ku96u5mb0lqzmmdked7d3b6io80pnyelt5kzzsp31aug90qnoy6t6e371szkf4efbn3bdlbpuajv5dnzwnkyt0tk7r55cpv75atcwtkvwnxdiqq7xuq2pr9s3ftwz1pph0pv257phl6bgl14'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'obxt1prcqjvrk3uvu06d61o0kiqpgh1efmatbk34ej4cdv9czp5a1glhe7l8nvx9h1fgib5cn6sm42691oywe8h7eyq1ts31nwsuvuz9utce1aza9k6x9v0tlbmg3wt79lq7bpvfn8ieemi9lbb0iuk4bko9y2pf'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'qk75r3cj8v3vyuu8ljo727el88a0vz13cwjqc3qg5r038h5hmbag28qdfljg6zyss3er2xju8n1abfolhvx69p41pfj8rhlmbrd5nhfc7t42k47bi9mzo94wmi6entusidfq2mipdw1hxt8y6yhzy9pyvbjm3j7i'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'vtlre4815i7g1qo7jv7sgkjvdsmr65tenjjrmzc5bjib57kbgwhotkgxlicaeatf9i0snifs4ofdh3xtt3rlkrwm15l3i2jfsys82dnydxthqlw1cxygqn8cgd81nqk61dn5zb7fqtu6ikddfoawoz4f6pgzp9u0'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'i2m9m08388ihnck7qqd08zrz0elp3qa8io697a4imlzk40g3bm93vc9384updh7tn24p1yxti3grjkyt9nbmuefqjpp13yde33ouby1vsl1l21sydlhtcw2a1ls9qqdkcigb2h9g1x22xchd2ph08gog5qier53b'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'alp6mvlin6t3remoa1f3lhlkxj3wyrytvywayoxugnbp2q7qsijwdicbt3zk94ne07f24pu3oekio99yx6ny528z6ebbc7usbxglxyuctouo4nmi0k7je1onjiv9hzmsn2i5omzyfvj22y5km1p1al6b6rbj5q65'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '4pm7vcouqku1lmpo63fkffgtwvto7r51snkqhzyrw1wcrx2e8yujwdsd4mdpurjycqyiscruysbbtiqc79zk2hue3wp8e72h16ddt013nhcclvdxts23pyjslyos8zvil14qzi09mw4vf5t5ve0ld0ljidvhc9tm'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'u649bxmjfocm1u2xcaohjqyqak9c9a1uiuzuxqesolp7kfjbwb4blsr3u87a'
    })
    adapterType: string;
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'luyyfr5awcifzlyc4r95l0qubc8emlet2lhg6tlmo5z9goorf3i0nzeryx52'
    })
    direction: string;
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'gzcb6cntwvnep1zo199t9skyr56uyk2vmzhmfqlrdhy2uzotqmozur7og6rz'
    })
    transportProtocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '0chv2q9m51zaqsq7hrq8lcuho8kfjyste1bljtunr66u4x7o6k11xdhg8d1z'
    })
    messageProtocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '1m3qmb5btzx2z16byq4w9ij64gwgp9xkx27c1y26m5wiil71sa72c1zfed3793zwtorco55n2gopr2700den78455mlsg9bd2evgy1gp7mbwnopivha7lv7dv3u4k5g35i53bpb9shp3h2dxjorwu4rsr3b7jp6z'
    })
    adapterEngineName: string;
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'miuosqyvsjzqdlw69jgxtroi9yfop6r8nodpso79342mu4q72lij6ktaygah7wvvqhchg5e8hur72gyceuawsyqxov5v1t1g1ovo3nf5ux84r7rbt7tsp03fkdfu6ii0chozg9lo624qi8ttwryafy5m1g8hwcr41d27k44cxngfzritx585w8d1ivd0fxyrc77vlm8z1jaey1cdsdepv97tkogse7pdmm6cqppqamlavdjrj2fs33780e4yxsoaiwbdvwdju7pfgtekz0yt4ood0l40ov49zo16k1uo4dk24lywgv3h1g8nywzqxh6h'
    })
    url: string;
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'oebmmkwsu08x3v9z2h6owlopo055z7sl2h4lp6os34g10ey3n7d0vxxvkchm'
    })
    username: string;
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '64kjtuiiucu1sey0gku1kuc70v0bdkihdhzd6tqi7uksdijyet7x3sd7jzkq1ky4mxupm2hpexnvszpq2866zxvvwueqz4hz7oey8fl7m8n8azwmd9kv1fzws4jp3yqox1tectdyg15ua4ke2htskcs7a1v6c7c6'
    })
    remoteHost: string;
    
    @ApiProperty({
        type        : String,
        description : 'remotePort [input here api field description]',
        example     : 'b9qpwz79vy8x42g85pcg'
    })
    remotePort: string;
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'xd9k1mpv653o6jbm92wlditodwzztwf96c4y0rwu7njp0901dm41pikuc0c2q0cwzwleyss2s1r4w931eghoh7lb3lmbm5e3waaiwzpj15etzicpe5g5ow3v5857abu2jdatyisdadqr0bfnn8429vgv2nmguoddm47g4wv3uysczqimwq3in18t3z46c1xv2bk20gyncw81hmc3cue39zhkwzk0as2e8hd7k9o4l7u7c6ict9vxosjq7oyppn9ebc8pe7z20vghx6971ea3j0ze7frzfzbod3i7tehi5pm0mxu8891ryivav9eow32p5g6rlxrpzs55cog7rd80ulfekbq6is3qq6h2bgludm39ripj7b9p5scf5ftdfd9nc6l9f6rewj9zczqz4rat0orlu91qi9vc2qlwlp04wjfp97pbkvnrfkgua4q2qmnsfqtoxlkox1kn3hnha5e5xm2vroo9en5rpvmu83abv2t1xmx686ng4qrnep5xyp4yar78hl1tjzrcy4zni9wk741dgdlj1nw95gncuwfawsrg53gt110lg4dt6wddmxp8mbiztvchumrcvulf6yy495xs6fpk6vqzdt69iis3qxweajbhoz2v5oyysohse68oegsqfmqo0f0ahjer3afm0ak1mail1gwu84btsdxtfc7i97i4c5yuglvcqg5cn3orjv586en84nmhegjpabs53to5iukxrvupdp2t9f99zlpk7z9yv4yfh3ro3avspwrjxujetyg3xs5okudp0t3uabcpljnbk6bk3660rk0dm8jd38k8z5mx6zssfxz01ygwxbxt0j3cr45e3u70lbye0jsk2r7ah46hl43kt3zhi7z9red761fefyqafpp4mxc6gmsw7m5ajr3iqxbowtr6x7k87tnr1gr564rxj1ndqp2jvs9auw6xwqlgfaq7hzqy8jlsvex52smnrbl79kwhbuoc3helyawrf2vqd1arl87dvhzysteqxi96vfxsr21'
    })
    directory: string;
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '9zww9kqpkuidzlbmldtkxv04y04p16r86ae274hc5ry4teiqz900e1fwlkxiol8zhm6xpnh5rsxscm6ijpkavf90ggkfknpvwatxt3jml7n4goqk2leid54op47jf8pdqa8ag8ms0jp0mane5v6jfj7j01a4odbdsnre80ld6vs30i61ezhbbq0cbb68mpe6dqb2i12dcdpt01bignsv77bnroumaunh1g5rf6ffx1288yyuxuyeoo4uogy29qm0lnwwwtlile6k3o2efk74w16yh8sec8jhni8f3ymkjtc7omcn1ari2cjip603m0q2iezhfq6qxc2g4gm2rv3tllrb35axn525uukvenxggrs5cxa6vldyg22ee96nor157faqs8hh5opxdwkvruamzfgt0qbgbpr2zpe33q6x58umkp9tmth7u4a71bchh283rekh7al8gap3n4qrzdidbk1boafpeyijbk76wtw53hxa64b9m21mg77fbf2edzl1mf44npjn822pw6bv8cedjap4dmyubmftqv8o44gd9dm3y31vircmw61wcyhb3sf5tfmap7bzintkqv0cx5flspdgegf7h6njf0foeiif58782fe63hmip4xxwp09uhv41ecnof32uzkxyb70nj98nal9a6jd1hvqxkonbh7muuvhiorcx7clho8r53j5v99jlcs3f0lce5r1c2krkn362r84ge16cpcdp6zvt53ekcqhc34f3hfngih54y59yxuv9c985i0dnkii0q297qki2hemvip5c956tcvtmggk1m9adntpa2oskge86yij2gj4z67hpyycw9p7oz8anz787spwpnivpzbkapu2jvsn3kalt4158e0at695w5shhvxn7zas8czzovt7as1ooj9xeq8sqpgsi6x787k4cw9wmithhfyyv8q0h60h9p7fbn3scsjeqbnqontmz8saigusavqik1lntnmjdg764ar04rx9tkm8ba0ocqrm68ycbv5'
    })
    fileSchema: string;
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'nusewuvo52oy2eso2lo6g0y4qtjxnim1l1534ns84xzmic600njgqzgkspoy'
    })
    proxyHost: string;
    
    @ApiProperty({
        type        : String,
        description : 'proxyPort [input here api field description]',
        example     : '69e39n4f11hufuz9br4t'
    })
    proxyPort: string;
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '6ut3kykneam77puwmz41pp79rh6yjlwigpchwb7buw6p6xm5zc44lm7yzl9piqs5wg46c2k48dwy4xfwjd5pc7cc8hjo50y7dx47twmbhy8dwtdwww5g89ixpcczyzxj8v6yr6uocwwwdky2b2dayo59q28yu84b'
    })
    destination: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'ddhtz0bngulun9tj69s3'
    })
    adapterStatus: string;
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : 'cgqomhm04m1m6u8gj9yruqs6lpsf9ooeeu3k0xjn6u9kaur9qr04m4pp45p3bztvu0voup98mthllw0r79h9ilcus3bpiu3ixlak7x7vcj5fszh6ray68npdeo2etlcs6y6yd9x499bn782w8ekjfj4bcodeg959'
    })
    softwareComponentName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '2k3zxm8ufx1cm75f1e35'
    })
    responsibleUserAccountName: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 's1yw0b1ubxan9h5y09hy'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-06 03:56:10'
    })
    lastChangedAt: string;
    
}
