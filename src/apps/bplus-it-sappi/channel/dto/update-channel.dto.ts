import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ca360478-6988-4e28-86d3-10aa75f73e68'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '6n33nvuiyq9p4saqr815ya0y0q1y9jccmpu4rh60'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'dcd78845-0d79-4bed-b02f-47a91163fdfd'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'u7v5yruysvjj5kzyph7m5qk7eaq94hrckth6j6j6uf6fctwe5n'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3f03b1bb-71d3-4d16-8ef1-00949a1aad44'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'm4whk151px4dkyslxtpn'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'nqolotff4ol4ajjyen45y5pqe5ok896w7sbhvg98nd3oli27rywdyuvl35xh9jn3wfi5ten14ud4tekbhtgcxzx90a4tibwgpdw0xadkpxgabh1bh7ad5h57ilycdth6a3ol750nmokyn7p12k133yxsmy2dt536'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '4ju0iekv6513lhiyof0zo6woiw10n8xrme2xmnyapv6x32y91igb9axlw98h7fizlinztw9djlj4lp2o0so27f2pmk1k8xi0ogh1c9vtvp8psteh53w7bjgptcnqfglwiuuz1bh4rrnk72ai3px02hnz73dik0pk'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 's8ou48ra1aeiqsrgc54tlao29ts0pzem8su72k1gup65fxrbw2crym8q9yl75yfpprc6wdceh9zcgag2gm6ih4bbpt2j7n1abvqk8txjxi7wo57b8ipb6ll5dmtqngkaugc2a4ddcoi12e5pdpx90rsfd06ban8x'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'b6547879-31de-4289-8e9c-6c2a75de6604'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '6v9mbw25qlszxuxav0lwnzpafofj7in5g25dyi5bvjacp5fqtdmzd2254bcmh00t8bbpj1ylw9ptcygvoz8iontid4a97fg3b6fo8gwm4uzhp1rroyygcf033i54so0ibnoj6hgsl145zzgpjq286dkd7hypbgr3'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'taz6f9a2li28yl3vqv43h7cfm0vfr1bcjsnvuv9q5upeb81u8re27jjmve1zen1dyr1wftck7298ng6ijw9yqh6pqr5qv2t6zso4ymb8x9qyaymdjdfvowvvy6ff6l4rmcriksprhuq4cqc463zvugvqt1mc1nxt'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '8iqdewkypizbxaiomyx55cp4i31bkrpgxfdfftr0v908lbeyvjxpojai23xkluvepm11ztvgc6uu7646e7lz4mqd1y83lu0p5ocy7sq3c3hqp0i41oi27jymfyush5vizih1hawon3gxwpt234c20xhw6ifazgtv'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'q87gzb69dhgoyhf7einyew0i0v61i7orvcjwfbtlwaronmb9tpjrcat0etx3k5b293307fwbqskn87rltjnko6vcccu3mrbdkp6iqi579irp0g5twkum9twc0vsx8g8n90ai4t8m8elcpqp3u8hwigbdz6zad0wq'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ir5mda95nmkptey98mij'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '3394evdsxtem8p227vq0sj9bppge97g5lu130kwdek82kn7ky7bzgfkp4xdl'
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
        example     : '4vf3y4rgh78rs23x86b2dcuq17pjfjwufuw8aacvqsdids2uho39scqcrjk6'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'nv5oon3btj5qr2mhx6zpco95yzkrznxiakm0nxdgj7ujsbzhueuvvup459xn'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '5jvr931rpuknlusmpbe4nue4cq1hn0iwq2tlcb0ducwkmo04310p4crrkl6v49qg2jhhajypq9nx0xfs2bvcnu7nrx55m9yaq9ac9c4kro9cgh5xd6e1pbp12i2lxqb5c9zaljy85d5zfznd09x6qof7phxbb8o5'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'fxus52x2ia8y3as1dfrpxvbydt9xwojhu500tqzoqgy12htscoz3o7u894kz75h7lqb8u45lx6505y4wpgrmcgr65zysp40zjn2yon6e0nuc91rd19a2p7ldazn8osvypu8v2r9gl0ggnkmahmlj9tyjdn5wm6kud0pv3m0d2arzpqopfsc8zx5xcd8x1rma6rwj19qnkuslgne3wrcy7jgvpincygtrs096yz6pk1k92plutnsyr0g9x23r1e2uyoz6nsbsws291z116ux7ltnhmo2swzfnfpxjdl3tpvi3g5m34352xd2hklw262om'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '1cen8ccsvwdoywxm2ilhc33pmoda1rfrh6lll1bwxphcxglc101mw8anad7q'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'z4epnwz2f8acalflrlym1xvblhj95erwh5s0k465wv2xjx3pbzdf46qnc8ckboc2nmikwu3dt0pq79ctxrl9mszqjmju6c7xpmreorb1drg8zz0wt8g91idpusty2n5p7hxfy9o3nh8pj12tc93x1vsyxkl6u9zi'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 4453548787
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '2kyi12gdzehslhngovc1lb5ms0kqpcw4785galoykshn0qdp0x70r70fgscunz1sdqjwn2gueoiwzlgnd5bqbhxjwetytpux0k69h0qtmf3qyoxk97h1052osj4kyx1s54rvnzz439qrqs86ffgm2i48idtkmm01v6p28am27egooh37zp43t4wtkpqqq6531fpkar2qb3w6orog3xni3wubl8s7643v03s13ok83sufzl3uuj8sqdpy4oavwyspppuebrb5x6ssi4vjsckbc0qj8520upq2b8tfntomk8jim71dr1q1vwns0ogarskapzm2q16fo3du9e0bqsqmlc7lemz5apdv9l08bnw4hjfbzn53msw9li8stb09ffh5lmhqpcgs3ogohj3u6yu7uufgxyfxa8xjyyqco4ba7cy30xdaf5c2ufjftupuzco01lchqicm0vf0miedl5yh70fiqzwepbxyjp8vz1g8vqc4gu9gd0dvxeblvbnrr6aczzovrud2ks9hdb8oz5swv3tyyxb5ya8d3q1el41esr69xkn0gtn9k0kkvjf53ieo9y5le3mqj4vo11ss4kzsklwmly3qv64hp52ba81jpzp3kpo68bjotml3xwwrnhupse596jdaqp75d2kq04nqumax514vhgkfuvn6mnlx6s7l7mm0571hmcoovuasg4ghemsupf8gerrhxltodoy71c8004n439ysxdnyk4l6oj737mvmqg4zuzaoxm1lw4de4437veiwgq38ji1w1ceb0xhoedborg88cvkxzb8nn247pq6gre26ir0753nq6btinacwuyqoolsi589h8fuk3f1l8r6sukir0nxhgzrpk2lau4nprohhi0v3i78vq90pp5x9nr7jhryrp2m8n5ng4jakwa6n5fggyii72bprnpw21l37cjtla3l1rf4p2p71yfvtnz5fpynlau8l8gds10x9zjyem0q1zy4kzgi1wplobpwug5lvookpt016dv2a'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'mw1s6f9ayp2cf0130ifr1z8fcgh8q0jd68dx8mfcehkok6ulf9a7avg0z7e1n9yasmt88pc7cxxdkzl6wdwrak5h9zoqy7fuivget2ioqy6xsk1dhowoks5czazv5i0unx14lsqrfyopb1z6bx1c1myqtfzp908o5gkye4oyto62me53ejiz7pnmnai94ogy2ylns7hpzmrfe6mmj0hrg7so6acj86nfebphe6flb93e01fswrv4lb26e4wofpzum8p8s3ydpbilukr9zaimwfo6y5qbz52he6b5rnb3348de7968hzyzxviff0iu46o7m6kvfjbx4i13yoibpchoqjwb7fowiw2gkhcbe5oe6mx752094nu207lrrgtaidin6ce3p8ia9uovr9bcdnn9m8x6qlx2p6zdcudo1cq2clgceednozqpk9e63dd7vbsbkehwrmu4bkyh7s2r7ne635ueimf2fw2pm9pnmvslqnzjkxyrirpbtiry7u695g8muyt85xya0x9149mw7wdowtn1iur6jn8ygsldawrjun2tn93q9x5ui0qbst9j7tv5oqz0sn7fd60tigkkybeebycdx9hmftznr4ul4tsngpk6p4ua05xrv9nkeb81oyzf7wlx0o1ex833iddeexyuprrb9weluipp27y6j8qc2sk05n7946mft29i0ybhkrpxi8mdm7mwreait4bsqbtzmz8xe5ietj81o6gv1fniwo6nkswwkyv162zdmviff37nwhfa838yyave7o9rsqdae6jcaiuv8hdryokz5vxohhq5snbrz7brvpeex22nxir6cioky1qp16bntnubpxs3bw0zo7dy8hhvwkzv4dbjigroiprx4zcof08uwuglhcatq5yjwv91utyhjyqpyiwqh83ldzosna66ly9fol6t3yjfxkarn8x835n86v2jnsobyz4mtdexy0916adgx8tfbqryfpvuhlxtiwo9xkpgrky5at0jmv9sdd1rl64huml'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'ecwmwcxvu6er58xjko0fak402ywkratarspabdj1t76p5azxz5mzdahk3yzb'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 9533641129
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'rkpltag5pk4pmlsaof4ygrr3c4d8vkhi4ke6nnvce1aazt9pqjk3l945x0tmsgi6z0d904w8tbrnsb0k9an2afkxh1x94agitd39kjjq5f08ecnht826ftfrhxbrb1f38idfsmv4fpiaxr2468mg23hzsudy5nmh'
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
        example     : 'z5aoixtcu14yfy8bmhdkef238ycvl9w1wfl4dxbpacfbeyyopfswszsvv8spxucluhiue8hkqn6qkcxfhnm2lqaydt2si5cmo6nu039fiau7cg05rmqgxovfejvcr6r31cqr0dc2831shlnijn5uzfd79qdon76l'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'gfrwy7esu7w7tr1ex1kl'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '2pkl4aamspefiof7q2rn'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-02 19:34:59'
    })
    lastChangedAt: string;
    
    
}
