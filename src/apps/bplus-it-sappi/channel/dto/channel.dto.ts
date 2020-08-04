import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '82fd1860-d84e-481f-88fe-0f047985f5d4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'ezvvc2991ze3h82tjaeo8lt0ove43hr57sdcoydx'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3ccf397e-23f4-469c-846b-5ea87b4cf089'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'vyw09kyuh2chkhguu5e4ty4bsd6n4i2tk55f1z9xwlwkh9zn4i'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '2494b540-d8d3-4767-9202-8197a494f31b'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'hxxbn7epobk2nbndihjw'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '5b6p6d0uygrxt3s17ec21zgllf7svhz6e6ayoqbj39p6tm6e45hymw36rh2rw64kqyuxyn6r03s8h8xx5r70sxjakx14u1d99nw19zoyi4fydmytg94rjwewxangoz7elgj5ro6pliihn5ker0u4ic3vguor3mw8'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'xgnl1fez559fxq3q97c09g785fvn4c7foeb8tpih62995z56dfwo6r6wpyqr732p2jmlk4uoof3g69biv1nixa221a5e2uj09p1a88dh97wpvgo5527twia21zquekh0xfa5ee57rgemyde0lks7f0z4ch5df49x'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'b63y6i20p34zlteivznmxcnobsb677zmvpu3bede1r72ccgjfk6bsghlzqe30rqxxcs9f208tsfvvpw5cm3o7sz9gke8hv82mtp3mvx4no24ksig0nkmwm4vt5lmivbfgvbx1y3n8fphxazdxqdgtkdg6hy0htzk'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'mkbtutlh5ggd6vq7dir0vpka8tqtgoko67n7bjms'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'yiqfy6yniq7lcy0b8x7grymo9go2sz3e4bbam6pkworgsmurp46tkhfuzqqxoglfeklh5wxsn8bn7ib29ytyj8k495gegha2z593p5nvcsglswi7qx7aoh6h4eb5z45bq9o60k5dvkn6fzuq6h7y2kw1hj9e9qj3'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'fksds9tktbyep3fbuxgb8nml3xql7b9poi6ieq8md2v2cqv11qvwnkxp0z6geez66d4wz4s5rv3navtatezmk99ao7xtq6dkz96gcpllt05w0naefwsin9kfw2rwlijt6cu5p0d7k3myvz8wjr7crcw4xffb0s9u'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'gw6nme2ez4k19ggz6bl19lhd37tz4zpey6u2xgcnln68x4deuryf84c3yo4sucs28df0ffyl62nysj9z7v9i6x5ezskdyxwh893n32knwgsmqif7ur258q7ffokoehro45pnqofamlfqjfxz1dnf027zziqzhw8a'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'y5qpo6kf9j1ov0zpeerh3u3zgg40x9442lsdtzx3vungjvm4ugy0iu9dolykh3xeajgpcl9pb86mdz4hphc5ixudpfsrn0u932vab73ly00y3hf1ml4f4h2p73g9g18e663vve62m2d9ekhvjpraenfmsy8b5gpq'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '2fix3q3ea1kczj4gwer2'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'lco290tau3439qg5h2rvqt2ppxp4zwrjg8mdgzv6hyz7vh17y2tj833m5ski'
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
        example     : 'b0hr3y2r0w4uartxoy24ychw55beln4smomnp34ogcfudemeoxu9ewwi2wv2'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'crs8w8714a7ug1ujed8rvdrxan1te991eqmzh1ivogh14qrtiyx6jhnr3p5f'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'tgh52qeu85j5xp7yxmscawtbwvi40sb1yxgvw9jec2i3oj7pindwx6qyau0gddqip0p11cliywzgxjd92zu1z9yeyfxzy2dly2dlbrwcd6eophr2qbb02cz8jfizg4l4275ecv0x6gbggpxgshww5xbd1jn9g0cc'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'rru1gq7li4e1i585w081iokvz6ifniqbfv6ypke3a8knmyp3b0i4iyx5xcf7ba1fnoh1luar30igj3gc29ikry6lbyw9pl4hz1egsm4eep5dxwpvgld5d3p6n9sewik8900sb8djetjrjchx1ud27nln2wveqw0v9mrba8wtzfeu5vbp5px6wpatidicgibk4zjsxwjw3cu6rsg7wsr1941v1wdcgim6uwn00jzrvk1kxbew2w4w5spvgxzp5np1k46yrstr3t0h5kkofuo8ek6j5q4tpddrgyb9yi0mmr89uz31hkm0mvoutpqtm5dm'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'vqx51ujelx80h4dgddfogwq1l0tgfs2sblo2i66o6zqfw43iziwpffr972n5'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '2bn0z19d3xwt7kzosyezunp5x7yks3oxwi2325q6b5glfiztd3sohj6k6d8wz0es99vbtqxa0mlbv1wl52dd4av41erdm3dnt1ic6brx4lut7y1tbnp6uxyqkmiho7oj0gyzo6w9lk7w2rwiuaum0swn32pliuf2'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 7366182519
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'r1vwh5r8kzes2mbxsyor2pwxaacsiq5zz2an7xcdqe53le9nwog87a1xeeum3gbb9nyfo9liv4qhq3aqujnfeq3mda5xiqyr86effrob3wddc8vbz4vk2p4ljuxz2jruoc6jmkuta4uo6e94alxuhp26b5fg0hryirnue2frxozfjlv7zfg2kujn73lofyprbb51n8z6nrkaopd5qx3pgfi245gev1pw2xnly74dthm464or10ozghajan2695bfezr860oyl44upkgntnjnc67g6ew7j5lvy5gvebjg5y2rdzn773g12qrhps4gwo8v0n4z59cf52kdaybz85x991mojldoebm3zkjmb5abfvi99hfhk8nhbd50hak9lsfp3jb5wsdjdd2m3wh596g8ki6bblhirbn5zg87s4be0c04dbooeenhhlpwngj7dv99pdq3skl9fx03zqrqf3qwogij3xec4lyejhzo1jnhv3nuofrfkfvoolux9r02pwwd2p15ladylfyvj1lpk8d79oqju887hinjxo9uv1edys2dcdoa4o5rurwjq21r462srhru0stmetoaxuxdbpg9pevzcmi798ruj6fjgeadifl7fg1i42ymn8bpv4yhfm88utt8zh5y3fcy8uoi8f631v4t6wy5kdhomjhmdfuck2i1gl7r1z193iknkm4rso8lqlos88olsthjrkougszi1buo0h83nvnfyr1ukheho6qkk3ouoski5fjvqfjgsxe892god9oozx3i7dx443bz3aq9op1mz6361jxjnqkr4ijnim57pvzwavzydocd298rwnz72gs281nvym52suby0q7ib0ly01euu6nl2okpv4wxr19sre5qjhj749m3lxbgg8anqi5ms74bek3fn264k77ceaw2jcxd66mrtwz7v0smuat21t2n2gtpajmvwfbbj7r4mb8xlkdpa29wz9np370z54z0axhvhgunamp02aw21y0v1msurm0216m2f138'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'nj3jpy118im8hzgs3uju3flcelwi7s3t8asdcimdw52wouc8r26x821s60rlw05hwyfbww0psgocse8pqdsyza7wjqiya8r7xlwx49lff3v759b3k8aux39dhcv5cxsbgzoj83ui6x6rv8f7donbpvm7lh0h8dz7zio8zaoznbl0t6dycf8chdbuglp67z0fgwxwiztcwtso7pnd8i32mzjyar3mij00vh3wkjhhe7gk3nvn9x3kgpu9d0gq01uzjhx6utg28zte6tmz33jbww20q9w8psbu0218h33h5801f6dfhofe7f302pouv7aqebd4v1469cy2ax1lej8yav411849ige54qiqlg57jl51r1s2mzikqa246kgfygl3zeukuae0cck8b55mai32st80p99rdg03kbeqndz5t6bccts7ybup4lbr5ytwkrzl2uvwqyoxvyjxk17yz1o4hn13p7y0057su3ga88tst43exuyjtl10itj2m6wg0u6vrxj8sx2ta6b0708r9dpp7mdlen3cawfoaoqm8ihr2675pj555yy3amwpoo530n1887fonqtok81z8xpnktps815rgw3tofmep9uiom2x4np049nq825rh8nc5lzc3twpwhyye2hqpqunxb8tdknsheoyxku6ud96rczcs8frdbxbnqrfsugrzu2r2c9he6tqxhr7prmns5ac8qirssdlj2lzsyhwji65j3d7smjdxhsv679vul2j0e152ga5wdf7vgifmm1wki9uexx70tt0kjsy5e7wp834b6lrk6ah9b15qigfksyjp39tftght1q25cx66kqbdhjhas4n31z1dok4km779pjvcuh2k6mjodd7ee9w36ilfd65w18ixtyy2d1a9wzjk3x65o6mk8216ffi62zmfauqkf0rvjmkowy3qbeeol0n3tud8hmij8ahlugxufw9ky9avn47whuh4qlrqbobxew0dh7pmwdcfukrtwwy9ek2o3pl4v56rxer'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'uyg8al1dcp4003ta63dfceikfqcdt7i7hadpghsjanuu9n7dod6skb3w3s6d'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 3054723770
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'q37hoxojwzt2nlz2bbkipumacwwuphth3h7trzfk8mh0z5yvx6fmfqi74vytdlrpn5fx4hqzvzrgz4mqm933s9ijbqqdwqim3az9sc977wbvou6zo13s9qmdtxkkk6gj1ye03iq94kvbukahh9qqzfwj97qv9bys'
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
        example     : 'q37ctqaalp7utgy1f4njqbidqlq2a8en711lmgx1p2ex0q0ezx1xsnozdklivi2j4aoyu0ez7mu4osmi549cj5xpo8ag0lbm4p0zi1ldv8aenaq22pka0bvxcon3xbutt36ut1pzerrplqqppocu5extpdb2ia7x'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'rmhkkfcbt9vn6ssusccj'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'tbqgn641g9ejvzy0kcyx'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-04 01:29:36'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-04 03:30:33'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 18:33:30'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 20:58:13'
    })
    deletedAt: string;
    
    
}
