import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '29e4040d-242f-42f8-a1af-31d6f5b953c9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ggtsum7wl2qv1c4fc9wyqw9ptloyzc1z8o7u1mtlnyd14jsm98'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd53c4c82-89d5-4a72-a011-5b34937c3ff7'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'pssovbnly20t8iirbcub'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '01b5b256-9e4a-4b87-8258-0e53295fa86e'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '04hvxib53insttkqaa65rkluyamobclmq6z1sm9inyrq33jc75ut11jpho3dg6c3ei5kk8xakfd91fsdm32o42q4kt6mqnltzc8hlux1abxmjtja56xv86djv5eiyxu8ijbti80joufx7doyec5rerigpfywi0bh'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '0mqr1nlrp6qwtqk281l6fe54mjxqnyzs1zj9mchi7ke66f72iaevm2dn9m2a1w2f0ljampxels36fcfituoymuwhbvx4jdyb1dglp9pqs5xdujipc3bm9cxrmx076rznl9g4jv5sol3qr5uns40jziakvgpo43wu'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'lyokjaxapavm34emvxf2rctcll4a1ee5tgfyzemf8gaero8pnvmp2e6f9y5dohv9q1xr1etd4mqh1ucv1sbx1k1j555depsksvlm4s06q3unyckxbct5drp35057avfkhtru0rr1xlaoloa320yy6vqfdubdyphh'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'be2c7a0f-d401-4456-81fc-4198c6661f75'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'j6aznmhcli3qbqxn7is7s0xrtj8kz8z1wcdx3bxa0v1hvsgk9gkyitstn1ak25dpepu0g7691cfn36se5hs92w58a00zfz4yawezr70zzbejw5fft9uwj6bb3a32j6u8d256z2q3cup14x5rs6or0cgp1g32s7sj'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '05rc2e1f3dxrrafepuw06w4vnuimqyddh3ss5kdyvs7fjv596z5v0s6kwxmb5onwn43t2l2tzdohghj13p2rngmouig4qo8eesnsugo4ky84hykvphrp8d46f4u8rhuqq52mmujo3k6udapu21u8t602i7gdvcr9'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'gcefcqj9atguolka9olxieqfan68k9m3mhbqpmhkggmykgsjck4eubgaamznqh2mlz6880zq431c3e6mb2f4lqfiepjxmvhy4c1ubh5mdhf6b4why67w62ci2ilbcxm5u0ydq9b5kc9xpnybkak9m4vhoayk6yhu'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ojhw6hbliooaa59ky4tpc26gc2lwc3c5c8igkq45m5cc4eycd9utv9fc41t3xif0jya07ah825lldbhbt9pbviiak9g9u89drse5vo8uqt65pscc50ng4fm2y6s9l8auevn877dil1k0iqhadi75n8i5s18daioq'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'u3v7ojmcz6uli4ahkn0i'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'hw5ot21qs4p2m0oe2hwmdj3ppv35kgc24psshlapr3mgb8vwdgohvoq3s3vv9odzkrozos0gf44akscgbupxcwg69oss1tdd30a08tfm1n561plcepe1bk2m7u8wcnhwbnnlr4m3vxta06fwahcqcw1jj25lgn62c809npoxd742si11iwmeega8fmzsukl9b04zh8g7ksa5epboqxf1m9dnemy5segars3fp2quq3oyxwbwas5cel6axq6wsck'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'y1a8tgi1mzvrcdsxgni0imdl9zj3rvrjzydgobgejqgfiwmpvnkcwv6gr01snn1blti6buim16vkasy0bckhjstd3r4af9koh6iugg8l5kg7ichq8iw0zh8p8wb6uxlr98lnhavw2qanl9kizl41z0opoco8318zml603ww4bm69oie21r9hrkrpagv4h8ofqdrnokovmwdhdvrb1o8bhznnm6ew889jifklbqjx8wg8a3ypilhvcleuc8vk0wco7zxwmtd7atjxikvg1l7688q05ezcpjtuh03ywb3g7yhv43h0shzuf3kfwnxi64qi'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : '3qee7kurwmso1j0pio9wp1a04u11q6f5ai5f7p98hjt8i3q2grtmcgaz5otihvhk0xugde3ztmbjys080wib5e7cdhot2h5ltqtwhi2wd2k8h451wt17imv8kw358n5qxpckgrgtqxy519c0ieney7lzgukgr3orxcrwchgjmyrwyshvodhl4dggh9jxyl0amtegisovy5malndzch9y9lx87y5imncg9dazbt4rkc0k8tcuvndnytvavir2scl0jxottv1ipy7cfth69yi6tuzpz8xbjvh102ebsjavac2pvboczbhez9r132gggcla'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '8tb9dzt7ylo45fcn15hwm34zkkt83ieh1ukgnrs9wkol0ixkjuj2s3pdhnexcbti4494873mty2him2k2ipv3y5x2wc77udowmbb9huc8ib4n2m03tk346dby2366qmxd0ym78b5k1i3jl63grhn3uaweazzed8kerf48ndx1im8aa7rjjh5ny0gif0196up9tehzr6vnzobh2j7a1u9jk53z00r1wgavi8nfn558xej38bul2iegw0v9m7bi3tiray1nzuuefom098qj73bwo05ytj32p6bzqn3pfw4p5gil95nj7x1s9pmmdnl8v61j034d1xx4h4slnokxmyrlhiux27drrb4dgamxq27t7t27v50rsfxetrn31h4rjj4ywwa6ivuf9bsjgg2w3j3uyt3tdtnqvze8bdr4gkk8aj7r59ckoqgpddzs539orutsw7zv3c6umsw2c0awg5neqg5kizgqrwbcrobq57tcv6pv68f4h0op5rcv37c9p6yqoyjj3yf1jza77721ngokatlnxhwnr3m90t9pd0gok6ljpupprp3pdzi5julc2xkuumc04xhieipmecajklh9sl36t2nrgpvx9rhftl0jfpo6in11oolp5a2ns9cwnriftvyoloe95bz16jg6u01sa4bqvahah3x98evnncib5mlscliz63hb0xg1rkoro4hlfzbcdnos1f38q3gqs6x24q5pzero499chzu39uz2f9t7rex2a3vc3t0p1cqlah7gzxrqcu89dtn8he5uqbdc3bqx8biqob9dadklfqkvjq4qwjmreywyc20d80c8h00muekamaziilxz8to9vvhhyx9iy3gxz2v6gc3b16cagyde2fkqeoxzt870awn1i5i524yn5oh071e43j3mgluveuompi9gvfurhzrus25sbpz63kx8gynt29c53sb0i00jj8pyych5fslqs4gvkab8m1o0m3pzviar1tqpc5v65zcul3obqzzdwie47s0dxmb'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 05:08:53'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 19:56:35'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 23:58:09'
    })
    deletedAt: string;
    
    
}
