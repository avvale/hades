import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '414f3627-b916-4f8f-8286-bdacb61e6d11'
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
        example     : 'h7e2vejg98pa4xeybxpz56dge3p7ssmfw7zfsqgnah94cf272r7931ywntp2r8e1jh2wsxjdoa82bnosdqr4nmp00f7m0qizn0mztuxp4o03rbmob035v9z06ilpsttug97ls22nr8snw6aj7lcbb0vh6dw516viqs98arcw6jnfnc5hxol7dla09ufi9vnwr2b26iisrpqiybbrc55tz97e2xk424jwwvr1h0zg8im4c0ysmk6ue6bv8mc9m7w'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'pjfh632hc351qetnkdd3n4dbp1kptcmsadcwg3h31s341hgbtrzcuw1b5b8dmqqxaqwiokeff0mcbeve46by93yspz'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : '3hh4vbz2oy3ikv4sq9ly19zaypfp9szg00j8a0j4tne36jr6nd5n6ur4vdo1z5zapckra3q7yd4ltlqnmv9zstciqfpyx0nu0p7fi48w1ebhcg23bbel02tc7scfuye1ojp9h3xgnqt41uqvqj43s1qm16vgjnn5pk4362uojixfpi1j5001umqmpcvnxsmdbpws9vnubgkou9pkuio5qnrys8ya5x268aa3dwtoozzx6r8prjrzz6x9xm9dnu1ckuexi7nyyhp70fod6jojw35bglb4pu3p84k7odbbu1ullb1l1zkivbg365xrv8dex0001gr5ourdgoh6bo2r8zg2l7mlx81y32z7b6v5kvxbhcqpbrlq6lae6834jv99d97jbyhnsnvbgsiilrpazsc0381rr10vqcmvemr92i27qc32kruy83jywmi6j9pnpb0yj7veojppuscbf6jnkymwkbau88gqp8jkoujwxl2n17ty5alzvnxutsc1oli18np70s2n9wple2vfk6f7q71lxsvadyud0up3wscah7gquz2v7ftfporl8i4ahxq6obot2wavx29kf4vqtgcu7iedatv8ue38xrqk16jhvijon8y5c538mgkvd567oq21h2kz1873rwvu06mrebcj8cl7qaqn00cwlauz38i1154fqyygdpc7danz5gk84m3zz29alybp6sq91g7qkvlgs7zbebm4x1mr3ic0hk0go6pm3jx7kfsy6po5io6lfmuog0qsba3rs7xwuwfshihwuo9a4k2ptc5co8o7a45011yzotvdrlu2ah0jm24povbx2mcnjul8536bvp7a871e9a5hmablgtfthp5dwbbdjw48sdsd3c6rty4irzyki6qr2ai91slw399k6uxldy7psxxg5r99e8ryb117hd8da2lywqhoop9m1w7ffs1iia7ej5s7dsbu9m5ig8phntg8gw3b2noxtqx4thmr3600yvpwu8tob04eymh8no320ojb02z5v9bdkkdz1v9gd765zddhtf1bumdwjmc4cf6jn64ldm974v3gsxzlt2o1irjy2nceujwvzov52ueno5rjitm8h06x3m1938yv3p8gxof7mnwquk7mgsk73fibny8t3fyj0qzq55j49afog6vug0owkckncdibhzxcohwiekge6l11bp3cxwijdx8rxyuc817u15y7qmgwvg2j33gil67ok9g8ifpyzd233o4myruj52lws29ttt9vzonpst1592p57iac76qlbmm9xdv012z70w1faj9bgliw00mzakhk4rw89su0orym2wcx3p6kpxe5lkxi7vuf5ntd90slc46fnq3ahq5me0xlp1kbcy9rblehrs4p8thme6aar9t5c13v5v6sjhdqkeo0fchwg7hh5hsvl1fsx71men9dr1wfgn0kto8e3z0vy0bny3vndwp96f97d2ytp7jl0mxalpkpvnmm5zcbyp4uu46547a8y02ctrwzilc6nxa2lgq40t5wocai8vdm0bu0upcfxqoh0kloqz6jc3m0nqu5jekejw603f1nsdapsdh4pksrib1vda8msvvktw5kuri53r85hrt9hfdy71sn44zk8zweuhtd7aw9ezaieuxkndsp87dih6uiqorku6z16bobfpqwvmoyw9eflyrqcgj4dcpekq1dy7evjz4p85k7dlcw8atw6bdypk38xqrexy21ep5tqojjdu6b4m4lgyw8mzzsvzjnklbll8ruifj3leoze21f1wjyo8j1ul6felh37nkvctlkj2r4xrv73drx579wup0qix67s8i42kl4wgg8jch3b822vrtxy7po2m913b7m5oftgpm8etj6j8jcsvwwrtsxbbxps1x13uhp5ntthqamnaz39n80tvz5k1fflfh61nkymd8b5x6dflyl2ivv699qw3w4iyumri25x7lxvz4pjzjczamc676mplrdrylmwhqln1d3ccud6761i92tq7mz49tonepgmphvlmqj'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'm0rgvvdmgobkpunv29kwxil65beflnjilcn0sbjbo0zgyn6469nkr2rhr4obdmfr334wyv372cjg468tj5nzt6rhbo97ao1a0aqtxr2n1awzb21st1cpjj6c38u4zjsmuhoc4xt0hiouo3d09yqtzg6qo8mke9fn4rqtrsy9swiu8s50p45z0xq1bk1szuertwt8vbs8zfdvzaqxg2dlt3h2lk3525tktwu8xfzevd3ybqs0z3x1t72w1mq27ih354woar4pn5qcv99wqoj3whfh2i30obw0kc3apajvsrhhxuzw624marfcpm9v7ns7emdnon0b85xynt91ixnf1nc0bccndvdjqagzb86hdavam3x3mlj73sm465w1d5n4z42ee0iwwkg30rnhsfy403f8fg89z83c39tfwg2y7q2is3co8mqg7o5l0rqkrqpwpimhq1yinpkotikcmjpniuyf15qtgbifb2ppuvxgyyrx1wz98hqjoe7xbrxabw3y608tdhxc6ahemztq6odr5kpk7aanxu3dscwu7wh01dsb2r9nke2pxs898cwyqseari0vur73l79i56polml6aglmnt88tkbuscp9exy866xojf684vtjre9ohvnjxokps2pok6e8ze7lplkyzywkg2szf01w3axbr3x04d4lt7lubiqmuqqku6noh2wmyjicfooy4sk4j8g3j35dlkj7i42utmlqwlqu567x6wgazl8g5uhha7rcrubqpvj3bakksjbkq923rgg48w95jei0aklid46pn3hnlsqjuoccg8eeqi397jt8axv3ik9wzsi3nk650rc1mdpffhjlmeg2312lzythmoe30sp8ssrpxymxupymbr8zg0rlc22e2ss0ee8p594tj118yf3rrhht9jp751ypey0c78kp13p2l24y5y9ci8xufh9m0uamfuauztqaajr03jlrcwgynatbof1l62oxjq3ly2z1xix7t9y25h4s08ozryid192hz16dg2e4ifntvy7uflrruxyby5gjzjunwlce8vlmb75zbr2h9etao8mmsko9k1lvdl9ym8pf61rcwvguoqtsbavm2vui1mjqr73d3mfd3q9b0iiyfdw8tnidbydk314b3eqbyzdir51yagfiqzvph7g2x2xh9006e8kelr1k9gndc7c1hnrcrn3lx34ptdv8nq01of3ptvl1y76mq81qa4bbx8v3sryyy79iau8mhgjyn09ufyfjbrr5otkcjj4x1t4zyrc9tjam47wejqo3msinrdar170py22evgfxvhvc17kk9s39gvnkhexdnhz20mxut9sd9yw0wsswu7y3tcjhv20ofp8hyjpi8lfoe9fhwsmsz0e51ftnhn9j1l23qyti83okf45ag5x2qpbr4arfuu9rrpn42i3klqo0jbf7dvulsdhusyuyp0m84l4clx3u91m3164rr0w19bonabo5ovkm681xu48n1zf39k2z0krnbooogggyc2zmloaq7vbzlcoypdwjl97tfbtfgjg4u5ci094p6ubr5ds1zbfqlbgq8yaqp151e9i32mhznpj1ispm8u35gja09x1h37ge4g114tj42yhjnz2lf4y6k9ch3l7soe97662dr5rb1ly4m5svh63lz3avosjgau1ddqp45o7gnf6w6dlp6uq1ln5bcps2quahsch1x4py25q4v3x1ugkn7webfodfo00sqv0z4t3hm24j417smo4plb2tuq8bntqwtq4p790ana2zgkvhnfh1ryhe5n6xa2yg5868dvoukf2zers6ago8rt9o25zm2x68lyigsawvdui09nwn9mxbpyorlvml6xxza3wctj80rybllbxh8zg8wdia7809jk424o2b56h6u0epftse4xtvglhknf4pji48x5n9u16zdwjh6d7hmo8cs4mekhp5ub8oak6ajk22f61gcz9zxe3l34we5te0bxybohygqore8irmltkcukfuq2biokw6s3z384b2covxyac8'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 7348226882
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 5791738219
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
        type        : [String],
        description : 'applicationIds [input here api field description]',
        example     : '',
    })
    applicationIds: string[];
    
    
}
