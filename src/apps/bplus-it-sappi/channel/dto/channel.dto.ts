import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd47bacb0-494b-4d76-b008-ce74da0a0ace'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '62d866f3-920d-4623-b3d2-6221c5e15c1c'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'gu323fb1ppzzwaqovp3al17d3pfgcfl7cvabzmnh0o65c8lrq7'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'zll3lnvcip7hpj1hviid'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f321d9e3-df8e-4659-a1fc-a47234e36929'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'f5ekxl0rb1f535rf5xiskc80tl7xf6wytcs38231t7064b2lb3vwg569vl8ch68gyfces0wl4lxm70z0hzuazrkziy3iebj7u6u5cq25cgc8l5hmb7xl3jwixjzcv28vhmfz403tdk1m3gz63nnqqd6uhkxuo0eh'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'af3nhfaqxl2khhjoevklnceestjbl2wvn8aemhlihzo5cfb222s7duvnqddpo842gx0fzbv43ynjvq3bj7n2r5536s8vuj7q8kfixhyy4uimvtdr1q9ux8huzb64iydlywi0biwngyqwp28rd6t0j5244onhur91'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'asjdes0cll09y699a5jvhfsds7kylym1bmefqp32np7o7ixjgt96tvyjyail69wb5qshd2wecs8t9gf5jeuoi5o5murc67r36v57sm7kctrku0u3735s07m2r61h10hvq47qulx6qi8dvy41qyqwagsc22u0ecrl'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'c3e04e66-ab57-408d-a5a0-be80e24aba84'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '3isuvvao1r1ue85novrkn4s4vkx3oxm4jgk84t4kzp1i4rour6nowhzgg2iir2w68hz4lpa0yb5j4tp9y9fji5qtnf825k7k4wcz7ag7c4iq243qgs0xudeim4ucvjiqlicuw8rfalqpr89tz209jc5pq3zwgtfj'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '3l4pdoupfxaxovr289urcuvgz89rfrin2phd7nenxb040mansdyc57aq9sk56u68a77f8leeat94i6lnwmo54z17lwl8880li0wt872hxsh9glg4z3v5pid5256ot447jy1q1uhesok0wwulnzimawddv762ul4o'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '6ybbiqw0rwx8n63rt0vp516xmezqlr91qs8elreg81ls01xs5ts6gguddj96pizsprrd682c5c6d2lgl7j2zrgyltrqa94wzkn8sba3kvvhwl6ti48h12gd5sg2lztne77375g7dlpqgyssr9qqocut4fm03vuhr'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'mewy5cs0gadge3eqcob8gq1c8y3fcf0wkyqdwanqekyx27i89grrclqk5359rrdmmx7ped757isebur0kgfyoc9hoi57y3dtgnuwglv6e1afivwzp304cwa8dex9602iro7y468qioyitdtt1p70uxlfga7c3zz4'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '35myhroj9rfrsh7vnnkq5rzwsk564wibb0rwg9x7ai2e1ciexf3w84ugogd6'
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
        example     : 'chbssmn7d8lcdd6zd7llv5qr2he8yns5xzzscoavoc8k85zvw5q0pyfldy9z'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '8xoirsvo77gjd0xghxv1j9r0e3dedjvqrrpkm583hgmehvauv1g7dj99dqju'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '438c5xm0d9hf4l7pptdkah2dwwj4sggqxhrt7b5gws9rzeg6o7ibm17i8nrfn8vkchok1a533p7f2eln6s14tlqsbmyfj897dxn7ibs65bua4qxftcurk1sj15tox9n58ubav4n3x4gaaah48o7iy29xf21ij8as'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '8uy6drxlttinoe8r4clku7pscxar2dtnbsa804fq9v3hv6efdqp6kzinaim7gkjljuhjc2mh2f7qavvznyfsd7ppsa68mv4jneq117u53ox2iyngzzhe51j7pm3usxao0rsuyxmu7slwbvlj4kj5509pvl512xcxpeeuylsuh026r6y3hdknbwll8vgtyk7s4jdx8ha4ix3e0oxv1zolozaz5n80x9cyc6nclbcd4nwz6fgy2m85tzbl5n8oiwta30vnj5hhmpgqek7w570aqr1y1kfxdysbcpxmw6hst57n3cm2i3muzkmd0py4ayz8'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '264430zf7mi7onj8e4i5hz2nz0r3y6umtk9koxq353r98d2r7tg6sjlwi04a'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'x8asow9sm3wpqvokkqqx90lj6tr4wh6mlwx9uoc7q0o1twxmn0hghp9pfxvz9mwkgt11lbksjafa596ylas533beubcw5wq0ytweuyfjulprj9aa4f69js502hz9l5jjwshhzxo15482mkudgk835syhec8pb7z5'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 4384746622
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'zsblhetsd28oucgjp9jqzy3bcri72l3vfksqwunm2wlyt8yj4d66fqgpzxibu038nwsgspjw3opayrohwcdzc3pw3hs43d772du2b12lp8qdo0tdtxm94pzc7elk2kfrkbufc8vcr3j22tprt6wioq2nmguhjepi26rgbuyj24udzhvbbxkz5crrr5bqs6bww5e36978w3kmcz73nurpalo3ycamod3hzm0vnqbcr5kyc5c27mupe9w66rfycj39xnjsb28a6bper26l7n60dlx0ioxrbxnz42np1pdq9a27nrwwbixwjoedeezcuv5165vcy7cd2ta49ve7h9q7o72nkefbie6vt602nige9193dcolzxf125o9yd82o0wny4nre2040pgu87iblzd403iqaqf7gpnr0ne1ia8yozvb8da5f7gb6953u8l1v0xh5zmk5wnw1tvmnxj8yc5n1znvcg1b2i9mdntk0w5euf40g9o2cgndd9uh1bc4ox6f4d22u45m2ewcpig4360yo6l45st4iybyym1yj2n4yy4yk1mkaxcqgf6aja4y1004u2vj1cz8k8q5rasfs9s3wszdb7wvmvz1yzrr01pbpri6qw5lrgq735oc8pwlqtgonmme3yg4z94z9ef58cmikc1v1m1rumepuaht20ng7j7dyk5fwt41s4zf62k8s8fnlpvonhzc7u2of6zvk7j8taw2ruiz2snk9zl6ym8862a65tqa8uyr9cavka4ru9vtoxzp7xsp5djhheqreg7iex7ry11csisv2hsw5xg43rpkc4y79hb735ixl406h9fotsl78ipyp32nvbn8doyvi6ixz25030n7exzs1vagmm16mjythj62so0c5ovl931jkuqcaqth25lmmad6c63ci0egt0lqsddzqu2dsg8dpqmqa2wzmbpjmz6a6akzl56islzokb81wjkhkhtjjbqyytk9hr9k51hahvgv0jblirf6gwvl2dyokok1xry87it7'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'w6ybh3vvlgzruxz5xo0jgjrbgdf7sp8nf0m27t7hy5g9m96dhpm4upocjrctbvu88sl1e652kbjidxx4pzebmhxqmhlsqtoonfcpaxjpuu5q6ub6pzkeyxka6i6pedkmxtk4eifmcojx4jbfwvymaslu6tx5qltkwol5ywv99w5srdn2evfrga9f0n5fc2gk37z959qxv4vn6jg2pheqx7g74dettctm99kd2dxgbuico8ucd2i7tasm8gxkptc4qry1a2nm5dgc028d181lwyqyotm70bb3xa7fbfj8bkrjxzr2b3rcrnojorjfn68qubj21xy3gbksw8m50zidhhrr1y1j8fk2ea1jcn37vfjo409q7b90dmuzfkd1c5gk508v7vejv0dmuh3pwp312m8kzvqrzdutpkwyhzdnmdtwvdldsjoljqszk671srck2a59qjug0cpf19kzykdq7lwsbge1n8hu5ujq0n47rpcuu3qqqht2eekxbwa6engp6tj5bck7y0tycksbl9v7v4z0cpkvd8kgs1543e53jhalvvfyf92mqtgjzvk651947gjugvvx1mty9nivzylecy000f3el88l8q0321a44lj849yf67vzbzu5pvjgrzhbnsrngfersyzedyap7ojzppmgnj0xvymcj188eix3xt83db864wx3gjnkcqsrxqywvae1inhqp582z3d15vt1s7ja3cpze4b56ziyxbvo4dopp2da5mq4ovzfgy1v9bqtmlctdvt1sx55yfydkuekp3jim5b8vekgtcua3jpjd8w6pznhj6o3ec9kvfhp7fiwecf8oj6obvvrre83ft710ozghdp6qfkgc6u5oxao6241whpbrtzbdkibhhrn6nmgo2zo071xonq08zpi1bp63cgzlzlxzuoqx0y408jdc6x77sb76ykky4x6u8bqablzo5pmgjus50rvmlqmc0eei9qbawnkjq1pa87jlr7qghtqh8ajuyns6xvzm0gv4wb5'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'dil318a3q2fhuohzsk5m0xzo4nph2wwercqrfbu71i36sdnjg0k1h7lg8y05'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 5677434031
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'xq24r4srgrhmcp2hwe5k0hvmiulfnukvm7trq4kd5tpfnh9mdeiqkw78i2atosk5zb7z0cp78ucbxek4voe8qtsukzjrheyh4gja2g3mb9qg402u8poqeefxwwbqwxbt05p6xxqdzbuppzysjta46vb6in3bq4xi'
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
        example     : 'xmacii0uz3b8lmwb1ohkzgyku18i9pkk0wzn2324p9tb51306g0293hmxmbuktlesb1tbnjr3pr30ha8pp2mfr9o2my44s7vrnsi157o5yfsn294w3pbr1q5pa5sxafaqyj5ax2enuhzy7uihrwl5yucx23dmruy'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'hzq89nf8i9jpg1vahysu'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'r7lz98mxo5waft81cs4o'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 13:28:53'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-26 19:51:54'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 10:39:40'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-26 22:48:14'
    })
    deletedAt: string;
    
    
}
