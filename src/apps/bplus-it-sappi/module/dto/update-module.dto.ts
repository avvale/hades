import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4a0c7a1a-f65e-4765-be91-c482c20e1f5b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '283f08e3-f20b-4154-8d0f-8ac1098899c3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'jn0zx90zi2gbb6720hajkcly6z61exikz3ar204d0rofq0mfy1'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'e719f8c5-a728-4983-a4db-90440554b4ab'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '76sxodbe1l1tt91y9dcv'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'bjl313xre3smyjl9fgwoxoaxl28qfe0yx7xsdwba'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 's9ujj2ttq61scqg7elcza7dvr5tjs6lel1rwwdlvtr4q1qktw3ybai3pvxysbkictkc1facn7jltcdqgpkl5x99b9kqww5hrbr56de6wl9va64o1hyi8k818t62lvfzv6mxn10dc5bhd0zvwl6ep54e6fyimjvba'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'y79vk757xa0zidqi7rxen8xgag8vbgxbrmnd2jdx0rvfrr1m0cwh5gxaneoeyvayatz1c6stv7qlaab9ablg7ow4wvnuukw6ycceqflt3wok69ihw2ncz29rt4dwdy3pp3fbmkl8xmy32hu2fs5egsdauz9bvdn1'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'buz5n5t4o74q0hivox0yon3dp4bf1v66qt9hewgmqjwrzwe9t0eb2myqde9qetdxfkilln6t9k1mdav9283psenajzj5fvmg1wrbkgddn24zm6dlnc8u9bjk765gbpmol743uz2snl9cgswg4iq706q5ofwc42be'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '9j6963smgb7sxrqd22j9zwflu7hml34q5y04s33h'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'ybd27mqciliu6sgqfnsopdh7ceodi0vyib18ldcox1l6s5qfsgoi57uke28i8hd8qr5ebdnqd2i7xfsw7hq8h4b8n53i5h5kr7uz9xzq6npw36z9zqq9j1hjyjld0fsjwkg2r7o6uruxoptruqf7ebnvbi3b73wt'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'potlfnx7csspyxg47f811sy8is2z70e0zm3z9ckffeb9ltd0wnz2u31vsy2i6fgxavwpspoud1e9bu3culglv34dxgrbsksqewibjx989akgdak9n2f7wihy7xovrbd37lxu5a6s2ivh4b4u5oh9o27qlorr7khv'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'rnpuxmrwt3r9snxi1j0x67skqe89e3tufvly2hpgjtq7b5pevhvxnfk95pnrczdp9bo5ubfqtpswq83fcdjna06gcb3kh08q856ls9c3mjwttoscvd24gogw18e7ux616fbjhcuqvyslqh5ssknuk7nhnfby9703'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'f6nf6g81ejwbaafjyvji0on2wfsdk1s5vn1drwiuz1o527rygo73xe1vs8xabo2dyss10ucptkj4at4xl8tpezhpt1jg1p1rcfzwhmohzlytrehthifet70ij106rivxmcejl6rz4tnwpvntekqn80rvparsiikt'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'xrn3t1ygbfzn99v8e719'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'yaxqtqn7aemiyvq7w01kl1womuogteav9n5l1bdkt2ukhua93zv8rm0jg8cvxdzlspia67h6fla49lozd007qnrztar3gfgwfviterh5eub6i5wy4d8q9lmoo9wgpfjeq2c0y4jr3sd6fzwwrcckjsgmck6qm12s3t6ktv9k2p55q1a6it4vz6iahy6rl53uwg8gxwyum0xnkfuvo0cpsa9srmya2rp97x02ixg1uk0sp2onuq5azpayarv80b3'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'za18lcm8d3pk8atlgcoa478ifxpjwucrpbk5o3r7nzfyowfd0ul3wvnuu44kaewlxyqlarcilsc5yp7q46pqok2zsk7bxurc53i6fzd7gvy6yj8ulg17qby7cuz7726qhso6t2zywzwgqtmqmji5dvc6fxixnlq2ydi3gtj30gf7h0yrb1nwvfoy5yj8n7veb3mmz8yncgx4dww79dsy2mr54ytiab5qzk7glo8r60zgg2ya1zkwxepuir2j9epkkc0rq2er3dj0leljka9vb6kov7twecznae6rcsagow4ijugnli8mprpc59h4mar9'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 't9sy0aujr7gx5lqyalq4obv0hw2jkrnjtoohkc1jk5phkwsrit6ujieueytc4261ip0mezhwybownibuopx3amlsfqz3vjsahfx91jn4vq1pyv4kspt15yem6wxti4u7412dpynglc7diuxtkj8lvucj021cgmb7detgce2b74b8x49wjuu3na4gnpyrrnpf36kvuj5g2tlruzsmw0uoyh426bwy9ob7takraxh1penelbgh1nadz64e0w7xtquk0t1s8d1o9gu7oipdohklb0k9pthabls0jgd5qvhtihhgispngrmy4dydfoevxsgu'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '8huapb4yqqlhwqbjyb76kfouvo0fdgavmmrlsqfc8w6w5pmimu0sb9nukj9ttva0t5lq47tzpu9lml0q6e3bn2bxhceudzpcns4lq35w96k5onisg0pssh6b1oyt2anv6rclrwbow6d0210j4f4ta72y32xpzl3l6qdxvf3brwnj4pcxzzozze78pik4ac5wjlhi3xwm5xgk5igetlop93vwl6en2q0icoes0kg8hf4wa3kejd19i5fdx18k5gsmicnebc8h9giwsvzdx9ldd3r5w2t8ictb7lrxjehusymb52v9n7t2i7m9km91vrht1te7pe2wh0yq80ry5758nw9ensefkbm9epp1gsalmkg20p26p9vc340tqijk15dlnvf174pzb9tht642ico6g6ht830fcnpcwf4e4x3s9iub3m0exczf82da4naka9rzmik0yhxun1j12jgb17fhxkp813167qy4hflj52px7qhqj5nzin9quoakvz69hj14w67yhc3e8742hnn3umx23nkkgfa4a3bl6rflvvh7n3a7dd1835pork5ozb98wqebh2no6958e1cownaqdau4ydy8mjiq9b8pxiwwat358iubjy3fkisaibj1n9kxq3hfl34vjqy3zx1530q2rghm6hboj8dai0sexatc5uj4ob9k8aadywpj095mozdz1lbrc2gad6rysm8l62shlhrdiedojhwwnz9yaihn1ucrfnuq7c6djykhh6sl6qydre1riofge2imfx4yhgtpkzromth7rdnc08e73ye8raxy16jh42s8yingrhum529za8up0wj5bp68fiynjdpdji6zasikxbato5sax9p0ht08aecypees8i1y9v9bu1nq5wym86idifype5lsr8izabuammtgyj5g1e2siyv967zze10f8x2935c0ekhrrxv6dwfgu3wdeu27wr5jjz53oo616by9d8v3gny3z4sxbuafcs3bihetr2eqililbmsp6863hdfszewkfvde5vtg7mazedswhs8co42gisylbo5nyf4pa7mvvyho0ybxotmcp43esv51dc0cvhyemgg39o14dththg0jww53u0asegbriamfcf03ofwfxrmuu9iyafa0sivu0s39069z8ylbtlbjd6p0qty7llfm6ac2ihmwqs1p9pnykziagf7r9o0xfzg2azi9jwvgwdt6veltq5wnaj93v9pw02e808nh7bw748l79hrvvbdarhyl491l54i7c60iu2fd0h7u0x8l77hd5er15q87upoofbzac35umhri7dh1y3aax36zga7vip2vg2j614qc6956f59bvifpem13qvryo6an5ya7p4mjlpl74c7qye4jcjkc5o2f4i6nywn3amq0h99tmkesdizf147w48c0ovosuxhlyuhq519fwdvyqfjpcnstco3qvn0t5qdfydv6sp91ureme8qn9qqy76kv8vaeeqnvweck8cikkxp78y7untocvuxm5ejgkp4yy3dl85hxnzf06148izznmqkv5iy2p7617ip3nh6pncy3a10fdl90q29618ys5l8gnf42p8mf251uz8i67a5x0dfqtqwtvd17pcqxi90s3qvm5qzewe4paocry62ew3eeyfe0qgegxrhgrqulkxhru1un3ov267e13zvxifkt2fmorwcbn8lztzhfh48lxxgru7tdue85xi4mkkgi7m0q5uem7qgz0bpoaauew9i6488qy71xj6jtis2bximamsnyjw0i5hv4x3cwmlu606krx6ojngfqo1mytxw3azp6v3p4zoe6zfork28oh4t7p43nxp17ye0pe8c3urnm461hslc2r7097uym77ysr9itt5af38g3fuz40cmcgxe9z9rshujdbsce9dki4ixf5cl285tf4amfxtyrpfber9c9qhdo2mljtkslmvtb1y0npa1sf8fjhrh3e9257768fg1jcbhezil4wfcbpqjg7u4xibuq2vwlujsdifa8hzxk'
    })
    parameterValue: string;
    
    
}
