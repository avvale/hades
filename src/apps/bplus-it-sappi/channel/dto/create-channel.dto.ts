import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9f5e68fb-933a-4154-9173-ab92121320df'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '608p130uqqj8std26moxfkpp92sxzqqnk7ehnnsc'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f15f1df0-54d9-4b60-b607-eca015049cd6'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'tcht3t9tajhcngzcdygcgt1qwzcaewzju1c7lkbjszoq0dsgqf'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '2fab7672-6276-4b3f-ad9e-15af490846e8'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'aws7hp3pwsydejf023p9'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'cxt4qyqyqoj102piynqi6v058h3up3wt6g6c8ehnucu46s0fa7uvsxro22bmbz4fr89uvhzfe19y9yb4m0c9klu5l3rdqgciftz9ydlgk0ewv2wtncccq42s70w3n7l715injt7bzr9zuod5ents8seenq93wlxx'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'mpdvmjremgmp7llfwro2w7lqs0xp5yfq0ivymphth1dlmhsiiqctlathk6g332fl5kdkbk9szso6syyi0fk145uhzvfg8x4vzmn90v4rjgkyeoqbab63m13x743qct5wlk5slb478ze601gtd0fowkzjhyekilvw'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'cvccsmdelf6qdmaj5ttk2rdi7wdst68uaoot2a1fcijty9qjtasgskwe7il7aumlbpe5fp1xv37spsjfa6u8yotyy6r7f1068kngiyitgpxui17aamt7ay1m8epj92aahidezkphl2k4x16xqp4an8ezgbe8gzvz'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '1fe511c1-b25c-4937-97fe-e56d441688de'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '07knde2o6sl5tyk68rgsxmype88ofu044zdf14z3towv54mksffd9hsdws7ia2o21nevuw67r1xuc28wwpxz5k3f0zj9chtlrlwhfo6520tibi4v1g4gk81p652dn280vkfuh2m2s8ppgw2dk95vn0ntku4mprz4'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'r8uoyp0i2gxyi6tqlqtzdsw1zjtkoc9wgf5hzkxj647e0ayec36v4o2w1lqm4simxmql3a4y5bttoy3z0qtbq4e8ixxkmcaj1liedaicgoeolypehr4dgl06yexquec47mvjlv2vv4kbdhc2bjpz4g2mqwfu8kdl'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'pn8hwg99pvxblrbkr13o85rhtul47uhxz0dotupznlr6jgh8ptwqfld1vyvj5citd0zt7ego5m7b6r72vt56czs4w29jmmi1bi180ceek6ab82jloypj86e1pdqcnabixv05093l8qc9m8cy6ztbuggjlsjn9kge'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'pnax54kfb4irwfuuucodd97fh8y173swhogxki9n84cqj6l579cby6agw1bxxepfgsxyx81zjnx2vjk8wq5bmgtwa5ttezzwmwyxvlgsz42ygvfsacgsqvpz92kbdmyxmi3lehsssxlubcb1ew3b9jx4w9q9zoei'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '76qy721nsdwtsj6we2ns'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'pnbs8ybpeccy9lcc0uhcsou2sadogy97i39i26odj29rgdlwb5ql8ne5ttx4'
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'SENDER',
        enum        : ['SENDER','RECEIVER']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'k3tr56pox0e4yh9x9qx56drifueu31473l9hrnpe47ciamijgild7lobp3xe'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '41vipiioqupaypxiiuko3ua70wuleevy5m7bve8zkur8b1xwckghblnkboyz'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '5v0rpdbieusq0jnlgd41par233o0tc8ay0keo6c2u2yi6s5r6qjrp444c4nn7ewlkcvwb39z45g8mpn9lwom3ixigpj461oznw359eu2sr8e8xvxt5hvj525afnfodn3rqrjgsthfqaunsniw76lwuwe4qap1kys'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'j0xexwm8toizj6ukxc7w202u3ngkyhp7cj4kqplqv6ve1v3u3lay4j65b8xchnaz3n9h515kfrwdb8kdlrqevuonn7oor674qkqn5etbg5iuvnftbj746vhjg8dz4ccn654g2u6uhovi9f3tmx2nwiv306wdq7o66xfw1479x4c5ooyowdntyh7tue0xjsqumfxxzxtoc82u8un78nb6lt50nanyriphpejo7jmq2j30313t6cy31jshnx3sa8tepms8krcijks8xaeh2yk2ogmltwarh06u05rfjt3azwyjvh7xiqevtggrz61kx4wz'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '1zffjqabvt5i4ok1rx8nu111rl0uqs125amav0yyd1y08b4bc97o99sbkagt'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'li3tz5nidno095xiit7173fg4zs4t9sa9nad2bjyzxqevbagsiwy0wfl3hnxue0zk1dutnmm6sgaiqjc00u7s0e89u7ltt9vd8y5clhx9u1kv01bblpbgp564dyc4mg84dhuaflsg0l2eh37yhb9962tzlw0u6kw'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 1519508705
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '0n695w6jnlxjvt70de0xe4mk568bmx6weajxm4me42e6ykt30dfuq16hre6l9a6godgy89kq25hb6cwdns9nftc05uauatpwxmi4052hj5orftzh79zhrwyw0ip9zunyxvh0gm9a8zebnus2fguhpmcel7desa3m690bzfj6eqtzr4solikvi963tuaw8yk6ma370v0uyua3th2ikus956gkrf31vgvr9rxgs1e546cpak4oqe01xcodf96zec7rler5e7t4lvwoktmzr3pq87bqpdiejndb1eccljn4pf5g61av6qwmly415u4qydmqt1femn7530gfmh6jl8vltj9hqyrmme580chi4tn23ldv8oj0cvashtfy3e9a4qnsl9ry2ycr3l9ejonyj5110fgc9srb2b2hyl7rpypz0669um069qstxzdmtwfcbefenwi19cgyl38ooiy6880w2b84xgpsvt9y2gkdjdu7f5c62b2t74l2tnj47uf4aohptcty88uz7gxy6f00v7i1977w8qgpzfelo0ymgfh0955hn1aydonom7xuvytujrqrjl5jxjv6un99qzktnnob7m9wypdxgoskaor9vtc8qks0hts9oh1xsgz1r1m5lyw0rasd3q0d7vwsh6c75eqt1doypgexj7vpxal9r51nk0nh9w79a4d9albtmj40ke9uljq9equn5dh4o3y3ipg0mn44sy8utsina7p1nn02a6xhnj893rl1vt2l4et2ndqd40wbnh23271iu8yq6x72h81efvawsdlb42kxwiwlzhydqxm4rnnx38747zc5fsl16uvp6dh0i3mg6u8d56k6qravtvyfk8pgyt41akpzszpzg9crw7kgleo4q45rs908kxxfo8fvzhqvso1ggdey4kmkh91j4lfnamt6mzn1yoj9djcwko9hwrtu0g4x8wz3kdpy45u5r7t4gv5ukloojgcvjmaudda9bx86dhb3epmuhut7c9teo75ewshemxko'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'jbvdhshxg3j941ty8huyf8a95q4weuqte0ob8o78qcvgv28o2mvr4s2000ubaacqh0j9h1tpg0hdsapyd5z21uk5h758hanwrzc43ug77m12vr41ztwcpzbdhkpy1y7308ijz7s7cqgjnecpbk0mp9u2t9llcwt5z7fhzn9b56zdf8rzq793v39rdj8flor1t2w4o0bp20eeb5c1i5icxbuqz7w39ajiezz0t8do9o3wgs52wvtpsr3ug6s4u5yxv2dp004g25ggary55scdexsc4ix71qlscrereownybsat6tqwt6g1s45xersj50rixhwbpwzf83x8rwj5ycyfvwhf9ym5wllcpgk9dndxs150425kcj2ifb66pua01qmx3kcoi4v40dn66suhmzm77fh2z5et94z0srwoumvg80ft7ardfpnwpu9ish5tyv0nkbyx585lphhpkdvdipc8j972pufrobam4idnbughbffou7d5fff1f4n2l72qvfe2aknowdqgmvbed9yel13n6db600xo6hhi84rejdhblbqjrte65xlaeuxmp8jleo1dqjg2lk7y9gifmhozbi50l40f3kd2t3x71j6a520kypg1zjtmyypwj2ctdnahfu05h0y99mwqk5be75ubml4n83fg7xqkxbjgfwmndqsrx746jfri79j35zazw6bk0dme812tbsjt97winl81l7e5lx3h3s839m10iyroxlpmmrqnvwwmkmfl2wl5nk1chlposzed4q3s5ftm34dyhnrru8q039mdl2lw8sppsmzf6wamg7uazmnqxn48c50or9yku5c1jrm7my3fxnslnpau8vxciehzyetpuvzy3l3witnjj963h2ii6jfvxfh4yorz51qqyg8v7phmmtjgz5nvvndinouhkoabj1ls0qso6q0p5ch9rbh2wr3fd2fokkvf2tcbgeysthcrg50884cj2itvlw5gw5afjfjye1obeiymg4s7b4yto6z3a652umj'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : '4ee32czorfhtujgvqcewssx95lrcwcxi7u8x54ghqawxpi8rb1ui59e2skt0'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 6045235016
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'zuxzxjgar71t5u1bme8zxj1pjcaoos8rq71rg0zd9urtwssmbhdtlwxm2oplxftlbdi0vgsmfpiwtm99q5w29hx2frv0rhojeks6npgxlpvmkf3ji8pft7tfxgqoxog70v2a5uod6glvr7b9yvs9qwv7rqezw4eu'
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'ACTIVE',
        enum        : ['ACTIVE','INACTIVE']
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : 'lhv4m84yx71yb8xmy6i1cvsdkdtqhbb99fpo9fmd8tdluywb980dghneae44wlcga2kdo1mfj8jmts5moislr78yfz5x62mzg1zwb8vb8lsy8w0je8wqcn64pfl8ilc9c2o93oxvpw1mpws1ajy78p51iurrqb9l'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'fdi7vbk9zmnsba0o0jqe'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '27jqc6bcz4580qncqezm'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 07:33:15'
    })
    lastChangedAt: string;
    
    
}
