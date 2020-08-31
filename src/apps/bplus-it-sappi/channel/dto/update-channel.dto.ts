import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '660772cd-dcee-429b-92af-5ff08474e25c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'gcg3bv4ape5pnp4mlf4q2b9fs8u3qh05mvouvfj0'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6ea71f6b-0947-4dc9-a586-42bd86710713'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '5n3v7oyufik74pbpvq777eoqbj0doypajdtm70md23zcxudgr7'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '7swuag3bf6ifsbusitu0'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'bkrozzpmyr10axv7z5hdchw69t24gxs4fzeim784utme4fmk5yef1wqri2mfk0q1ult8w7nweu85yy372a11ijpmtq3yudm7yqdxt2cwk6codeogjcu9l5cf67hihk5e33ssd52qm6gs4q3dj86ycbj8dpgqrbxt'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'ifcvrjeqx2ve6jn9q4v8opav51xt3qrrf4zm0yw8hhksuq0rjiiuvu66q2o1h5itcyuzm6zkjm1gusmej92fq2xm4rsiwvknnlgbmkrqff6rxsswkf0r8k15vddwckksje85pbwga7socnpf4f1jl2rngecog3fz'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'g7333bv8plwxrv63ggem5shcpf3h5gef2bn8x0733dsxe0qv0q5zva937bfrw2nwhysu74auu9sjk5w5pvevmiotnf7igr3e3vqrgzj9ucssawdb7jvwltac0g6kb5jbjcpd0obuvwx74gca1rxpbkklyn7wbjqa'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '6jj0yk7f6mab0eh3vwincxg9frwp07vup9ng145g'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'n9n92p3p2vtl42xmsh4wi9lb8a752xlgn6x1o3h5gr1mk5dnvgreavym1fxc7r8yeyb125or326ik8ayy2g3wpa3n9dqucje32bwsegygikuxdc2n383vyreeeuimqcem4h22c4l4nz6xnnslltbb0kh30nmyg8b'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'yiu6e3ir71uem9rsdw51zuxjiwr4ocxa2e6zu7i3zizffzsqi4csbonwyoc2qi3oh3dx23fpxty1pjka51wilayvyrae8q3gupagr1micce3ihzx3ot8dppcp9gqgny01db9kq3oxrfvl847pksq58ysz3ax7emk'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'bm0dwo9ps8lnazkvdhs4z9qduv65ynalg2fxz8fczwrh2xzrysowgmk9h4nhe2xlandoaauad877gsp3ibbndljh37ku55kkr7rflkxwgwxkggcsfnbtfm7wkx1fgsxl374q2bcfecdm2476lq35qw1blzyw7bym'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ea12f0bu38hoy8bamvzwokbsaqu9er75v6ihc52efw1d6etkjz5igbs9wa9dsq1dlap34xmul5gdtwajbmlbn8e72oo6s7fzceu3i5crn54pgnfmm6y9jbxrzfc0oaeap0vc0wyio61ehnr2rvyedity8wespt4z'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'buwkjw2pwv1a8imsqhy1'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'm3c3ccr830lvl2l9fg1vu9ajeg3n3tcf2tefsh147jip68482kmb9ppu14ga'
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
        example     : 'le0bgqd7dv3x8gilefxywzdq8ka8qyhz369ms1jrxwcm53sadp3mbhdr608y'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'lrbsv99x2u788vc79eo3h0hyfwxe8rljbaa7dodcu0lfvyny347vfr506sks'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '1unyygokmze05j6s9dwid347i3xf1pnydvx975j254ckma5kzc5o2ufwk7ar1hsaw5wdafobjuv6y7jvhrwlo174z4wosxomwmsdvkejqoe30eqe08bn9ligie9tbys5nrcobxp13ih6yeu0kg83uggy5aoknm0n'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'f4y2g62mgrg2bimo96u4mcjwa3sc8revfwk4nd19jhg3w2556lfntw1pf55gwbjeaq6rkwsrv0eb3wurl8e9o35hwqjh5o0px9fzr9vywdz7qqxrm8ue5l1ndzy32dvcxokrf70cgadrlm53zbo2ri3srckj0xja5iilrrvmgh7vkys878i3clzmart6gnyhyxgazgs9blorkgbvhqzirc9371map8lq034va4evy2lex9ul6ibxfkqrch1esmawldzh7pkjn2y6s76sns0wn4qsaxkam8b2vk8aodcfl6jcukv8iizbfqgah0vdb1zl'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'c3agcfnz5c0i5234qmy55j0nqe50rnpyfmikjvggw5i4laqm8izq7spmd9w1'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'z373mur6qdiw21ucv3z0ifxvix7ax01gz9mtkackajcblxszhk2wx9h966ok8ularbi8n3j7bzgg3v646foeb1cmic7ayimn3zfghjqg2f5a3fmmu320vcwkl88rrdpmetjv9mclxityldcus0wdkk4cudpgiiyb'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 6174396539
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'vc8nkd3ntsvjitco2daunx72jsqh1564hpjc3rqbqiustrpzspp77skln5otmzzawa4pirnk46jsy8h2s4p3y7wmic2c3wifj63txx634opfsk13krrf5ynxnvdv2xqcdrxlu8bxgmxcpos3kcf56mys9vtctgx1324jedn9323txbfsd0or7jgjnguhlmmaee6ezkm9apdyobp6yc5qgg915lzm3sxzdjlh1dz9a6l6mbf469pns1607jt9hqhwklou4orl39xn5a5jll12zy1k5gphgxg6h7q11bh6vs6d5vkrq2epm2120iklnpxw77c505q8zsmfvo2ogqex2ebg5nzplw717plvsvbtv7b8duupgba3xgarvjq4ynj9mkdky4icvzqtjm4nhk862ywg5hgtng5w3dahyzu3cf9gs7i9bqj46d92l27jlrex53ooff2eagwrj70rbv9zoy1qfvtnybjjm8tjz5mpj0v9047fr67uw7c0qnkmqhex8xa64xn8knugdenu3z64u4b9pg6us41yxrm9bngjwypg1g817vrqfrs9qv5qwha81ncwz67jt0bzp584a67fos40h3yp1m548fg6uvg9pkyzwvtv62f42b17fttu9muqew464hkaqc9t7h4p2vv1kvooo7soafi3qbmt410aezq2pez9o5at30uh0zptu3ytb0ptx4ltjbl2wi0sxk029lz7hzfofyitk6fkqci9gzi0m6rko089ddjt50mdk9jji1iytkrpiu7bhbcl5q53w6j5tvl979n5uad7bh3utqqpjxlx1gdyk1umn7dnqgbkepee37uo3cg2nltu0egnalwkoy1n8wk40ejm67tnpga5je7r4j92btogtqgd76xxhxwk56nxqgvaf2g87z1mx80s13u7qs3zwqj8jnu19q86uu730wkzafp98bzxw674khycf8szcs5af82l8pqdjddgp5u5op4xo22rxwp31vepiqydc3wju2wag2mzs6v2'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'ip421ofsazq1hhrkrdhoe2op4xpfaq55cgxgdzozc0l6z97p5505lp86gq07a4uwvw2nlqmw60oxdeov16ez34t3uscb35ff6s866luny428ldo1c43tfbn7im603twz58t8kulet4wiup8nfneywrxvyjeg9sx9c51jpfs0d32yrd3frotir2g6zuqxdnjw4kkmhm7gb3z4gxkves9mzkc0tw8mwnk9zh2dbm7ub0ujlwmev3qocqlz4xybx3exvzab74mpm4e1z7x856v7ahb7u7ebs98id4pyj6y0nfoi2zk4yx4tbac1bvrf10iuuozk5qn2chz35drvc8y1xvnv6mzw53wuxgsubaw4tdw5fm1bjmtnpm9swb23f6w9mxdj4s1k63obs7uj6oclym17z1cqky34qs4tndyc74xnhdfmwwoa5y5kbgg1g16foo9o6jpsqn0mydyacu18cikla89x8vd09xbkbpfw27i9xblaedfgeau5sd7zf56jeg14cevj0w5vfyzq9ljodqtrfcjxuewck8cd8aec3kfs43dfsmj21suhm79bpzh95n7f5rex7apmmckvgdv8ancptktx6vqgnfh1j1j2yz9xhs47bbbjad536m6oij07ql18pcqcz7sfn09ab4y7ypi8q452odmhg1e558xju6hvvv117zjgzd324id0u4yawctrcrvt8jtr60cqdmjl50waqldbmqh4xnem8f4lzo07hvsi50yq8h4rde5ulrjnz2eegbmomcxhpcj4h3c8juh1rlxzsztm7rlmgeldlevjfni91axgh4t279t4x1qb3b0cfjazr2pnrjr5frxqf5qtpwfk97s1saymyhadk187zxugw75970bnqihp2etpq892b0pauoiz76zma9iftnhiyk1w8wiszvtdqe7igr1iydwfc6lt53g5wsj7fxon0gnmmc48n0kpy4i1ok8y5yhcsxpnq9y8wcgzk33arf68z1avkjm1kj9i7c1w6bv2'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : '8mpzkxse5ofj3b3m6otjkk4zivgikk9vgpe1tfaol5sppi4fxnfqurrc5633'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 4679743062
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '78chmmay578e6kyhm53qlfderc5rmtyaog3djvez0w3yzpvvt4sl9k74sbhexwa0qb9oxhs5trcx5h4ps7q1ycujr8tzi0gi47hp69uvhenc3f51y3i5o6ygd85jbuu5sd3ahbnn1w16debi4a9qy5vmcck2lrtu'
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
        example     : 'czni2oahkorw2387l3hir7rsjlv1fcpinz30xvoykd78b6oim71uf8tdumyv6thhw3ry1ov6tyzpm4364jyxx7jjw3c8x0fvonsz9y45nab6ktflcb7nspkf2jdja608674cx85fda9kcespsgsyolltkk3d35i4'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'r9zm4yu6zzjsas2t9dks'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'qz0ilzzx2dohfeztd14n'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-31 10:10:57'
    })
    lastChangedAt: string;
    
    
}
