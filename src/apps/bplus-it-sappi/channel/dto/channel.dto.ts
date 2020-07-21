import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2028247a-900e-49c3-a24e-9796ebc79504'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '0c46e65e-ca64-4dd3-8089-74d299456790'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'ozl48sr241u0p205ngw1127yah87rant5xpwn9zuadnhrwimfn6p0c0i7uudrni702fl0hy2bdcmopw1m8rafz9apzq6z8b4exneiiizb6gqhy5u2qfwt8wopktl6zq7661cu49k3j8t4e6a9cewbdwvv59jwtc0'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'bv0xkcq9klqwalilvhf1klmlf34drbbtcjtqfw96m5xx4uavk9lsqoe47ag8dyzt458ntivlh9yvng8pvdxmg0ni0wj7zj6kgaxi598cjt359btal6a6oeo3bo2dly4z895f0817xc8stb8krv2t7y94auql2932'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'z07l263jlhil1f7hpldb4zf8tn2x02g3or7mjhmdghnua95fitks1gmsmcy07fmdfil7kv449kwsr2qquosjatjj7z2aryjzz9altmqkgxpus8r5glvjs0b4y4w1e8rda9ace420mg6i1ayl58onaswzei3ap7k9'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'w8y2nvv55qv8qstmlbfb6nwi0vvkfkd86c44ixu395s6fiikad6vrb0emiz2veze0yt552gr3zdeavnrm6flr4hx4d6yg81wrke2fziwr310sem5fnkb1h77j2l8mqg7wuya8g0way1bmpx0b7bejmeqm2yxan2w'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '7h21b610aase4ars9m502ujnwhxnpaxcvo9zxgveywt5hwdbdbkdqxpvjcr2z1x07adoursuomy7f023bbyl6b4ljcroixmhuv36eag19lj8eyy65pq952hewlexbtkypfq77lpd1t9alyep5q87q9u08ya71br3'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'u9j3is4rpngedg8anpqu3tltrdripyzpin44otexrviuxg14h0p7l4ucbns4tufrr7yokb6i27m025awjmamr5yi3m34msf7isdpqhnqzidf70ci04vvt0w9drkn3skzhw9jvgsb1xwu3fy5qnbkdr9w0nii3v36'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '191ict9zacmueclkn018xwb8vjjibs1qtqznips2d0lio22vjuy5dz4wuyi1ckwxo4z5peuq4ls3at0a2b2anbxx1hhmdnon8jtd9dylsfmi51cvp38qo6bxrx5dcq7c3w7pewk8n0a0c7i52110a0aae1ye6yh9'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'p66f369a11ociwmnfw7o9noogppmhh79espztm5faldbi5bwwasgwabfbmpx'
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
        example     : 'k9wx53ezrtdiqttf03v9l7ec3nb117eup1fj4gp2oi3c3lvj19ttskikcepy'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'wi8pqsaubqx3mifuj2vinn085to2obfp3y3oklvrpe9fpdj2t8d8tp4wob30'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '5i1dr9gq0demzgj5tjkcb0wodcv0a9r9gctppy021dwwrrd7bfyhng913xize9nxhhq9woo09qfebxp7cs5wlmmwfeqnqat1a8p986vu9ko67khc4mz6d2jsy7pady2yp353nj0fdeyswzytn438hxutk8z2i3ya'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'd8o43lv78g4zfmjtg06prf5lxsqzuz3zl1nhnp7x7jeaqex57u9wjyud103vx5ogf2siy4iusw2rkzdgtrxjr8w1dpy3j3vzdra0rkxnjfoj1otnxyojtwmoemyfflmpaixbpu1zma4jziuwzpylj3oa30h5j54edlyfs1c8zo1dlq20x4ohn0yw94nprfkvni1mtgqtv3we74utkww7gkavljyuu0kw4v55eavjbgvonqphife4gm6fvu1hyiujpppnkzbo8u3zt22ijaek1ns504yajwxvfmhvrqpsqy2l6jor6um4q1pvvto78o7p'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'yt9624c8iotd4in0qvwztv5h5xrzfzup9jbuydoq1dc0vss3tbttflhcscai'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'dkx7hinkh5b6422o8844oxg2ezkhxmktmr8rufb2x6ic8nr1qrr1t8xfh5pui2jm6pfuxji3e2n18912fnx0h7dx3ux16s3dbbasdgb6uhxi1oi2fghsz8few5vbmvd5azo2cl55lntp65qi9d0bs8e431qej6oe'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 8829937934
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'rwotwg8s26tyh3rqd7lokb2k53qs8yryo58eq1g4rt0v8n0pkast9c635prq8f3y4z69cd6311ziz9pvmtuuzkbppru5iskav9s5jie9ontztdnmjlt13c1s2yy8xld8dfohrlyzipu1si78qlznrqi8uxrszut6jsv7y7sufq6ah2eat1l1puhoeoqnw0quzjo7vesnf5vjxsq19t37eh31levc050oftd981wjdxdu9egm2ozdt8v1lpb1kjrhf1lchlx7a69cfupn5pidti7qnm63sf61jg5bixle1etqcw6gw7f93wk6b7thtpuyv3c0cbc09tk1tabnkvmj6nyy3egp85uvkxl0ic0snfbjvw4l5ku352jvs5ju35b7pty9k1uousbqryy1doi5wetupnahyqgzfj0pxxcgyk1cv9vo3am0zdk3ab17va9h2q42h9fzn9vcp4xazsbbngs8ecqehllyybb72v563ylwsxisdp64i5rn7vffgkqe9kv7nhztmnybbn73c9p63ks2l0489my0jnijc6fyga510snhpg4ul6ckm9evxirs2duw9zlrtalnohak81vfn1fq64o0xnxf61gh407u7t26e66hhk7z21hhy0nn5peiflyyfy1gnlpyj9tv0aap7qlplyykpn5sz8xqf7cw2wowwu2wm6zckzm4a4ljjbu0miefel7rwrjtjjyfe8696cs8d1g4rpgemhu6nwaqn7kz0uyia7pilnzebotpubmtjz27qrhg8e7392n0wrkupwbbasdirjcvx4zbqklc2mhwfh1n7k80x37kthgnoxie3yvzj49rohe4crk47fbzz4j2zwtr7mf7pg642p6l6720yfcsebxsensjrznzjr5zq0kco2gd1buj5tcl6wac1y8ej0g3phl7ikwqmxz43uo5cj2646934rcq7m4oh25ylep4eodc5opuj45jyjntan645orwr026gg2rm6gi6rdszduae3oxeuwbak7zl0ce'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '3c0wl3ik65h28yfqgmmmvbdh0ivb2q3c9b0bqkjkcyz0vyclften5dznc5b9gh231j62qwast8zu9ti12lzaaewl67n8ataqxvqto4m6b3cjl7spc6f60vkkkspeezxkmbjlrs2nzfla4f0a46jqxo1a48ljc6gaqpx0quw3lkwfl09vk8i2zjycbz1kyzlunq3r549nsq8bfwjr6luaimejin9oyf019k4dj24hu58nv3huazgmx744s2w6mwwfu1b4hnsmzj0tdy4t5fsqogakahea3vr8ptud051jbyw8j09hy40idrryo50wbnz2q4uhip9d8e4p2eryaypti63hjh8bfu7qs61rlsekfocprd5bm4v4w5zvgx3b4fiqtf47nkl16kzsphe8ugprftc6fza6vrz81s3f1hunlw6o7327qq4qcxt70847uwjnpi504gyuwzx98mvvg2s5hqjneayj23030us7kvk9fc0y6wxm73pab6x1tx9sph4r9qk6pz8mndmm4vj3k7ag06gqucjj0h3onw0m0fixmf071gkg1bscri29ppn64a8h75hxr15jv5nb11oawdieg2csvsir7tmppb6hkl23e8ipm39caggg7a35x7gz9m31my78hi5a593kd5u9hlquf61viqut1f6c5pgyczwedj0b3yequwqfb6oweuuc549eerdcw8fsn0af278x0soqtuwiowpvvgnu97lkcckqns7tq0vzu6ghqup6bw4wrtryzsxaqy50k938n1g1xs8ksov1a46jzjimp41t6dr8pwnkspnhaskhaa0hkbystmq7l6nk6v80miofesq8enxvsv7cg8j3e3vnc1368qeggm5j3ov1r804csob23x6k4ua1de16m1sfepvew4016aa9e4cw1u0inocua9bqiexuodez1ne513hg6nz1u1ybjgd9h0f4okt2lmrlez0917rfy76ykgvorr9bllfgp7ag6yocx54jr2bdjsfvqshfcoa'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'nkpf4px3mjvjhwjy6xc69c4lykm77p0polw4icoaanw50671uhqdsairpxmk'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 3014463150
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'g9hmf56dg3b66q9yzox0a1olz8u6sp5hfgpyevxd47qz8nsd3yazy2x93xdio5ihyql5775io9jn2wwds0z3gl2izv273tqqgnwkraaqgz26e6jnknndxgaq86zmz5obwug3od286ub87zls599dgr7hfg8kzw9s'
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
        example     : 'fs9m9t5hnychxcmjh6e1mdh66mgloshafmo18hj02ghrb8pyu7ht9gsa2mqa4yl315uevoklba66v7xmpclgiwj95vxidblhwtvblh2d2ca910hxou0i3wkohtjojxcvgv61dsenqxp7d4m11z5njf87a35x8lfj'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '0z8yw6vc8dhm59ex310c'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'rlsdynu2317y1acmbdti'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-21 10:02:30'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 11:32:16'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 20:37:32'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 13:36:32'
    })
    deletedAt: string;
    
    
}
