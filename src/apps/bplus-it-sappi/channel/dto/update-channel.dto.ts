import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'qjzwjavhk0owawansedf800bjtzh4jxxjukn5hjl'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '0xxkgi98iryhudo8ydoqs3lr3zhj5fnt7jvrp100z0kn515zkz'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'rfjws9u7szmvklcnql9n'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '6yc2to531w13r5rg7wijh9q18szz3nd16n35w4uclta50hulyat2lyrkzqusjw0lg35fvf4fi13q2pi8i8o6svktlvqtvp91l8yrph5ieh5q8f5c4gmlue0snthv84z31vvhvwux31xc0vy60uf1cwn7pz20ow3e'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'q8b3e1tfhqm6ol11rj7hfvymwzyf6gbtvao2hseaqrnczc3lbzzng7vzkb8qfwnjddckaz2pc0nzxfomjvac4yoy72z1g84dsn3r3ofyc7061o3t8xpkf7is050as9fimfqcv77n0ym8dhbeiloe6dmn5d2aplqj'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'qf882q2c53lyttzcwv7dbx4mlrcz2maphybq8bakuijayh37e4hs29md8gf07wgm2psv1b4gyxmpsvevvdv9ledx6dqwj9d2soxgylncr0wms5g2l1r9s34lsctwp3n8pwrwzr4k3pfu6bcjchcduien4hf93wcn'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'e942c835-0278-46bf-ae64-6a56cd0de3c0'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'gve3vcxlg80w8x12g2mu0a4t1i7xs4saanbzgcnu972daj9p28wtwibwk4nkq432w0xpo2ljlz6xg91ibii08iahqu9euronim850szo0gxk6dp28fim4l168hefnxcicsneptljurejf8rq8u6pa6tperwtwnsv'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'u92anbt2iwtw4wegandhh3akqajwc79dv191j2ksspyrqr5a5mbj0ng2aw9qugauqrummkklm5fe4tdng7hwb9nwksh3ztfmimsyy5g1shmp36dytut8nfz283ao7zjyqh6ptzkykydncav8fr4lix3mgjt0of3y'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'okarrm5swvv4mrhzornp7tuja4v40j237twz0nwmxdgbsq6xmp8ztngtl3zplfrou636m8i2xdanu5sy7qn5wouciyz2h8au8zjjk3ldepqpndxaivndr57s302lwu42fhnh36k2rmhf2b3pzj9zw7atu03o0zi7'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '5q30irxaxcsp2pwl521fs3dw5aihamxpd4qnel3flgw1wyvylkn2qs5mak5p7xb21lcb5zvfh13gh492ye1zoja0vfisu3681ng2jrqxlmm7xzoeuusu97ro4jpxxc87lan2j5d4gsu8quphha4u3w1km7ia2hvr'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '6kv1k2i704flqkgazvrs'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'jevrrh04p3iwhjb5kszm49dw7g208xzo7j0bi0diafo3j3nvob03smvzfg7j'
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
        example     : 'vkgdvpr5r364apryi3nin66dg289q7e5v1z0ofyy67treykz4cuileqepb2i'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'ey5rnn93ypwp40f8w76wrv5gp55db7i501perovfuu378rduji31v54x5d17'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '5o3rrzf4mdfbm7tm1bn6f9fgjblm4tr6vt6r5qc2o4kgkvqshtwe42wj9rfj0wsjsn8t84nx5kgqlsc0kqn9f6hr1tvx429d0ld1m5nvznrsi7t6mx9phmrdrlk5f1860ywrr51d0v4pi7tv7vec381051nocjkr'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'nkdaz8vs95j6dhhj6aoy5e96lzkkjx0gre9u7kui0fcg7ue0zm6685rakc1dng6w4aj19v73rsqzillc3qqgn4q8auczs11vu5gkux26qvg86vhfs84dqcbwzkvqx4zf9k1urwfywllfg0y03y7bfxb3cghmuj3yua1v8vmllu1ignb429k87zdy42e0ta7346zeny5j6c2rjo3ba6y5e2tou1da80zqwez2xnyf8e3gntjjmyerlqb3pyer8t0mcvp92naham405s8n6wkm2obw2dd4u9zaf9x1khg77kuicr32zl8ookcs7w6y4mua'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '67dc2z3kns0olhlqo745zgu1uglzv28nltu2zmqfmcq04uco84g5335bu34k'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'r8atxdi3cmn1ginpwgdakpuq8l7edujy78hh229yp8sktl5zvcongvevazzzwrl64yne9d4vslu9xox1t385swqavsjpllpgam5zq5fzhdn327x82s5fgvtl98nwnqmtfjhek0dj079q2362f7mew64pq7wsiwbv'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 7064855296
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '887vz7owa8ounsc7hyu0f11p0fsn2z2ry7m6pmcq7w2g01qkm907khlwj7kh972nizzt56uerru1asmg8kkgeb445njnmgy7zatqe6b8u0mofer8ypvcj0v5qtnsr9o0xv0iokgb894692l3klj5ypzw4m923zkqcyd73ecvkpmuwzltbh8d7q46sdjhhskxnbwm4ekzn5npedjwzr6rqvyzbaglaenwal2po6ds7n4nf3w33lapemqonnxsrpg9h68grffmjmxjnzo2uymq5aky9c19ea9mrradd4fxlciopktdxjxde9a5s80yoytvfin01zibkvh5xqat4rq1nxo3f4fc8c5sidgjxjmn2wbc9w9fzvantp24emha3se4rwf00mmtqdfxrp7o9tays31pcpa0ia577o6vcrru5cp7x40ppxdv6efe3tupgygmsk85lue0x05aabsv0v22if45woby9qwzb2r0ej94a3cem99a8v5hz7txhpqpioked21k3ebcd7cvbzubb0d9x03232fv8uyh5hzl7qurgemz44fzm3mekoih87gy70upkd82q032caxoaolgq7ljutojet5x8h4b667xogla1bf5g0otkmy0ynmsv1bo6sbs1osmcoc8ggb2s1ydgir5hb63dcu59jjqywljkrtk2oaju9od1pognwlqsfxrk20m7mdig6qyewgt2nxd92honpldo2wrhdn87wu45g3z7x6orhgylhuc1lhd6zy5cgeeqw5gbza95vsu1xxorzlflkn2w7vn4yfda7olr0ei26ohdl0wsrcv5q2j4lv8yqv1ug8wsd9g353rfdcoxpbkam2a0i6g49cmvh4oqu7e2mxuex42zee1u33a5pdjpgpu0hghdczxvlqvlaruxdwelcmfuzzs7u5ofwejxdlrek8i1js2pcshweg13zlnvdk8zga2e8f0uqoddqy1fe6r64io4isqr2frnlqdgjpjiy23iwuxga7mafcy1h87mt5y'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'qlcli3e4i6nv4hxugltfvvbdwmw681qbyou6yg7w3oy2n27thcii9slsmkrk6jtp5767rc1kknumrw9qb0ow5ts0x4ohb07h8nlqi9ydl4zxelanzc5f75agc29uwn5vtgkcjr0cfzjbx8g0t5iuy7d58m8p58q7c1i68g1qksjhgeenupm6cruvara7izdqb385opta27b236tgtzh0sabtelu2cs9h01oc9rv427ghjfjt4t4vtf5xxjuakb5zymca1pvjnrq94bhd0q1f4vux3la2qyt7fbnvkithl6v4hnjtnsoptn7cw3fhzdr5ul8sley1wf67vlwq64e0q771yyn9l1eai5rvl7frgt8jtslku676vzixkcvcocolh41fqhbngs56irqcio65csr0kj33yw8l72ubqykv7y3lp4eridj39nalweo2ljh592m6p90lm4jw7c5ir7l6wv2ckou7hsjb3nx8efna3sc1d9drubjvv9q4he9odg8hgtqrff3dsx291qt7rapyzbsspn255mfmv30hvef2y6nqr9c26uwzdxxpp8rzfirdnl7kau24w0vlz8pxcwyt5pv3n5m9aj5dca9bhfw87xr2egsww7qv0ohikfdrcdmmlqynjtri1j15dhhksxnsfjkwj1qxtm8iltyd0pge83beta5lymwm91bp02ynubdk886naa8trpr3p7vrt50vezg25u1f9i52dbx4wlkkiib1l2lxg9znyxtzoxkbszv0op1jo1xo314rwc7pb6a77vtzgt2uykodu2hhefffe679d950bv1s6vmfdc6ypengwkhug8ssyznsc9c9vlzflakbq4nidmy0xw1wvdidl2yw908grnglqps8lzc2c1oqlpr1yru4ns4z22cm98gpvjaahf6t40jwxf9zoaens7wmh9acg711ucisrxhxbzc587q284z2ct4ifkwx1j44gkk8p49ud3q2mefatjaftdlct4ljqsgpjw1zqgebbbv8'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'x1k8vvbyu39aby11s7crfx5bltx1bt91bq9ouao5m6c3up9v4rupim06lgko'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 9540717758
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'pqrpukiy9n0c2xe64mvvcyo2dhpxzy9jld6genn5aqzodlqgsk5jwt1psk6cws4bp1odnosj75srapqxj5aajvvqsj5tftrlw8036rgfps8quvq2gxgrkrwxy10ip3jk5vt4o1qu5klgnejr7z3i32p2xn1pxxpa'
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
        example     : 'aft1ghk0k1cg66ieyo4f5wqxxgcd4mn5ncn7bpzzslgupu1hiseni8gtvlvurgsova1i0ixvnm6p5p0v6zzy8vhtl8tnp3wachm4pqka07r4poq9ast54o492rmffpa6by79ig3dqzzrcz7euuh43acujikn81yk'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '568xzq4ye7a86sobpowy'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '34xue5j4ig6p1e61rjbs'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-31 06:31:19'
    })
    lastChangedAt: string;
    
    
}
