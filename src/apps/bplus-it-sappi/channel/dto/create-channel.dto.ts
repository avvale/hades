import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a743f0a0-2563-40d1-ad73-013f75bcc8d4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'hf4n7gvnzbz7isytwr4k17bzl3ra11cydtuvt3nm63g89pqqc8'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7d54241d-8a03-4ada-8649-22a0a15c8839'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 's2m5aiiva62mca4r6ul4'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'm7x0ogc3m0ipmbmo5ag79jchhbsavkrgfiplwtfihu5us8fx1etr3ofgpnduajtkybetlluwprtj94tzeqlmzng6dsk3z4qqs0jb9agcsvealpqba5aoejg143qff4qmly77vygx0la6x7fjfdsbg9npd0qkew1e'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'ub8ql7wfl8zgmu4plzr30j6tn54suzdzwsoentv8n4c3nimw1yqu7asrx9of9mln1v7gaiwyeryv2bpn5l0uglwbkqftyf28ohzzkdkv5ua80x83y0t7nuivd4mui2oxxn3xekd46exevy18n7glfpom31w9nfv1'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'fcnbq35e3wny4j0ynx69jfn70m6zg07sdry79konfxozh6rr8mjo3py37tuhgxhdnktk0txo3okgn37pfq06b8b7wi40y1onsaoz71je5qztfvndichf2lgrsqe9dop5i63l80ivlj885thfw4789dg3ob3yat22'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'wgkf8y7eqm7ykelh4mux9ejtebr8qqwmukik5449ntnvbvma9xp6rodl23o1mbx61grbnv8r5bnjoz0dzowkwetr9q7c5wz01ha9vt9ff6h0s5ibzk8cqupzts4wwtnbeodspkmu7sfi2tggj8nj2bulv6r1voxu'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '5v12eqwv2blwc7747sup5lh4zshohmqfbu07ivgeymonmwfztuthth07ij8f4vjg4nxqw0pc8n6isad494o1uhy6ftsmjlnbf6kd3bhxlanbeles4idmnnbq3cbpb670doz6otnhjghefl3bqmcwue4fz0p59hu5'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '9m0kfjfz4rawiln9lg6hiv1nor1gzzw6wkbzg63nv0667hyqtgz6asdmk86xylnobecu84nj2h0kvyagelada8ddzwjg8f1r4gs9xsejo2jrjeaggkh1tiyiqx6ofkkfpwjzfel37nilm9kmd7ercspig8uiyxow'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '0nd4kxrx7wy6opaa6un0ndgkqmjg6m3c1w9hgxt9tnlb1j94dbalokpchxno5gzaw5n6zs3f8ytvg5hy52qlndv3es9npqao9jp9xrn4obq2v6xytnn8uux23ig369kzfde9w5p5871kkimm8250l0ugjapldny3'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'tumvb4t8yb5ec6490nd3'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'ilwl1koxtvrfsf2uhm4k2i1umcr3wh2tknt158t6cz3v8tnvig5m2poxwf4r'
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
        example     : '9756f7iw8fwwciodf25enf01e8n7h6gpmy7f1rnttr7fzjt29ll71bp21rvn'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'gz50upju9gwt7a6ndahl3lnaa8p3rljuqg05qti5o3ptlhhltfsvhgcvvbvr'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'oyadkdf64fuvfeca23pzzhx3wmj4qkwy7k7vcg6831uefsdy785fusxu0kzberj7ed66kxo4rgphwxiq9fhdqzvhb7j8ye4mb2gevsn7nizsvahygv9tz3yo01basthey6oobxzwcfz2cpaxzwiq8m6hkvjw6v4f'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'o25uga1hwneij56ef5w78wpgtll6ezn1h74t52a6dc2o5o0tuk35fhq49tbljwn20tkes5t2m3uo85gh7gav8oy8n0hn02ykxo65fyaybmva192mlmb9dbfxgyacphsd4bsc13tfop9hdlk3wu53bx6r73ts4e08ihr2zfumvvrtrs1w2nn79jnjl3bhf2pfnsvnjyc0axvk51x2vvyzt886nbct21yk4ggp8jyy1ty8x5btftk6e3gkfwrejxu81foaiy7v2lb7zm24q31jsyzlhjd9xokajdkjgug4j8d2z5ys9rtz6hsn69h19ug5'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'uep61nxlekurbj9bc1z8y0ocbt7gczbnviorz0wec0g4aowg5czobcm4n3vq'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'y16jyyxtqml81alc2avn9wib8cn6ph5xp1atjexi7pysfu0zt0ttkts20f4aka1ba2iaajv4nfzqu4jn71ate8pv5t6vzfcadiys2zb798fs6i132y7bo9aqs6rnhj9bmkcixw7z02yu31n4wugfymsmx8zea9uj'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 5356242265
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'nt587ffdg7504dcs6vu8zun51wb907kjz06mmx021ibhprk7a72qyvlxh15xrhvc529jd0mz627ukx0n64iam00oemo0319tbrho2x9eo8rvztprvv6dhga8vb8tgvsaljmugfqx2gnn4d01fec03qrvmjnyjeqhwc7y52iub36mpti583ywscgu9dvj0v281bd1xuod457mhabzi9vfgotje49gn70myj5ijrxtp353mxr3bwfpw2ts9zlpm2u20rgoyilv438zk5zaitel3g5opchz8zi4mlm868dopje769hw8t9wywbox88dgj533if8o8494doym2qjrfkrurnhxzi5k5bfpw7akxcuco3lgga1oo3v3ndv2d16bbsasd41xnmwfgooundoymhlm8amfrjzfdg4km6op3cxo968jhqr8t55b76ajt4y26drcu1fv8kg0cbr2epoiy9w036p6bludg4gyzqxpsthpybalj5g4m8domyfrnbyzot6v8h5bugk131irdymgl8y3bl1frsyh02t9fyknhv152xnl6jvjxrqpkldhvnbrw4l2g8vf0wge3huvwa49eqcm6xa9m767o0qwb30md3ppntdfz20rdao364d459hgc9cuvtn9f1w5nz3a38mfqwli6f6vzo6gte6yokk667skrdoyerh6ynxg84fdl2whjfvybf0h2k7vrfod3jickbams6rerdac6aesc6o5p2pudn19zkrfxjc0yh3fkk5g3wxpp2nj2hh2wqn06pzdjm5kky78v78ocayldj1ps6ace7fk7u7e7waj7zjkvrzdpjviasivydnj8xlh1kw8ca76djs109xehgnav1zgt60uzjo1f4f1ae1u2li582z10cfa3qljmrm6v139uggfvndv97wjd8j1ftt3cyfxkarux9zb1cd2mvt4bs1tyg5ubxxovinf2bab6hhpeqxkxgykmd6xn2rmp0vixnfakphlh3s3vltn4de58rc3x5r4s4k'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '1ubmwrj3v8ltrfrdynan2f4x98kdefg2foyo0b0a0vgmlkbdx8xwiiky6z0tvo7oyyzskegfzm1twh4pl4a5r8q1yf05i6n4ua9obnq20k0owmcnzcmvcvhvxi6hrgtabvfiyst2hjv4hbq0y742r3duu7gn5br4l67yl6r9fur5dzb4jjz62frndl38y583ecea08l9lutoe5bgyrigrm0qkt910f97qbjgz4kha4mr1tu5dyc1akqg5vwv0437mnltyfuagnu38qf9k2nil3k0kseocuyk6clgg791eihaa42ldtqsq70b1f0xthmpizwzmy01uygsu9d6843b264n2mppchtxyo0bbcoweykrc5hpwoaaewjr4mufw8z1r710ep2evwfpz05w0v089uw0ev3z17nezs5ec8qqtcvq0flcp4fzdykvumo72i130ps2y1q5i39dc9xejsunoddecemf9s6d0c92f1wz8mw0p24tbcss9cpho8qsv9mw3q1cj4hg89vz7238ocse8b33h586uaoyujn57owd2flkungh6g7af226o3ztz9np46kvbdc0q34555qkti87m8oaxlz5d436ruv3aly49vbxfdp62tit2eu1i47qqf08tbqxcj0rq9b94a4fqd1veo8wakf2huhfvmfup951ark48knf68w78uoolthcy6x9n5j8wrxu6a3f9ymvz4tds2jokk8cb1jrfhg7x7mptvp5j21giewjki10hd4mliq6ql8t4pjycmpzsx7bb26yi89yc1piz4bb9u03jm76yg0u20q4flhto48xj9tljaxddrpgysa2d6gqaumsj75ydspb2jqhlv60jzzv8cmszyxei6if3rmm5e6uv1w718swvjerzsqtjbtl4xorbyvz5sabkdw71qku42uclrptdqt9om9dxxr5970hdfqszdb8oleuap4c2j0sjjcp9negdygfsivkivheizbomhz9g5c1932jigg3kzmxwvztuwcu'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'z6slxeeyte1nyph2028so5flonj0dnbuzkfd2v5l4yag3sihhrzr55r5f843'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 7670539557
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'irejmpgqitl3y5fdf6rd480ywhb7xriu0feye1d64pb6ips18t7sp968j4q7ah3n1sfu0g5w0fltju9hfx1b1k0vukezrnypaae8sbckied2g6t1xpmu6i359mfcoomibshdhjplke2qhwrhlwl7t4zzvwb3qdnm'
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
        example     : 'f8y6bfbj95dkw9laxmp6l9q39uuza12fqi2vbbj1uy8ldzfjoc20cr3s8b66jk1ymcrqhwj8by6vngnakq9rro01n4pczwgrh8ebnx7lkmr922a882p60budlnbutu5tujqdumrmu5hqvxwoccc3az2frs7wmv3d'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '5yygjmhn6swehq0mtb7j'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '67osg755drlp6yp3ump5'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-28 00:55:04'
    })
    lastChangedAt: string;
    
    
}
