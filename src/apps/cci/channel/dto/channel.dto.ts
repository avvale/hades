import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '65b01198-a4ca-491e-805c-9f3080dc8d28'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'g5g0dzg16hh04vv4maxlbvam1dpi4obzika90ov6'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '613574f8-e566-4132-8abe-583acd7f1736'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'd2j58a55akcybxt851xlwqzjg7wgwy5bp62bp8vqaa9o9awna3'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3fdee952-b453-43c2-9657-da6214583579'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '29xr2jgwxzz2qdfuuviy'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'vo9l1aecltiz3dbjt8fb2b83zi2xfxw5c43qupxed3soyhhg4rgdnkxhy4q8dgzhz9xa8tuy6lun1758l7n204dnowny4nu85m3h74v2319j0023fyqdl421xybpdkfvowk80e9oykdhmt3nwmmf6kn96j1jxyom'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '4men18nd2cwtmjhs8iphejl3vyetxf7wrwotp6w7mdvfom17zpfx8hq67wl3dqkfq33b7w7ypwpi781vgk4mw2mzcsoyt27btdxr42uublnyhx91piz0k8kbpldg3a3h4ha3s7j3jwzf8y8gpy1y5heqcben31bp'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'n8qnbff5bdhpbno7agfm74t7xjbffp8wsm3pltntpk7zo1b8z26ugk0bcgy3r7ttcwo1f6ja0ktvd17a797liho1brtxcp8fx1gv4p2ahpvws599ybrwepmvdj949oft46d83xkge7kd4em5xdr6eme2to0wrln5'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'k7356m5s0eqfhhppoxtpoimxrsswr60lgyhv6wci'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'x1gukc12m9yepot291htvgpg6na0wzy857ruwy6owtp9hgev239fl3de01fs5wbojxrmk293vbde8tg6bbu6rywt4pwz7kymc5t9x4d6pn6fv0f5l05h9alkzx9pkxs9kh1qj9gnowu4f8vaj4wculhxwrj02xet'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : '8hhvetkr5z05kx8xf6ucr3hmgmy2nd7vacmhm2gx4wi5ctjuvbqfcqzskapr2k62gsvi9z98vqfhwbdvk5gj0v38dpricimzmezshbjrnrhnea6gtjeoy845b5qegdwjyt2i51crz19etn9ux2nd9qfmc61r4ba9'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'jyiaf83yg8xqeifpcyh4v6ngbh4fh5hoxy75sz7zdlb17ujfntac3w6huxqailuz7x44z0p2h5ftvpt4y54npgl7tnjvnyl0l73e25khb8dub8uhqj67hwyqvm9bfcammuwqh3ltwhwymovz78bgl1hhqboqrr56'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : '3195ksdpoygtntc3m01a7b1ekcjfsh81mlgt7ql30o5oloisagc5ptti6jjrck2xsi1b74k0qsulbxzura10tz4m8anap4qkqmbxmcma85n6e48dxoogayogc2ru9zcm866w650cmm4b4c1vugy94otnwfucbm8x'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'jucpfkb2ef0xoegl79x1i5gh3mlf02y06jn4ytdb2kwvk0rbazvk4yfo9nxpei67zc2o2lqa75reeqeuztqjc54z8nq2pxsqg7oq6ctk89mgqrbjd5ykez7q908gtael5wimfusna9a7w5vf5gx2bxljyqxtsskm'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'gqe5oaqyyjgxcxilwnbg4rwnevt4epecgikn0mnw3thkumlr49hdtif7nx4lwpydcq6atnkl3p1dgwl6rxbfvphpjr983t3zdkxvyvqyrs26n8sb1a9x1pxufe5im3ks334imxyo63zlw3l6vsrw9ucfncapiqs5'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'di98kbgn70o3vuyxa03a'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '4dzy26o5fz0w4v0e0gjf4hi2wgi86vfse7zhh7bmlrbapv64qvwxif7dud2c'
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
        example     : '4w1xqwp2wwgaapzbmwm6iuaomuf30rr6lja4f1512op2u5ilv0r7l51acajr'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '9vyzwoeea1s5pzacoizc9cr3x3om9m10khhtqagxpqn7fh13nhx20xleu4cr'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'x4wzf5pllbgrjbo4m311f6e4d6f1wpszea17geapnttw4tz11rjqp61pihhzgnnq2ciin0opnxfs4fpdgpessng2j4i1dqijztiwfrhwruwixmoyj8b4yq9m3pci2v5rpo1nxaj976eni33jtfj7sg8jc70hqur9'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'xqzahi6s5r26p0yjbyiyfyqaq2nhyvqzcof0csnp8lqbkk56dkiumahrh75p6akqi54d9v89xbmrjg3tj3uk1xgoof91fgagvl9z7glrea4e2wdbwz18ocfwzdxsziag6xd6a454ymcl1c7yc8tzchzmbxkb5m78vy57ozm8deytpg1f34kso2dy5yu7m2ans25c2b0ihjlsik1i0xqoxz9anvr6l6s8wefubmbpnqqzfli3jd1xlbmhcpb119z7lpvz9ffexzd124tfwfjyt0xdi4duxyojf7w4cyxu5ovgppzfa2q6ssqz53dt5q8g'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'qmeydrogn0synb0nryxnqe2v4cnotti2cyiu01gsjtip9nbrmq4pkm05iu7y'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'nbu0m1iomwjki4vtejhgyzhnso7qxh7n3u7s7w4536sfb0ta9may9t5ywls2vms2w6m8nzvi25p69emkqt2hve52z6rmkqrpbm9wjq8m0jjqggyqfcrcjskewulkpr8fr63rsv95jsuv482ecychegurr2485xlh'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 6281375231
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'tt684k1xaxuphqsjqwh0jq2or3p9p0brxnvbx17327ae30gvbm6fog14moyz5jhlgjeyk3ai7iilrsc9qcrjoosycjo6nqt7p42ysdo007m5ndaodt78icr053b97vxsltvpn2yb5lyvr7m8m2dtugii107id8v6mfo37tvrncctktjqa42fiqc3nl1q74ncv17wb333xbaylsdgqfmp2lyuhl6w4oxcmnlknfsbua57ll2xmceiclr7w4oeo79zwv2z9pr3y47mith32k963lejgedh1xlxvfvs8ho5ow4vslodcgt38guql7vvfkfj8gbwcayrjydw69uj4nq7mgc22x8j6leqt3s40dom7zqjvooaim4ulgacu98cpfhc20ug5uv44l1z83fubgcg9cu6avz0g5bbh2us08gl5di23eexaw8aqwkgbnyl3z5671ulh6dr6a6pidkp2b6bocaq2jurona34ins58d5awvlwt5hcp2bujyfx6c4y4wcodrf0wqtwlzefweb86cpdwgus0fprbcnyqtajl4z3oiymg1b0ty52epreaucbibgb4c4d8zv5m00j5lmw2oc2exptddyn1wrutpny3xjb9wymmfy254ktkwektrnog1c22xly14i8ar9cbqf6azvsu2zxyo8x0bqd38xs4fynkwl1yixj30gc2hv37hc23on8q3axolu9sburincsho51113h814y381phbq0jjf6nofkwj57iyc42hgankz43llqw2e84q8kaco04qlni6fwm5kat8d69oh8fx9o9vwoyi8782w9cgii06nt2r5z1nli7qrj1nalbyj6w0rdpj5lfn5foxwq2rbh586zb269y463l0h388shgiyv9icrc79900chzvf0bpj473t0e0b2wacve2h9kf4pi2uxsh7gsks3hapkiu1xkk0h1ryfq6m8noj8nebwae6ooail268amr2m2zkve7ceqmaiexifdvq919uwqaavx0ycvz2kozy'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'dmat2sb8ak6911ubpqppj5nixwnm66470zpj8vqx1zlz3vnbm6xpvmtl9oxkemo4mrxhhu74s7tjb95776x4vosvwyasq3y3pg3akj3eaimnugpr36jlpfkgv81a2hltgnhzdboogt43vo54beqc6tfnwly6fmw3ijj6uv2x33wwpkcogrkpszs509h6b099gtbeia9mva3tdfvdf3kfca34w3ojo1qxcvypdueum7mle8lutwjqgcmw8s906ovpk76apng6eiiw7ianqawc9iv0g8v68ozblsbxkgugpf5je4lrfsjk3qnntn83ql51v276c8e2tr5h90hcrnpow8ve9p7rf24u39x22gcfjpfyihrvma39s5idq36s457y915kma7t5ru9o8bbvh32wq7xn35dfwwtnhk4x4frwstqvistavffn53f9817ilyeclpwmumpmr141wey0j7wnru5k8njqn366lvzbk8r5l4j06151uo0rh9iipyt9sohl80qiy2ka4hxdjherldjo9kbklr1j7rv0f488zj6xl4b9bi46cj7g42m0onbmzv5ew4m4py4cb06qtm0j8l4xwpvorwpujghf5edw5a4qz66hbwbuwgx8i6vcbst19b7hkmsyzlzh0h62lhz4l9xhk2rzazbph1kxwuljaxgwyzk2zomojbfn0w9729d2z5pe74k6x9mwos9z06ye89v83utb5hpdq6oxwqyw0bmtbpix6l4ha7iwcmut4flufw502pwu41z8rcv1qxwn3hw7s4xpnnpey32clelx324bfhuy170c3qi9zk82l13n8almr1hymnbwbsq9d90ps86y95kjzfds9n3favvx4bnvwfq3wfq72nbcujr5yr72fs2zu7ox335lvdef16o9abupjv2y4aedafm0zycz9ksy6jk86zskj4kwgc32f32xvpk20700y861c0rcum6g5opk2cs1h3y1k69nll02fhd4a5mkkeay2akedou95s9f5wr'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : '49t391eqgrr1wwivhoerptstxi6gevlcie49r6fhm40u8xzuez2zrsm8xj5d'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 8649966530
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'jy7rsu5ezhx0kk5swgrraddzedjty1f148vmdjc0is744usjfdnxodqu37lw53gdpf3jzy95d0xvtve6d1vxzvjfm3zvs6jhxzidc3jzdl7djqvoht7jk8pbo5r9aab29wixkeqq0qnaz87d2kvl6if62t74cy6x'
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
        example     : 'j17ohfnsyvexfp89lo4645xy6cba10wyblat2al0tnmimt4puebyvigk3hg4razvud2v7mk8t27uy742xyow2jub1g2rxvv1eef341mukvxer0ngt4izex5jxundwsrhhhirse5gf9i1j3rwtc6g5czxkybgsh5c'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '1ezggepfyieb1amekg6b'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'o12ok4etvyu09d7lqiaw'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-09-20 02:34:09'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceName [input here api field description]',
        example     : '8ttd9reqzr1w1g13ir9x4t06fq98iozd6kph611t0ppvvxtyicjwls0vqq1qa8xdnx8pdgyindvir3gd5qjdwgor1yy859m12sgd3hnbewzx29giugl6lzr1owcct9y7hy0uih3sonhjnx13m3d9o93ficcc36xd'
    })
    riInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceNamespace [input here api field description]',
        example     : '1zzl7khtc404c2ofo9e2d8l0sl7br92q0clzw9qsml0f1lq7g2ixzscteftnnip6b6klmdurvpe5jb052ig1tfs8s8e8vb5caitbbu4luds16g67uyelvalfd4eu2829g93fx43laskkk631ndbqc31zowymkjid'
    })
    riInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-20 10:06:44'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-20 06:49:31'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-20 01:35:55'
    })
    deletedAt: string;
    
    
}
