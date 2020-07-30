import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '998183e1-57ac-44f6-9d00-f33e013e79a2'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 't3flinqzem5xc9f3s7yarkx3yjpuwzx5svhem18a'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0b5f0f9c-66f5-46df-bfc7-10eacde76655'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '0i2nrgn4nhguu04xk30dx4r646dmnf8ctxo9wt5lmeh1gj1nme'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7c344791-dd35-4d43-8dac-5d18b8441767'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '2vlarmt514qgq9yt2dtk'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '8fj68dbua5zvsozb843cykpp2yhdyuzrypmznvm6j98qnhljt4w980ui49g0w8ym0rldbrsejjepjv1klf67iw0l60g0t70iyfpal7bxebclefltviv9ehqmq6n5qhgm66c5ywih8u2xbaf6n541w1b0etpmomf1'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'met8hvxxanduzar6l4x9angwmz913pzfyuw54pyqrdjz14ivk8k1j9vha30q16pa899yh0n1f94cn5askoo66y06x7fnkm16dg8m2k0y4j9wso3od98jus45041ln6txy6pgivh1n9ivs5d4iezufhncvbx2nvuh'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'bixvmarfpomf46hc2rb1g8ma5egxsg4kp2p8wt4jco5f7nep7i6bk8pi59faj03n8byz00h56ryetsb7g1liog5gqdd2zefbldc8016q3xolx86888sf1fz4245tlhk649joxb5s9k33lzt9c24wgd5d4y13hexp'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '7r0ihr8aul2w32zlrcklhow24otiw5iij7u69qcmzqy9hqkw3whkkal2af8rk48f1snt2we5tmoic8fd1dpsfh7j7y10e8qf0dr4zmj8ihi7j9masaoe2kj197n5rgwyz5432idw3v66zk2ncr8nr3kiiqzblaa3'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '6ckidwd1or0d1yg8zpznv236o3z7ywyoun04b2grntc07ckqn7oblpo4odfmrg33g44njmjl0znr3shwkutfkgf8bclc6359e4irbr2zjexutxceju3h3z1ownxfxfg5vegua33hgc2xtvae8lnvi6rbxvp9rt20'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'anw61916cmbsbmfb3g2pfqv69a7mutnevaxqkztqts2xlwy3k1hv32z4nv1vw0vr1njv86iys9fhvedpb7sxq2t15xc7q05wgynxnhv0jrk6xov7joesk8upktxdvtomca4506bksoo6jsvosi77gque9o2382pc'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'b9didp3xd8ft0yruddgi4425kzt6c2wxv9ji81xda1gp6r3ef49wktq3p86o7ogb4z0zucjn81zvnnn72pqutpo3bu3my4rwkkmxniux5u4cw58g7r3hh6pxux6s0hqopmhppvurukeg28aus55uq97qza91xhxc'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'xgtjyhbgfzxqp0kvjjat'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'x86zm037eqoppduj7s46rwyqooswxkdoelquxjoxnwxkaik1dgyft8xs9cx9'
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
        example     : 'bmt2e0epmga3mfbtgdwjx6ihgh4f743sqmqlx6pl2kqcneifz4nlzac4qwev'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'b5eggrffbwv5p48tntp8muln314d4y2oxmdx4ar4g3bswvxvmuc6lrp5y98m'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'czrc5rfqsh5yd7r01astycplntkp48a4pb77efxpmpsbuk69dagffgdhkcgsgdwr9zi6f1y2a4s2dpbrvfde9nkhpoew2rzkn6dunn2drz9sht9pqrkkbg6a7yajlpnej7l6uil0l418es1nl7wnyc6z7s7eirlo'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'dw01d57aj76zxfrc06wfnc6rdm781yubt3upforp67ri17m1jvex9sryl9k2xgpyh646k24kl428yxh6sgb9b77eip226gz35bujr8n4o76jqc1ndvsseht5r4hgyozs82qtz4tgvpcgitz8pq4cqb0rt9118uqd7wyztgszduh7punp78zrtrhdcbf347v1scmnvogr4qpwv6orpztloydtx1qfbjnx6yk7fagfrpsi2bdssy5jro7mhlro912ag8665q6lrarqvd2z2dlt7pfoggj99235m2p498o14k3zzdidypzysgio8gsbi1vd'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '9dej5qcck7cltdjgf1lffnkysfpyf64j0p40yjqis500uxwbeiyjvyqzsiae'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'hz8ci0ecl8bte439l7zzeyhlw09jqzsfps1eucgu722pknvgjromxai791szh3y1ux19hdcw68usj5b79js540xmlbtt2kdqplx7i7vlo61i942bit249rq3whx6zebkprhyn8uiehx23b7ki4o53bdg8lys8kw6'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 2241365737
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '610h0tpexv2eolu5aj7l459m50khqrwxl25ml4psxwg4ltykbqsdn7uu83j7cqbiand6ase7psq1x1qg7ki86bv6bic7jciejum3btkk1zjje116d967v72wdr2a1tjuqk9pjarywzsdepvixi3xrak9nepqv7ypheb86qphd3b0davcoe3qhlmhav8d8raj89hsge5iycufuiyoohxetpkjme6bpsrvil3bkj0akcryrgx0ejvauxztemkk5tqi5vc46y6q00d7fvjyamuw037k2ph3sw029uoo6bitnmlerj4xb2sn66fngcqw3pddech6191orvfwm9pzwzj7c5mkcfbidi7o4pmw1ulnts5rbxc1ylo37wm52nhhttsp89oaxsgdv2sfsx8kmbed1kqkzsoxw0legx06akwnq1lucxpatjmv587c666z0cnbdzs4vte2844z88vama41eksbyjqh2752d33jcyzdzgsai5oh2h5ie5pkt03fm9a2tiawa431h0r8c9k7ow6g255d7awxfxec1kqk4adqcmo3m6f0koi6aov0tg3xt0ynpi633mrtvs51gmgl9ws9z7njas75r068dmpn5w47b68afu4xaa12wqyky32benxtp0qteipgctlm914i052ge57uj3om3qaojbqdaf4mh3u5ant1ynyzymqak3ge7b8tly5tjk1qkknrx3f7waj27c8bz6y87kx20rkblr8yuuvkzcy874ygz10fri1j12swrskjhh7yo52dnq5pcywx3r9fb3pwschqddrucyk7mr6raxhappligkic1ymaddrl712c74mo4u7wf33t85cvghszge4iciyxcq3vy9k0ztn9cyq1nuu82lx29xe929ng4dzrw9gh7wd6rqgvtvrk4kd7wumo2v97qriyiq9lwyrm27x2zwqbjxbbl98xrwhpdh2jsn1sf2afbbk48xo4h7lc80tgxcj9hx9nt42ft6meb8795cx13bsc7hmj8yvc'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'o9fmjoify2aw8v1zcd8ov6cjwe9kdsm4n4rm1i8m09i732y4yzdjpqnr0koalls52a00wh6u4xuwgvf4otg39m80eqzthogdgmp7h1fyyor6yub4p95ksuq21yyhk8k1w57rgt6zm9y9r2bubigbnxcnoeez83wvzi7wwyr2d8g49krqzbg8g7fna8e9u60gyd0qmgvkl0kv5mpum4vr30xe2ibyx2ddi93rt0dovwkgc80swq9yuure1h4hu2bwgjema84se4y2hli2hhlbtkvhavlflyf4xxfd0yx4npzfbq18qa8yivgd84n8oww422gvgcmrah1e0ksu8hd1owsqzi170wq4rtsic65zqix546emb0zpmykfeqbyyhvy6ndw8bn05kfsj97th1q3m0yvrlby76rgteuza64ni9i0moxutctuku73ddljjv5ujgobotd3cjg9k9q4fl7t8h1i51l3po560792qou7i9qwokome7rmqawui5m697jjsf715oxbygvck7tei396nrrajmnhqyqdqvctdtqfz6h924fzn74zs1k5s239vun01aixd72u1e5qik45ue33h979ilnkxr0vnx0b3n8wgga6nh0uujdami56sp15pxztwi1vn32pl2atlcpejmxzt3zsnjx2emvyte6symrjsmkzdu0183lil4pctkvbo6b7uaup1yhboau66iazsakerad9rfoxt9hjrey8fi5lxojgaqf5ujjr52e40sutrmhw9jx881556vgne4rmhmfq0hn33qohcq7f1xddk5nbaef760ts1whgab2ngp751ycmom4adgpu3daymvb7sxgcdla4eout6z2fjb866qcx93gspyaeyoiwaa5wjzzbywvqzm74i5rq929vc42po4gj7hpcjep65ziukzxt31u2yj9u1gq2tamv37oyic4h7hufpqcdk60aih8wx82k49cbg32mneue0jt6td9axye31gh649f7h91txhingutok4ho'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'fsj5kyklp9dn3xnwv7s3938czgvgy2ih70rtfqqatssjs8z54vd6wjbgh3ku'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 4784875145
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'd3bpo0prmfsyx3cz8f5d9s4u68p030pqoiogqr9t0to7c1c2rsr6glccfprhl7hh5b3potldk0hxure301pwxk3sni9874hte2ddyki93jqvqsbwtk76wotwj8eh6gndih147uefkvshtks60g99wihc3vp2jp43'
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
        example     : 'bypjdejj4orhmqpo086o9rw80ptzxloo7iqk6w6sgwt7ldsgb0v5p9lspejpl1rx4qiu9uug4aypdiv824ltudwzwrf1xbd7jb4b08j4dgjie7z70qs2tullo7btt3egne90084d8mfevd3ceo8gm9xzqjyq3h9b'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'qxt64jsxpbl08pep34mv'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '2ig4a9pc297uhqnp1dgg'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 18:22:22'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 14:47:04'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 18:00:20'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 05:53:55'
    })
    deletedAt: string;
    
    
}
