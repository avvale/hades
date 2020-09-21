import { ApiProperty } from '@nestjs/swagger';

export class ClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '0176a877-aaae-4d56-81c9-6ce61f569e60'
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
        example     : 'pmmkvn1r4wxmr52vebmpf3zrlaubjm6w1hqo2pqf79cjd5c1nk50w76jemnm3sha03uq7vbfjp9mycrzmbsgbts42ds237l398fknazzdg6k5ldcnk9lxfvmq5sz586fzw9t1zeek23yqpamo8k1xt6opshq76tza8vdjw5n2pry8n54az4ra23vmr3n3tg0s4xv5qtouaw5v2owmahrbxi800ll7l0t6e10z76w9smf0qeo1slefrfx61qet69'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : '47ffp8aduyy6epsxrqj8g6hq9rvxmjwwlylbkunqcentkc326bh5u9nf00w72exjvzqme43p1s1ut3j4urc3bmwimk'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'byj5o784zu91p67sb1xi92opaqoq6b5yivoi0vwxpro6s4twogscar9uvuf254b29s2owm433utjwpg9k3ccrxbg6qjenmf3mhbm6t9l6wqnpx6i119yg8itnzbl6h1bo5bao2o85sbvlpfhjhsegwtedhadkz4wuvy23xj137xp1lj4rqv63mheulg9f59erye0btltwatn8alc422a70gys31ns0fv435dipcw00bwx6on9i8ynq3pj72xs4cbfc15jsfsenuod4cjalup0kwa3oena97bto3o7uqrs96obrye2f1v80osujhslqzq97n1iyqiop36ipflom6gbvw1e2hifw4hubz5vuo5801dllx5bszy4fp3j5nhfjv25bqyio5oe4phw2fwz0x2cqp6vxyk3ogzp0bea9pw5lehx6uq2pgpsudbh1jamafk7n1lokl9bhivi376dqyxvjlznypd35ygt64rfvui4eb36j9skgpf2uam2do2dpx0escciy7jheqceygsi45orubg0jbng1nvgrfvrcl9toobuds3ffdhzucd9qvjnv4o8tu8u1nwz0i0mrwih69mlpxmxljcw3gsqthta3japrlvkiln9842xkydkhtr1d46096m7nwqfel1lic17yccppnhdja4fvsz4gw19bt3g3fffrz4z6vvebz91elm6gglcqe4fztwyd3u8vv71rd36km1vu2m9puv21eln10botg57ji8bayfheavx5y2rce8v6uugqkohpap70pfu43b7ajx1ra40hq10kslxwh781j4mfrdj0563xoynagj0wbddxzd85an18giuz2n8xlvffzq207bthk7c4347wdp0lcy6a8pdakhrpamdmditvlb6tgz4ygz16eyi92oll90wime1h5aa66p84c5iuz0de2s3wpjrh3gihhcynkjawtx4t6q25cd2chnraomhczyedn7zk97ssx01404xenpogs7w3jgt9mn04x2t958fgakbvx9rfnsyg74zqgkhhumt7o2ta8xvoq4xpm7j2zk1c4792se4mn92glcrj09w34uq3to9yrjc1vfyidgedckd1zwuylk4m3jjvj3mlevmile17h29tcg0tj4mbu0ok7nuq6s5deviq2scy7i4n7vnylb060bdb6hzusi6mt2di4nvwxvqunecmoqzsy2mzy7h4zs8dvl7alongcntmyez9vsi3b9n2i54ilu5zifsx72vxcsrmladb5rwov1j88s7pfe8mokor8yor8u0su71gqevwh8lcxytxd4nwd8tlesj68vgru871js9ug5l4ofy0mdffvhm08xsp6bcs0u2rvt08m5wcu5plmvh76caumt7rvh1a1os03z2e7qroamvxv9wubixaglw7h7jpziea0rt7a3xuvuzom161b1vh1te23ufioefowvjtc16p9agkyh7eeuqpglnag8x62v67wcw6p03mqu4kb8u3qskiahaz2j25uviw7tqnrlkrnlguk9wlnhe26kobyjaechvzdkprny2puaa2vqjy7qmm878m2wm8r66rqcx5ajn6ob1z34jvcro3e2k24bbcjpd4y11w7ggu8ql9qrk4u5dgbp6xn68229c6ytqzgv1hoxiy9lq5nvvlgqjarmytdmwobl6eyt2qyjo3jmkdes6d8f1ble1a29stmcybgtovpng9wvoquoc6teg2zotzmol701vkx3yva3asm46gnd7muosybxd4smrlna8ywommcbjvgoujccsohi5ndd951l1a69l3g39sbj8x0vprlvp1wjjlxcveesoompzenya2ehfx4rsqch9kn91rvvcbrpboaixdk640r67bqx5eq0kav312bsdb43o4n1h806ws7l74o1ywijqrobus11esoc5haqqxaoqj5gpxktihkqyo3mns05gyvma4vawe27nv4ywdoqx2ee0saahpspi9s3wgs54l4hzfpm7ayuanyb21v7ejen7sp0frjrzkmsej5q'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'h8sdbxnbzt8k1d4opir9z3zizpi2ioxs3e3hziytytq41xlobkk1a4bzdw8c1u9257evv0l9chps10eg77r94l4kozjj0odfhcfc1vj7h0ymbd38vd4vrlqdda0pofrr1lzohhj3vo9xa4v7860f8mgah2efr3z1d0i8wxvorha7qe747b7rj4mnhu066vxmxa4e27459kb8fldjd9ow1z25feqielh13cn734t1yssha6x4sr6qbsamb1aggc76pzamta2do30pd4jbtnzscyyqp5fy87jqngs93nnp8pyv9139yoexkdzwcx3ixbx07batv6s0mbpkmdscfxx3rk74nibjqhdqbimkz2lh0dqknk3zybethdh0xw28b5th2djoaifh1h0ogsy7bpflle50snlxiidd75ny8ljs7b8zeke0lamufjo76s4341165hk9oyd51qrdg78u8fam1feeg6vsjtojjl43x8exz9fglavneh1b5i7f83y65t7xfxvmhgvbrw5t8zlt4znqmot3wbj5ok3qj3n6zvd1tnp61u3u2okmk0udr5ctly7c3kfxcefbagnrej09zb9fqamzq4qz2tq17c1hop2ckcilcmmsohj6i1ynid9o6kuxan870zscmttl2buhp96fpgywvw5dk95h3eet8mu3rmzs7vkt8eoh7ymqcwtvo8bjefhldu7xrrwg8x1av29if415he7h5ygs90snsv665iif9ytkmob5a6brabo1pjxjfn41y2fvfqgdt61w062pfvvof7v3nd4tdg4hjzohdzvsvv5hcsyyp88tnoc7vxqtlsffpnspinz91dtkajri2oupgoz5kzxx9znxfz7nmuh8eq9bn3gl65cduskcgy3oaurg2z6hz035dtm9y22xpe80jabxlw7fti54ff1wkw0r7mhtikfrdcgnvw7vemzft8o1so21oe4wcps1xeegrllah7mgx0z3blu2vr2lsoccfv0z0ykwi7zq8hqtfi64sie78f8udt6ki9ii3jambxmjwm79wd7s5ugzxiqpbb62oczhfizbcya0dmflw16jx7s9bfad8382neqg2c4y8n2dqn0e314nxqvfg6doh6dfhszu8lxjdaf66u78mgdx5u06ywbaal42zwsn5ia1raz6wncytz5hggcic1sdy58t1rairhjw089mmicshkd7f22tbg0rznr7zfm7gctkjzkbo52ltnur12jsdwf7aajgdz606mtzqjpa644sn6x1gkohma99cwv49yf3cj1f64u0u69zwmxkhpsmf40g3l5k4lddutv4lovgoss2ef4zcppaiw73djjppao3e4i6sc3s0pn94e97yp5mvoksfr2xy0k7jkli0a0mfk719mb013g1pypq71lh54qd8o2byno40w4n41w6n65ke7suqm6u48szbh4yp9mlvmg6mzyjtgtl9gtm3gas7f2rmq8az452q7xf7quqbqxh5uoaakmq46ijhgl57l763ticnpf4p4lvmus62kydjart6wlzxlgcjfyrv7jnp78dutui5wycyhfdc08c530i1b9ulkld0yms4u3e1zuqiw5j81o7522tro5pqrwuerp1yoxf8q8y7yskkhkfhrswzsn1pk4xdww5ha09qz32gd6ntgfq5u4wvsbqpxdbuf0300ndcs6ombp133vydgzwysjamaikjp03is8bbkcnamg6uc115p3sglb16donf2hpyl6q0djfref6pgvs9rzs78bxt7h59o6d09qajcxs3bmwsklbrglr4pqjhtf607jru2stp0f9r1osultjfju1zt3o1x30tlc1tnds7yuqnugo42rqdnl5vb5rfi47a5sfztnsnh283djc6obgcz4xhqe313oyqujjo1uz3lcf7lfu3xrhd8cc2e9shzukwj8ir3fsrku2by7sfl7if2msyes9svojsxmfebybxjq7ukt7rl9xhg4glm3of6bv4c7cck6c6oqvy3wbmg2pupfmejlhgdvl'
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
        example     : 6135994265
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 6895663743
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
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-21 09:29:42'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-20 14:52:39'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-20 17:26:28'
    })
    deletedAt: string;
    
    
}
