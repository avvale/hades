import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3dc33520-4cb2-4278-bfd6-076ed42bf026'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'oxf16p6yo3v33vp5ekskrbd05ietyquh9p1wqp88'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd8ba3058-98ae-4ce9-9f95-19b662777756'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '8cu2owlwt4fwjhxop9vhtqlkwtcyhpi0rzfudltk3kj0potb06'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '119453a3-9825-45f4-a660-1d5467011cb5'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'v7565f6dap83xdbyzcew'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '0qn69y5g7hii4s19nxvueo38s2htofew1ctk04ngwt6ln4w2quf48habyq130ordo2fkxg4m5pjclxgfc96llruc27v550kd4uhce11lf3av6q0rl0xbvros77kwi2y0a4tahyacc6me9liw81prlgytte6jglc7'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'j29vq48vx5l3ylupvtas9d1sufbeyopmumbf5btl8lbakhn4coth7r99orvl9jhuunbg2mb3ugu1g5uc7llduxkp8y2cuo5pzroiyypep4ey5j1kqtbee158tv7hznvrauot54f6a0xltdr9fs35e442vkzl18r9'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '6mtzdnvjam3ldibfi6vq0h578bdqm9wf79irft28vjugy21frzpwxd95my5zrnu73zfaxino5njw9g4ig0jlvmn3b3w62pqacdkwnmgufgdusfd7fvowxg03z8xydw5q6d0alny6vlol5q1w7uua16j6sgf2mypd'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'nwzew7fv7v87u0tiglzd2trdjpibtsfp21pflewq'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '0xhad0501i7559pdroxfqh33cr65gfzhatoicycoj0fjhyvnaf9qn8x18317krzcqxnd4tpstkd5phsexalomxw1t6pfauwhep30vlr03qz8nt1lec966u1cv28lumzx331qxzv849w7q2evtkpd2ijzddtwj25m'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'ta6cahwe6klf4q5n8kurzi0v5owqmksw9elqtyzz18s0qnema2oazm0p5twkafhfmf7tgw9pxisf4t5h5er5ukqyb2chw2sskxa5gowu12z51g73l6xpap0q64xi215hskjqa232mg6f2i83pp6p0f5vea3xu8yx'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '47hmc07u7ygpwp088w0tbhoojo80e748itecc4ini5sc2vhuzv0n6iewc2aevftygp1cg53bwdk4ftrs0w2fskk0fhxd0seow6fzr0uczf44upj1buugvib0hmy4gwa4usy3ko7a9xofk2o8osktbf0mr9exhmvw'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '4zsqr80aq1dcay8jh5v1k0vyukg6byawqic58sfzlaq0sym1t089i4ghpsuhv010uu7xn0lmrs72nsety65wvtezwtj862y3n2fbwg7ibsyn35hk9tw4xrck4frbe1fiat68fqwcmc3s7820ucj46t7arhd8qqaq'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'mazrdcqf9ctwdt6y11d1'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '7wq26rig8x78cmi09vkjs2txjzs5ko49lb93rxf84cbiwedl5d1w8don8cfw'
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
        example     : 'a7jvsjsym5ifd03dz6smkeuocy6e7v99s1y6pr1uivap7uhirkfd2d0ln91i'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'j4ezyytxnovpxe1t81o7cf1j00jymn87lxumngwa4iz2tbdqcp5s8fv7wkz6'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'jdgwto52ojkgr3afcjyc26q6bxybx5rz7uz33puov6tl7fx4wkrhv7w7vx71mmbwraq0gznqo6qoakk79820qz3l2tt6q8wjegenjymeq2wcyx1q8u3locuwpjbophilvt8f8o22xlvdi11v3r1lvsl4g5is40w5'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'bs027vabulyi5xhgbgwye90dxxvz19t8onyoslu40a2ou0yg5xzygcvdan23rom55tqebqdu5dajsvcefdzwn3cb0rvklao0188k068vk9u0ghm6bgfizaiu65a1m84y8zfagcwcymy5u4137gkabljq0oj67f2zckwp6iiq4lyilrcki3qvdaua9dh2b7l8a8lqzwyw8gnosf9drokjjkj2l14ons3tvnl4lyvw7p3xhydz9oyt433ypz4pobel9kr7hwymedx08rs6ntqrlp4lvlgc67n0lswrxs69pzsoy6pmqe6c5i6vxmts4op1'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '70pr3wx7r0vl2tizzzd8s75ktti8iawpm7hyhub51i6kdv75wznepmzahycv'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '2id9wljy6pzsllj5s8na8gvlv0d9xd0497w62778y1k0qtfaeitwn7xpx7hjgzcb40usckmu88e68ibafrdos6v9vxe0a0tpmt5pgz42ihvs1yi045wyvty910ce7i57ijwedrelcfx570iosez5r5r9my8yd6ag'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 7412729473
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'tlqzylqe09fs4ma1ea17f23vsiir5i6w3nrz1x3ygepapxubq0z2pr5gyntl6gxkyodk4iyusyotkgona0rkx5mhag2i2u84vw4x8koiqf3zkefxnzjby6wzo8qhpedvuh2b6351dqnrtn8mw20qendf34qq8ba4rf4tagajqsko8b1msfnraxipjw9rhx3vwfv91wahyuhqwr3nul8267elgrdwahouuhczwq46bfw9lwqxba1dmbw3hipa7f7r4jl6ubqpbkhmyq338com4tgbzwc5i0t1na1gpsyuma2567o9zfk9kl60tn5dz5wkv6effwn208c9x5tx4njnfwp1malvp3pve6m3czrp2u2ok2mvlk7rtla6w88z71bw56hx21upg2rsskwier111qg2dsy938f77qnj9mofesivf34jkdn19c0p267trdbimjf6rtis4wgflx3q431es7sc7qdfsw6d0zl41g03ew6v6xpksz1nh97m851uv4y35p70m2or2za3koybgsuamf217s9vlri5y1mk2n1mcftstisrt26rdsz33hqxxagk2l7gzdmgg8jday8glhj6d0o3bpkeyghhga1r4z1yof963q5kqitan04eroq3aqydgkf7v63k25j8aqtwb7pzb9e5ch6s0a29mpiyiagvmsiux8s88mr842i2i681ippbsqqrh8boe7zsgriq5v18zb5828vp6ckfueu4q8imrgqs5j6vkgjs0itbym9gnwckgeq5u6b4vrd3c5vxcf5nmcp8xky20zm2sdnwx0lxwmg1b2mlcmfwdbqg1gckm7asmrwgv6jvxucp4m2u5gz6hoqdhor2h3lh4wjyiinrcluo5ry9b67yhxdugvp73758462qvitetyv634ouyxzlle4qx9089cmpnv9b6j93ntphf08siuax6w71lfnlxfjts8opdkowkmhfgpzhbfvis4r90lw5vt8l6ozhmxfri6axhh3plmocw19qn4ky436e'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'rdi13c4c5oeh6di6y946eksb6enh4lniuklualehrxvlef41324g4niyf6cd96elh63f7e2hkxltbrioy8905at7ysnlkifzhqetatmhlmz6y2dvg4v980vaya4dk49s3jaxphxz37q24p30vw4vyxbmgx66862bxn3aovidp96lwzxm8c3vptm8qoba8zja18gyntbnnunu37toxwtxaftemu80rd702965pw23xx2qv1qy80hwvb366gr8qq8gp49ncb0m0gpzspfd6oqwxst0ojytxq7jxn9ay63tta8xvc9nhmhwvvlnx0064tom9oa0xkxk6pmlx98ezrmolqxfzzl1tueez9whv097ef7i298a2paqnr85dqszzowbd6p4siqwryo8y8cda1wht7wlty4rcdy0f0wpta0r6t6j0zb6ju15aqshkxyoodexq3b20j1js2s73zavqheneoemv0rbvbkl1501qd3ge57mtpuadqdq8tzftiwtg68c6a8ie0f2fp0oolagin4dx4co8op1p4nptkhypik2714fuzn4zjm2fdytvq8n7lprum7cegh9rzg3gvt41js0lhwlvgwbjqiv8oo4cx30zaagoh6jq4w195gy3h9ygdzxejijhcxlg3a0zx6xvs4ejihbklaa7oqel04znoh803vdm20uy4o2zqrgaqxqbgtjwww3bfdqkx77os6t2fwd0hoi348svdrbttukddexq5xu8xllc0y27o2w0evnb83w0f7lbnslayy6vqqnu90fh1bjyojmjkd54g76c2g2t1aop3lg8f3nprvso93bplnos7idb7k67u4ymhujxvnb19r0tygd12ms80inwmc62wrvoqi8dvbcchekk55i51qor61f2yohkwd7czeyv4jqrv28vbphw8rgm8rjgwoqljhnf7q0dcsqweai2os3m9djrm9y880kr9trvgirx5582z9mtpjn6t679cpq7tr8b97d83ro8irjucu88do1b1kt'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : '70lozztt0mrro31g8hnx3obe94kcncip4knaja0ms455v05coljull57y6zw'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 6146185911
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '6qc9z6hb2gkgprpufk5cr9fowzpi427u4aoqpfru1msk2ijgw1fpbxgjx91bye7hjyjhldbi7p5lkh7s46bslxcvyljjs2lxu56jow71nccfd8hxosz5j7vnq1hufp038uop9qpkags14zv8uq5gwf3bqsjw2mk3'
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
        example     : 'tqbsga2x6yjx6a9b21xdh1e8p8w6lsq0glneahhss9ktt1d71m5dvazxpigntepa5sb1gg0q1akf5qbplfojdrjcs8y7xgr51pio6poq9ovsi0nop9w5kzbmulgi8712vm58q94c4rcglm7l5573ir4ew2lqyi6g'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'j1otkaetl6oapjom0hp3'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '77hhyckkygxapehghpyn'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-05 01:08:42'
    })
    lastChangedAt: string;
    
    
}
