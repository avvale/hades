import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2bd7a018-b574-4dad-839c-8d0f99fc40d8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'CLIENT_CREDENTIALS',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD_GRANT']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'xhmb2rueb5mgn2gn2p5mwrbsxuak6fblhj6fhli7hch2bof56yz8u5zmpasm3xoc6xnu0fyf607it2jnicczpw5j5r6ek7pe546e61xnavd00z8xog7w7fajci8o0wbqf563m4u8huuwlw5w2vam08bgo3f3zi3rvnyludr1blbj2ceufviwfuis5kjdomu4hxprpmf4uty2kskx44yv9tmbgw0frnru3s57y6dhbb2ggjq900efor9jjni9pnz'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'pqmfto6xhzjnn2cpdu78zoe6uaos8m7dazai11y43vse14xr10l70yrgq6rs3xq5r2g6v6a8pys3y8rbd2noy20tuo'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : '27uaqgg8j1aiieopd5cqitw6sx2f4t4bqkbwlr53hqqwsx0jf1jl9tcv3orjg9mck6knvq8iw92prb6b9fz3br0dxua3213ck3cpsrns9gv36ufla13w61vy4z37k8a19mcho68w7gr0t8ta0a9ko4iz602tf6u8bk0vr6qfvsadn6cz6r2g9ovcvmbhla0t9iufabdvnx13d00ami2xu1eg8lw56skp7w8sk4k9gj3jgufx185az7vv54o0082r6qi2l1t6y07jzhuiwafwnwprqrczqpc211tg7tledwthmy6dnzarh685uufziscfkc61tu1q9g3yvry0msgk4rpxsrjts0h2pxsnqskfufoiojkzzju1s9rwnhajzfzvfx2yaajbj6dqk81y1c69t2flx7cfcs1cnazc8xrero9djdd676wde2by1op2uul8dznk047vu1vj0avw3xy0vwuy6ddklsa7rdlwm4xu1q375pjubuismsz7quyctlfoza7qc6co14pxrsn52hdynrtljckirxiouosx913dsde543092nd88w8qiyj5qp3qh6n1ed144w1n5sn1ypbzpib4me2npqe25vcylm70ty0uqseebb8kwgf7tl7yk0x9er67ljdcnjzulpjg4q61vyvvsva6zahcyails0u7fcx5qv51pldjdzbf7up2ry1nxdqodturyo9grsaicjhyultzh562qjkn3za6dk8m0wp1su44y0gt3bg0uhg3a41ak1ska6tophsy456fu001wnyql6klof8r8hv1gc8ld2n12lyu78dg2j1lsllq6l2ravvhftrl0xy37j8zww8h6wi3198v8g6c0hwbqeyjdy1y22itnf5ar3d6swblw38m6g4iz685znkooy6x51twghlb9l4oeifqjjd7qxxkhryeyt91emg0vjj1pd87n0kezoc29fg0dbpuq3p0eovb1952ji5c078ebcaogdg4uxonyi8fq6j65z5utri9hal4t09nttcutxq3fq4g3bvjg5nw41ldkib7xn50aovknofs2ch5n5nosq6t70dlvqyzrvjtq2yrs8tilmgzl21vhjsfrrn6xyt2wd2xktbefxtspgh3kfrexmghc45um0s0qm1kdr51bwg4qcuqvou5lml82902f35dnxz8jezg7abj2ywcgkkt5n5btwqvjuzx54qg9h15kwvvbaz7z24rwkj2spugz3239y4m7cwvhb3nv1ifj5bsrn8it6hqy43meoexcmt9truwtconz86p8izahckncbviy3o4e8ocayxij8ihb1j7cwwh4gioncn0am8n5120yjv0qua6johgx1mjkdgrbigwia6ad9rs4ds1cvg7r84rxh8g16goqp46aco6gtw4f3sj1md440s770aho8e7l6ixps2apislgce8tlc5e4dh54blhdfhv0hkr1wi32fvue3s769z2orlppjejl5qhpnlx7cdxv550r45p96kgsrxblukhoiz6e0l0nhr953ly3vaprm3nd5cfksjzdkpo92eiigemz6bdd96yr5fr0aa60vcywaq45ida751339xppgyn85pqbna6y5ns1rppjjtgjw33xdbk9mu5n39ocfpm1gnjxe7zsvbd03eik1nw8xej8ijkz9maeqs3uu3b39a9xe1dqeke4vw57j6wxzo43qg93gsed8w5ioy9szqiwfyxddvi3vkt7o5qnq7y0r5emlc5zl14cxgrlr4loeya47b11imfyysrbp6lp14gxwwfw8ehm1lj3dyom2t2qnqaynrubr69qvbr6sk90no5fks1gkwb5sjj9vxoutb7yfu3u6ywkov5oquwjdqlasvjb67uwatgbloawrbd43estv519b1ysbvc6h1398uqplv369imdqao8udmzqobu1xkhymck2wbmzza4xq87waga1sm86gosok3qxf49iwli9kyjbb3587dm39aq7kuiackd5mi3pvltwhlq71q4083bdv5t7zyvev'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : '7h1rtwypkuxq6ogtv0bwuhdm9qjb6sxf8sldk45tjv70ns3i8t08xc45j41id7ohqe4erb48wnib2iocmhb8xhuzep9dmyi7budseaw44v3s6xjpzx2zghq5zykimqhbzly4gp21z8evpiq439b2bwr2mfpdavqx94myjve8z9qoqdfrmd33npdpldqph84s8ut9wgqja0nap7jidmu8o5msqqe2eq42vyego6vyjy4cuyud9k4j403ucp6qr457nv0hvwtl0rl30y4bakmw8a7rhzj7adqa3ej3t94a7rfq527zn3w8usrg487pa1sicaaomz13chak2j8e69jn4vd7i2xbyae9vqre6ibxpi4irs3qdmh9drsdrk056o0qw3q65mcj65c19kewjdl773x9djelk49jwq4iuii66j11n5grnffi7s8qyi2wghnjmcoha5cwanotdmydzx2ou7be5zdnrfrcpfxn76w07p27gf6n9dyquavcfs2d5ql3qogr0sgisk9xqb4u2dqyue4xw0tp8vr56frviywlqfnirsxzchaj5oo7ur4hdsgubrvbb4q1o381fb1j2ccnn6dxy387pjf8s9ftalmi7s1l3iqiwbldgtp07ojvtr7zuqhmdi1vsit5exon3f3z61yenuqpkh0z4i5swope7yn0e13s37jzszfe0tzh8el9xeuwvtmrzboejplslxujqfmp0r62jc7sbngauwe7dciu96c4f4bwhpqx0c1wk97wmqrv200nyyqe1yofyhrouwzxurlja0wqkfyme851y3wr6v6q8m1b0jf7e0qsxhf1zps2d7h8to3y7a5czhsvs62p56bnk3asqkql4ln2kfdk4ny8jadeow9kejrhkl2cdc5utb6fvda2k3wpov3evdykk0t889kfgqap39yyt0djlviec98m059pfsvr2491ygmqgroeu2hdwgnvwn69s9rpjctgkh8evjuxssbqtcwpek9pjsyhekwx3npsavjaxnbl4q413gg422wuxwj5q7813hboju622bwpt8akppm810oum7i32jbp70bzsey3cyo8md95qby1cxcf9y3ksbrq3932oacf046w0tveichgq9wu7jjt08oz1herhrh9xt056njn48nrhf89rtwkjiluzlpitmeqqvis3szu4pboftoj6c0ev8189ea3tzx3lqeofov1o4nxwgbkqa5gk0hva36a3rz4yeetfzshu4cmxn8qhoz28dm23e0acouq46rucxkjc7jdtxov7cfa8drakp9xez7rot4q4hqdfyojkldctwbs5nftozdfftmkw8qg6slky09qk2tw2gxgzccdmupvkuo7h2rb4hg883e3jbgnurrr5wex171gbtocwrnn3u1237d6cs09ai8x8zh81zmgpdedkczk95zxpg23s6347m378kftod126nyjgo0wbqpvgqnc2jrez6pno3t46yvl2t6tnhe3vq4qccicfxyxha9a49bpvfq8hmwz8xt6ptdu9cap7y5yqwf4rxv207kkichvc7e1llfq36sg2qs7cjjj3upwun3gd1by56zlf75npoim6ow45ldt7d9gzrn5h57kn1gtuoz5ij4k7ls49eherke0hno3frq0z5r7h0bpo890vpnan3if6dq7lzgpxzhjyjnfptuhr9smwz4e64pjmxxv3d2yk38s36zoqzarhyobave300telmemapo2q1wlk3m4k5f9mnsbod8br80oy16pj2diao2j07cwed249haykprl9mabecbw50m5jhvqlcvk54jno67g22s6x3pvemh2ea8171v9eo1w1rdhwgtgrg4c24xp0ggwtmcbdlpm92wocyshpxuuaxiwekb95eieonet6y5vjsi6bxpjidzzwmhvpbtybaiibmjmcr5454apoafojj4lhwi47iyzvth6hwt9a9e0gcx8skmqiy7ili7e9rfe7bgibpojovigmwjj0y9pftl4cicnbtne6f3lxgygmrec'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'resourceCodes [input here api field description]',
        example     : { "foo" : "bar" }
    })
    resourceCodes: any;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 4070544351
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 8050998019
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
    
    
}
