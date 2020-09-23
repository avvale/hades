import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '393943d2-20fe-48ea-a94d-4b942e14b2c0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'AUTHORIZATION_CODE',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'mnrpr0kkhpkpfehgnze9r4ts3kh9jbpdn24y4tb4f174pquuhfbfszzxyxaclffua7pp9zk7g4u04jal8hy0fwic5n2mkhwce8y8cxvmmu6d4xnfjts4jweoi1mkl0dzuvm7m6g7b94lpennt39dergnpu3tziop1y56c9p8hqzvll4xklziyu78vuuqm687nj7cb205synoyn25kwshxmekm5o27ils538e0vhru1j91xvaji9y2j685etil5u'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'uzuqf43v06atwjb1fwd8ewnmb8q9xcxwf1o0gbb8sjsm67juysmvmck6fp56xuz0bzzle959x1taw7o3je1nlkaw2j'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'ooisbxptpt3ssvl22ls2y3km2c6q4e7sel5eusb2jy901jkhshwinqm06lwuekis3og4jl0cqbzkan5ro0f1w7p7z655fc2lgogprtdryk7vmzbp28hchdjsv5kqykhn8kgsamjhphmhxyhi5seg249ydfmu7lvkg61l0y0cwfyffyszrqggy34sfh89pmh88hg4skt61xx55iiv2vqi5ken06rvrun151dl1ufptdazsa2jwvz3c1ahldpc34qk3jwa5eh18boj9na4cuw6z1lne6u33bq3740xb66uvq3px6xg5047xyq2z4jgywnihwcryjbniopvspybwji4ea4ckvpnvndpuf1npzdsq9x42bxq65okxvv54uxc2xgp97hgtna0e6imtj7whjq56p8jt6p23266zpn402ykbosvvfr89kj9ag2fqx5xanl89pjo4f2sbg0qyhqvt5vftaqy25h1qx4lja3pjzdi4011syay7qch3p8kpzunh79n9ihrdx7ugmao60n709unvei66od0e2fa8jwvlg87kroin6sxoaxmhc3pa975ik6jktult8nmfnbce21ua5g9ztccyo4u3dsg56z26kcjz2w6qfc5dwolo9pzwty2x4d8pdpg35c8cr5zv6g0g5rvvxl74gx1z76tsg7xa1gdt29ru2p0rtj9gjqyozj69m2ehx2s3gs1ml11asam6sej67220hd1eeks0w5f1mykt5vysk3g3om2f9jclsdf92wkelgon9gkwbt00vxhaq2gui9zoy26accn77cc3u1llunplioax0s96ykuwi5sizx75tgs0isqyzp22mpv21dbppc55yjjz8clbldbhm31xmgogrh54jhz7sjh026d27ev7k8bes0ecvayiecbszjk98xfotihkynyvlxdf7fyptbgsiu7evsp6fq0trp5nr65msxkuev0z2obbexaizpg36cp5kmn0k44o6zh87fustjzk0df1m4v92yh3hj62ofv48miry5dsf8sp1kzl7nl47amluyk9klx04akghl8jvopb18gooq0gdm77fpnevk91s86l7rml73thyv5xj0nl62u1f24uqxukvhqc8nqzkda4sgcj7sp6k5eietu9ap74bdmf7gwccmfu2t5y423t5qngput8q2n9z1rbq1dzrj1snilv67wcfc9p8vlmnigypxytkfozh3fnqhz668netzx9k9qy5197t5z2bsnr3xgzoelpd9zlzea92lg3yrv5s7t7jyyfcxp77ipf0m2dos6jjhqv4p6ktsxlx6lb6p5lkjf6qw4da4s9bk5y4wuu47l4uwntfim3jhstj7ssu92z4t05liiq65rjns9y2rb6ghz30m0ja09j0exfasqv5b56e7m5owlwxsespojntl7s1ddahj91ergob528ldfr9naafj7100caqg593bruu434cmgb5zkr2mbbroggymascbwdvf646jh6rh7vpx3lqvi08nc0xhi4ekkip54qtb0kjd1rk270v9gfqbaipsxj0e66xd6dv8kt7sz5j988f7i3zvjqfs6c1fhl5gjqk93t3ywaf602tu7ukzaijm11pkm6ej36lifr60rlaifswa7elcfb86qgjc3977logddv042ekgnfww4620kxle8p0p1jj7y2jqp89eb72q50xoz5mqqmiidpwgql561acfpoj4gfhp93lu12seg8fpyprhg481kopu5trty56g4sq9uy6b04o8qtw1m5ree70nx8ss20olvsepg093wcihrfajdwx6nnes93u39f3sa41ic5ks3waff1fmnkjcqzrrncky80r5snv5ad87u0vmqe8ae5nhrg8i4fx6mh4swp0ib4vrdri57sqy24ozuhkwepwnnrvazqvwilafbnyxc7bmd7ufyfrrwmjydemojgvipii5lvfwdo660tgtfavggpbof76b431kmnvfksff9wyl45uyhsgfa100n6a5xbdpcgxqnm4ve2qlbrjto'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : '478i1zr7ngvmkglqakeimccg66xp0hetzo94x5fkxkskz1ss4g8osvbep2it51jjr43vc6nt2l7962jweuuf1sxrynjzs975in1bfnbqrigj9sfw8rotw9s3h4te7933i3ssfw7gxaqfgkcev6fm5blwp368tcp1qkmmuo8qophso6w5ye8hduch1pb59wceuao10tudy9c8gt5uo89k7bks9kd24rklgmf36q7vraf0mpxlitexb040hj7qhxmwdo4k77q8243p19qdo2729c531vbdrcz6xyhr2iu3bajjijqep8bvzibwtcer1adtxsqudiaixctyzqvre7x5hsr0tuyc4tbp4ag7aughjga5oy4g0b8epqu4d55z0zttxlqa681urc0ivmmiwkpsjdx8su9p3k0jgfpv9tiuz383xqgzjwe0w63zjplqjegctcvznk0ycyi3k4bid9oof1f7s7ljjhvh2lfh0f2gzitl666aq6cp9yxjj6fq7n29dlpoxkzy4k7vhwa5vk4zfisuhn0oswuiw0tp3v23vzaqh5f4j7bl56p7045ppy1rxysnbsj56zr63taizsqehltcppcup5d56jyor0jjp42kuu0hof49sex9ykof7xc70h2e0m7g5yktc62rm0yiw8mdsalj5pro8kjtkctf3let46jl7dtvr8p3tr3fksabrobd3m8cqmudksckkn2v8v1abwp0mkjj0mf8x3ezz6hk42bu3fm3x3gk88odoaxak3vlbprer9o2a5lcw6nvttzbigdocseaw52ivr8s7rx56s40g4neizntu0hyue7wgo5e2ckltv73zgpytawl4sl7udewrh56qeyulyz8mw7ebqjxc4c2fmx5cm9i6ji6w4tr3nwj01no5owaks1p4qvxgqxe9b21ztyiqn9sxpjikiw8uiwothmvghmi54aakr3c1t6ciejzvf66vipp7qlnecvhyc1gkktjso7uq5tpn7f27yaxryjj9o1244ml9b45pwz6w1gy7c832tu72j7mizx3pgu81zqgiwmbsjbaoeo31kkecx6p8c8ff3exw429w0u5oqxqsoxwm27439jvh64s6zclmekminr1b1m74ru1eh1tq9c2wv2smrqwp4axqjcmy4fhua1w243w5e6vj3sm301k8f0tq5y0zj50nz6w9qxcd9s99qof4zpnd9znm3ngzs1he0k4iiksx19agzgc4za62pcaob2e1ftxzbomu6v291oqa6ngcucpoudypvykiv7y3w0gzs12lihpzwwsvrv101edf3q8grvva7k6wqytm39ew0wdops0if81wkarpp0g7q76i90ojt5lz2f8nwa5w6t7jgl9m272j690d3d6iaey0zboz9y2aeo8ik7up23atbc8t8mvwpcj03lz8t6ztkoypfw6vmot3w3h3g8kj5nhcpviatqsv9rq6cmym4fi8gtfbhc9n5u4swo38l8ifsvwyku5a1go6550qjno8yw79pv5rr0r6z2owv8n82xuqj46g85ie5m989ibz89dx286f6f59q4kzv0za40pnv3o8xlm6d0zu4nxntm8kgmubrt2qulkr4ublm14inywqzgbdy92bp5jfyx3i37xru4s8odafhnyltpnyrj86kdyt6ulahno6scbpccif26dxnizfijf65n27139lhzs2855d0e1ongz965ixivxzzi9tog5ywtd0n6ve6ixt0q8t8luwwusbfrrc57zh152z3grwg22n27fvfpjbt7ov0022g492dk84ub1trctv6nxbtg4mdakdri0fb94x72e0x7fh01z8ay3u03s6jes0yt9b6e3cjpi8ao1zw9rjg20mo75v5a3uefu1d3qevpwf0f15bvzi44slasdkf5mu2xe2tjmnfkanbhovv36f1fv1hrtwskzzoxwuye118crjns9hyrqh2pau01caxcpvvczwo5ml621dz4y525xjv7ci86ffd7llp5q60ee07hpftyjbdkitwee'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 3347264411
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 4955903952
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : true
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
