import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '5e09071e-30e7-469e-b7eb-2b7feb8e33a3'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a29ef734-eaf8-430e-b44a-b57db72ed4d8'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'dncoiq8hrw4brqsotcx91gve85miqpp8uikxin2ve0ir322zwvbx3zvovuq5fc4o29y13251qyaitpt992bhpyxelryh4sxiefk0b8818qpeje0oqgcc4sjsi1dn9xz1h95144qome0bxltoaslm32kmkpmif7cg'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'ck5ylzr4acgszv0tqmo5yua95wsngeqvg9knpys00lfiy21i7kr8tuvruylbv2jq0fjdrcpwd2tu81e9pehluv8k3afsjbhm79ef8hz3g1pte79k5uu2rnjsvednzhezb9oooowgakmp24b8htfddji5y4a9m1na'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'vgxw02u3e3q0uy4cliah1sv5dbrui36prge185jis4fd6yu38bykzg4gd9lk2gwunmwjr8qn82jij106pqkrnsq77r7u209qetj56j8agtg58zf78c88fvcv97ohth6nfyy5lxcwtjzwok5hgv98jnp0g0tu897b'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'o78owwlwq8onhaezzepr8k8f826cpyb0jvm2ri1yu00k5rcgx68lviof6l8zq5f86axfu73rq0j28gg09efwhab2oreq5n9f40o5nmg3x7fvw7zqt664l3r1ggi44zul7n7406wndeehx69j1e8hlgu303o8159j'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '9146xz8rlbkvn1zzmxozmggkb09totpwluzqh5xocqdcrouxvjipajmr9ig6p1jo4c9z79df91c0wc9gidkmbxh4xweiz2k5yht0xs05fv0aosw2qube3tymcm8hdkq1eeayb6uj6mwcabhhtau76044p2k6r3bn'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '3ti65oz1mcz3b8ll4qjv3zrv3m5h7sewo3nuim6vm5dgh5q0jq4tmc8mny58uusdd5xlgump0x0u6exhhzy9uborrrtouhbeh3t0y3wybb3aa11e6we2vdkczryua9ze119co17y7otcat0tzclozsqfw1sy2145'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'icip5bs73nk67jiud6jnnxx6k6o4dnkgzo2ptnal6ph568ilavyfehapw2y2wy3kx1ulxyx64cbtgs75ecze7mp9ze8dedalzlrb6pn1qf6a0zu57dqjqneetfee5ve4x3m7ee6hfekx7sd6uwes3xpx5e53vh8q'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'k3uadojoz5q4asphmsmqhiv88iohh996vf3m89klwb28pnrp1uqrugkassbg'
    })
    adapterType: string;
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'SENDER'
    })
    direction: string;
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : '3t0qt84ngdeslejs38kmjlmqspj5yq08fqyag3inhmu0zzex36njpyfkv5bz'
    })
    transportProtocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'zw19gru9xj3h103gqi8sf4biznx03p0z37993rd9ysndurcwigxzaozo0581'
    })
    messageProtocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'uia86usd21jvizt2apck0621fm6osmt0xfdf8r0n7apancwpcinnjqeirkfyc5v5dgfc1hee589srm4u77s68avzhihoxoxjav76lbv2nv7itvi4qktb26s3ciouuwfu39qwt7w43vu91yx163j8bgr7h4bhqkom'
    })
    adapterEngineName: string;
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'ipo9f0ncygib63n7wugfxbmxvz2wo9a27kkv19uutfu22wxnflq3h6bthbc1uxae4ivimughpwzv3ly2n0dhjqwe12z6g93l331e937c8m1cwi527e8g3s5jhqc8ry4gb0f9qlle05d54n0xbym9j1dg6svmxp2p24ire7s5uwkfk3q7qnulnldt53bmy1g4lluiznkelcsez0gg8a39j5m3hbi6dtteemhqwfnmbdt9k8t5a2qy75umsi33hjxd3mqi5y9ut1eolwteu05vqgsj9o8343tqvv4h8kiczhm6qm9iv8jrm51tfpd7sbv0'
    })
    url: string;
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'z8wqtgomtyesyg1gnw2c9c8rthz2t3qx1y8sb97ld64o07rwxb66ofzb8gyr'
    })
    username: string;
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'b8859n7lxcqszcsmhv7qnxbpdxdsdqq3wet80fa4e51ozl3djavsiulfpudvt07xfdpqy6z5lz3r33ky55gn9l40ll531a97eli9ox6coa0y74736han0wu23h7famgq5c8zct2srcfn9dnnzx42x8g2im2w59hm'
    })
    remoteHost: string;
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 1853258704
    })
    remotePort: number;
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'b7d22g6hc33ed1xtq5z3k0fnvixu1oaqvcrnpjfllogxd49bhij40e18qprmure1cwbljetzd4jsvncfi1juruanc98i66pf0jwbitp83et13p8mvu4frt1ngmz6ixpg1vkg9mb3c7okd0ty1gcge1ikzmx4mndgfcwtlurwebu2esfeb19nb0b10wq3tstidazo2irjksgy6tpjlai7mi4mx3enf1vbnteblwb5g8rh2g0z0xpf94zgn3j4nnxvnuzh3u2ivi18mk4zinah17hqj3z9hrfbbuxqqsklqbgr3r5wqsauh2u3wpbmy4b7c4cp8b6sorletrzofjpppdsgzng7n632uktn8fnqqyv1rzo1acrbhktqvb62nt9jbqmgxd2xqzj3gblddef4cvwce4nwk2o6vfh0h2lqqs77l462r86s4ux1fn3o5qn6yyui8txtrtirrmlfrige8jc6vku7knx1emzyhjx4lpj1unjzftp6121h52lwfhwgs49blgtybt8bd5zws2460g72xzpie0kj0wrrcqtczgnqu0tunkb2fms7gutfmnzzenrw628rdbzxpvr2nxarvx07mj9wvp11a78tt8bthirsrm8wgsluhotz2dge1jnhjtnye9ipispir2hlpinj2f1min0kgtjks8e2uhe919g3utukqvnfk5k3hfv70aq5vwky8pkgp0fw55x8x8orexpl5o9vyvrdyvijxyys5pd7myjbcr992o97gk7dvajhhfkzgyhsim3oqy3c4mo9j3bfhbreqm8fbawu7zje2ddeigzj85oarw8080fauaw3041iv5qxlw41ccfwo02z7l5m2jqguwgu9o04fnrly41yrh3h3vuv1c7ffvddmaeup2vco2r2eu19p0qevqclytefoo49o5fuhkzglnzadf1yhddu7dnmd2cvbiz8sez5uz88c84lbiakesmcdu0j81yntirlyfsbmkz5ww6fqu5wx5tsvuylfe5z8zo4a6cj'
    })
    directory: string;
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'fgfu6sqq5a26ozzh65a6zbvzlj5ak9glztl18u0bxq0yx129sqk8pquqhglk2tz8j2jhibbtmvr7xj3pt8fojv4k8cmtmsbcaifwjhjpb22b7zoc94cmz5vq881yxspoptre8yh21a7aw99f4r5bo5qto1ntq3g65biiq376zw7w4wo55u8deuao6q0cjygtuo9wkla4hgvdvoz9daq4y1hfzxr23oao7z83o6fcgc9ulhf5mxrl0lo8oxf3rylrfvp5igxu5v1bdkstafhohgak2ttbtfki3o2lcpuwbdwatytztcj3ocdgrvgozxjatq7avs90xwcohzqpqury0jom97hi997dvxpcidg0xw8baz1zu7u32igv4p8fexb3t1w3y50zdgodbd0hflqrgbjzax42b2iwhgfnv49cal8zaynhquy2r8f0fhhodikz8d22cpqp3ya78ltq3pj6haj1f6bp3ulzh6z3sqkd5orpbpnsp62dmquhrom7nj3whs6tx7beozee0b8gl8bz1bhuerhwj6mwsua7bkitrtehqut83eokqp3xrxduk16nr9g4zatgpmtss9tr6axbh6ij1s6db6gsfla6esiv55ir95v24kc0chm1c2e3onsrucj1yy22kjulaky69a5shlt5fqsr7grv044yshn48m7v34q5r8km1yjn5spcz0um7kf78vqgssv5u3o28narqumdz9u1r00y8c091f7gcgftbh7ori2qzbrmnavphuscd8inpt8xcv7drmiykdwue47jr5v40l14wvf1o44laa7sxzirxak3tjiiy9hiwkh0zgf7xgin2cx5gybxp52ry43xx3i2k2ay3x04athg0degl5e44mqsyqcjbgkfzpzmsmkjcsogn2zz1yirz6bfql3jqk94x5m1fbfkpcvmtestxb9emw9688a3yotsj9zqe4jmokra9prc6ja8ifs4xed5iactr68ic8oe11mhbo2p4fct5e5cq5zvo4nrsxym'
    })
    fileSchema: string;
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : '3y14a8u06bqbrlhmmmb8jcgecxwfwn2an8trb5f401co6pnxagcqc60z7ygr'
    })
    proxyHost: string;
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 1996592893
    })
    proxyPort: number;
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '7922jno5e1vaf9rnfgfl7xj3tnfv7f6ih9lknxecrocp5ob24sgffi07ekuzlkn53nvmkc729i2z5d2b5wnyvqp3hvsfpid76f4h95m1glo0sej4lqe4kukrn8qn7rhjwnyh41obxuf2jgf1oeyo9b0app8wy0pr'
    })
    destination: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'ACTIVE'
    })
    adapterStatus: string;
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : 'k58c5x009if5cuk0ykllset3pv6p34mzm4esar6zzcrqybgrt5bf47oe8i0vs4yoyijaxjl26jafewbwnuu3dklcbiotzkgcocdq3cvntjqtaypbfn9viub5l5bhs34msf0khiqh0bs7afi6nrdmqhno2wfryv5e'
    })
    softwareComponentName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'yzzvmzbfoie2bv68lntk'
    })
    responsibleUserAccountName: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'i8falwog0omk9jin1wyd'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-17 07:29:25'
    })
    lastChangedAt: string;
    
}
