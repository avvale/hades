import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto 
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
        example     : 'PASSWORD_GRANT',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD_GRANT']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '54mvuy0wbm0vm5ad8r82cg2p0ta1rycekbfqgiurcb0nl06uvuakczmeacl62viptwdncy2bv79yd561hp4u4j6lh83bnq1v8q7xfqe6rsstesvafnaaso9pv2ig96zvtnwbpiudsd2g7px8xmzqew078syo3w1ww1lf58djumtkyiwzkzmbpqnjyn73tqimupe3d0rgruenrhjdlyulp15mpjbwfsmqy41euaukk3utzzxvhnqwld0mbm4ebep'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : '8bhxfrkyvs9pgbmjq0e7kpl0uqqprvbrvdsl2r4pcjvo69f3mauee5d1glkhhta3a4371xibsfiituz9aftna3opgn'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'bgnfditb9ac0uh2q1jxr5ma8t5qwqqgs86wa5hu0rnowz2h0tf4prw0l5mwea6qpsxn07jurbzykxgyz0zhlk3ghvnkc5wvror5sdvtgrwk2d1w53ouf52xswrtdc4imt1fqv5zv3ohei14y6oae9tgt7g45gqd2ph6i9k34jvjxx32zmd684ykiiezw7660dix4kklvcmjcg143bkfsdiw819n3mwvl3qrnyrjnhhgwlaahmcxavkmk3bg61e3ot2gigsq4qpos07gmjsk8fdc9dd1hpsk0r7a80ynhhb0ad3vggztsvih6yxvnggn2wgd4uuvo11v1kln71mwazbblhao5d1oc1as64rjios0ergknxxiv45yeo8mh39ebars9176f7o52xs82y4dflxinzvos3ipsvtzdzwyfczlelrfletui7trdyksinscbx5pvwgc2qarst5c7vkv7gy6ps3z1504hr3x1yf29eb0llla8rmk9iy2dw4p5v1xf4uv90um6vl9zr09lhzfo3aqm9v6bk7yrf4egkybgsbjg770b6cwjhyef3vxjqteemla2mil71nka1rjcf7tkq1ozhr3rvihhbwlais6nh57q3zp6pgineeadmdud88pf9jicxbzwz4mmn8f33b5aq12fesqpx55epm8kl8q1f5hx1h99qfbvbzxdup3vsrg83rpudxqzaolll0rn65ysc2c9a7sug1195wnxukoes78eqb9xcv3s8p2cs77k0gngvwxchp7zcqmq2aito62fpmzcbd10tf6e4wropcok2z0n23itsoqg5qh5i7z3skyc1cqwb22y4m8ov9b7ysr5zwt64ujtke72u6ilfvf7lux48zkxnlfah99sl0e7vz0tygyyblynbl8g8creuyr3cztp4acoxyrpxm6hikktd0xsesak8cjen53dlwogmfqu5bjxxxipgr9vywjphoc5ny75vpp5r3kxt5d100a3q0yen20hyyos9c71gzrzyoupxd9hogmbq0g6wcjxtnk49rrdpten6mdihxldz1ijc93bf26memt55x4pvs55fxp6zwkvvpbw93kh5tx7c5pqdhaz0x6g7ualh3hpvf09u69z6tf4mfglll97sii8auav4szo5t9dj7pzm4kwzumlmht91v8m2kes79qeei2tyyt8hbs5y7r6yluxt61qayfx3944n9ofifvr0c5u3reeddjbmvqsdng1ba99s4sskpzr4xbwmk9f53232lu493ii2019fm8e1nq6qdr2dfvr3r3ynurkhgsssw542gtz4c6e0gogypgsfm1qa7mj7gzj4ujpntqt0mrepbt72xfq66hb0ygva4pbl74ix8jyl4cy41dmji7szqsdv0ao8abh2mxfs2ffnc31ze8lbg1k7wdn76f0zrtdv83xec0bn47igggp2gp2rx5bn84l3703ou7h3l0irvomvelu7ggc76n5rt2xi8xm8bh5xgu4jifbvvz1dlu0ikjadjod5kzu3x79hsynrsppfb7rfofiflsb611xp1o4gn7v8jfvdb9u0tuwzemmakdsgngr4tgoy3l6macx4t7vs7l25aa1hq9dlaqe56nc6rtm0hb0bzu5k21vn6hehq96xqg3hwdwphk7y701bylx0fdxuf27jcfe4v27a2lpp7bx378wknns1yzhv959jfs7oqjk8lb3riq2d7vgp418lqecz84sx2l6d19e1m8shvxq19j509jixp913xbe1b6kr9siy7imc6grjmg0ihlm4pbunka9z6o38jqb3lh2fbeew9ek52pwauc4042u06t40ts4dgttuivt5dv79v4ziyrbevto3i9c4orw6uppaeomu667qi39hognh3klpghxds5ce0enpofxc8nzmlupppfv3sklrixllxspq8xqopomx0bqnrr8c7oigry7ovnt35e2r4xwu4zpr7xgu74vgocfm0ittgclp1ef6bei9sncdubc8lsludjx5o09gu46bvmey398'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'anslia4hri563wcu2qmzbxoec4dnnwnnsylao2hsw55nzybh5bketx0rggwd4yv46i5bypo1yyv54u4e3n1fwq1q7hfsyrpl0kalg6qu05owactqxy5j21qblr2vewj40vvduwolvk5n9e8xxfxi90pw0fkdjkx2awsfk9woy5kh7gv41uhzv8igiqyb4clsh2ytnjnw8rp01fe49qkg0v9wz2cngt91x86jcj7cern6e5m3uknh14leqsg51day1794qiyj1xa6k71o1ps2cmflo5oasnzklxm0qhnvricsmx592mv15qzi3z4mq73tsl56n9evuo3z0stfgi3a181cmfjh2uamvsdszypd0w6a0fsrb255eqkg7hnkl1lxc6tgx941n97mhmjy5sujvu90xup492krqs698g290uf4o57oktnn34wjxf5uj97kto3amymurlsfemyhnalii8z5ocfsko9nlvxnua4mrxfd3epl6nxjkxjywismquktxlz3tmcco5b87u2j7mqh6vof0a7385cazpdumbys4wrmndv5jdgetrt4cwwxhfhp2kpn6cr8bq8nl44n477kn5qtsvkw7vdgtzzu6canm35k1sckgyjvva14kl0zid1n8eq528z8k571p7kfo8mox7rxzlzdzoa13i3t8mv3frrkifd4sbomffwm4mbxljepva4013g1cdelakuuvdp5qyoqix4ci0sdkike9c6hmpijc6vox9ffrlombd5wqqm6lq6maab8qso3s0npyf60nvx4zvvxxg81fggtp1k0sxbrlo72j05z1wdqyhv8zxxujzyr6dicarjc760nb1dxc8ggsodcd5pon51bzp5q5387hb8odlu95nanp2elpbnribvcqejfwbop301iniwsgcp0otqs97upn8izgs9sazx7c418x0drqbvyng4dyfxjn7zlsfdrn4q4wxyqgbwtwf9ov0u7e594kzupmj656xkohgsa7d2sma0e2b3hy91ht24254o5vobwgisw13xm0sz20c1gz5bo5nn2wcf1nqh5qa6ghgrs63egtop3tcqfmw0x3xj6542wf0fkvfqila8z8j179mc3qdhqc3i9uuchqv0y8xsb8tnahq9rpom5ykz3fgf35snaqy6541gu1shb4b7ejkauf6t6elpux9div0b2bk9g6zabz0nm1m0e5z35ifao83fd4lzq6vj48d6135gz5l2if7xwaoes9nwqoxwza9cph54l6tej4e5nmdak4wk1nll5kkp823gw69aexs4e2tqojdjz482zn7gxw08ytkrnac7muxccvaogva1cedzrklna25adhwdclezhggllj3pqlx1tomtvs0eivfelm2o1optihetz8vs5birqhjllg6kh5cay8ifhi70v9fepcyruld26agzdcikak6f75kloexb7mzmpkpv8qtwdgptk0rbtm72xhig448fm71ax9kfljv761yugbfxawb6eubbnlya50s8xntl7v74wqgbqbw842kc5v1qkibdh40h127shgsjobgv5dcgady2ahthoo17rg2gnsiyertyk93csyom3z3jh7p2u52mvr8jjel1z3bsmdv5omlynw5txn24332ar6ivudjd62xq381e1lop2165bwch1ed3eb68x6hpvg279qu1vsq3egc5zms26wzek5rdp0j23751kcn8moi5q1bmrliy3e8r8bt43je1amko4v0tobgp4o995jny7ka5b1sz7lcaxtucv3lyhbz3m6yubdajrke2nl9luksabpeog1dn098giynigwvsabym0cmgfbq72de56xfjqv8i0x3q2slqumpd9bqprlnxnryp78hyy1fuzjfmea26stdev1lomptpc28yj4k4xmdvy9kmkrk4n3bd863vy24l6dpm6hcxebf5c95vsiduo2m1m5prwwf4nxpnu7tdc7h8c6ttl8gq7wxxe6dnhumgvw65ezrjrnc5he0o52lr9e1jdlco7m6si'
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
        example     : 1658561865
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 3555994654
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
