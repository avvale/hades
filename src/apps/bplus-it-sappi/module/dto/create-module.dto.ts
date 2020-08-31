import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '99ac10e3-5712-4ac9-bae0-5a299ba548c7'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '26606de6-1d47-4228-b9e6-7bfbe97837d2'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'yx7q97tjs79l510gg4ocu92031ekwbqbznnbm27p2set1p2zj3'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'df315455-a321-4647-aff1-ebf23d45dc6a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'm88sux7g0ljbbmeedl7z'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : '84k4h8k8qxqbicmq5znc76xl0jtcudxttqoo0g2z'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'e0hgyzug8p3aqnure6sqky4278fb2hznds4jak363wj127t5zjjwtise03mwl8kkx60ozxcwa4r326dp3v90atzi61yhz3pmz4lbc78cmtpis7v73yj0ba64y24ajrqleotsxpjlmhi1hrhwb3yixpznyifuifx9'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'g1fh3em1uh7goro7c7v6cjpllom07qcvy97s802c1nb3ztbrdkozftknq41umrvtrutwbwidrey1junx38773sgqnuaqde5ejp4zckrubrbyrvsz3nn97qwtwn34s2w9bljaxavuhmlkho45kxeldfuxy4uwan12'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '19yqer4jpjvm43tu9qta0gf9spebefy12jltd8b4gymc3mjr36ljqm81nay40ib77oqz4iuie9ng5oss6llrcbp64bhrefu0vptu8ybn0chyiybxo1bplk83659ma9n5x18fnlmgs4clasgxcplr39gpajzshj0y'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'rwk73ylqf27xrtf1mtl0ipnixly6jnm06xmy57o5'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 't95d2flpdb80ixs4fs7jjt9iq8vdrw6ylpqs5ars9hn03i9v54mr27ykqpk09txlu45bbseexp5tchq7wkdw8hl4zpo3m47q58mbj7y47mr55ngdww5okwq6janplezw08gex0dxrwhtlfmyj4anh2stw88pky18'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '2zl6fc6hj5dksl3f1rxjqmkudmwmkjdbbbpekpodgudrtef3kln6calp5d9b0ukoaw6id09q72ppa943ytt4aizu90kvzgf9dlbp4lqk3l7jsmkbz6nrz80fj9de88oednnaz2zcz1kfm9hmbfdx34hjh2znmidt'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'hcibk2myj15c76lekqj7jeb8biwrmo71rre33b6cc4br53vm1uxxzhwijm8660sp6aginchqkcci788u9u7vd3cexu0ockvfpnlqi8ryvvox26xmk7sxyu6k275lw14bvwd07fxt9s1mzmzs8i3y0d3m7aunaui6'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'rc5xluhb9l67jldm65lbsdj181ew1dz9kcrwm3bt1gvanvglw7e3wpf5kzatyv10qprzwbzf3r9ai29x55l6qjjx9vbqrqrsjo6lgqfuo0hr94vwp7tc24v1p12zyn9ne1l9cwy06jirpm14kg6fkq6kktfg8e4s'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '773vlep0i2nzaot79xqa'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '1gqbitwulqjvkv6v7m2vebklm3smgpwo9mnxb71pha94s2iw8sitbnbfdwu2mcn05uzh43fudoo67txnyiact3i24p5llfgelxcnne8n8auu5ayfsrj6yrns8pkonng3mzp33arsl9wn20ljwesteblcqgfauxagw32e8ifo10n0mfkb8rpa2tma4buxtv3fb5t3jj726lb2z7ypiuhdcg5pa5jef4gpglrcdbaq2akd344y5d0jaco5p53v492'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'qrhcep2ed4rix77u7nnfkvldk81wpin278k71k64q1fsv6dzwh0iqj8sksvzwffdm3h4rdwobmc7xoz64r34m2svlvyrotiub7or3c1j5v44v5dd8ltbtb9tfxccpg858gc4ipt8hsvkbbxvq09wxg00pzzwbn1cmo6l5ral7dhha83ggnwf6oavp1zciciyezzw0sx0iud3dlj2gj41ahhnoau3t1amj7wsq9ubpbvtz9pa0yny81cvrslpl7ei8y47442hlawrcxt8l0mltp1lzj478ogg0bkqdjcbzxsg7w2xkeeklv56thfgz5d0'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : '07gf8hb146vceax3xc4feoy63b7qhur8125cxnpxlkbn3dr84cee5fyb2l3s896tzgqslj4o105ixd15fl22h5yk9u5uv14u1gsv2lwnek12w04xsx6us585yz53siq3usve3wo81j1besyofe574mtpvkrtdhlgy503hupxxsqkkf8xbsok8ra9tkaefn53mhbooetsnach7rda50v0kdqtrp5mkwkxdfxczwkk2jahsfueohgrl21wpzd360axlis7we5zrpt6oqyh4sext8vulx65q39w213fmy547zabbsz6e7w1jy4b86u6b13p'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'aud04twbrme5eh8kpdc9r386wa1pkruorqf8i668w0vcci3a82lz9lsds14070r7xwbsuucw900c7pg8uq6f7zqb6a1q40xjl8t45wlv5ltmva72yyc8restdj4iaf6h5sv59vnt071ygo9vhk8gsfqdmzpc9cu8u5yanpmk1qsglgpt2bpznb1yj8fvfzgrzxz7dtpvxx1k1y1v9lwu3hjlr2rhecwpo7o8gwgu9s373ppwvkmyj8cjo7q6qnpd8o8vzycktscn02knhqmomlsm57y668t1tmhgzg3p77fmi3m4guyseajo7bdomxi72fdipywtqpqzvx3h9ssngdgq3xvg7qs66e6ys4h6bnwb88i766yv6t3cu8r5tbg8do460fm239anaz8is3wkuywvaur69r1yymbj11w1nv71rfvg15r9b8u0zfdkzzkmzd1n01pc4axndsbp7h8t1add667lu60ygu0q8mu9z13g4a6iz0q6wf9ehbpjre1jzcz8ib16h3vhn4xgibmcgkk39bqai6a2277h4o15o9paobvxts1yzlgjq6lbdbygyuzc5dxyncrr9ts8b28kiywd58qvrvs6znvwrz7y31zpmupo9qps9kqzstq73tkzi35bn1o3kbs9enty2aqkv228t0n3vg14axzkjppu1dw8ew6nh87lgjv0w5t66088z5oodge27y9r9pkxih430astpy1mamekuvn5k6tml2iv88cbe37kzjjn5o81zgh4n16te6g4fo28ryc9tqoxesdyuww5f26qyui2gfc2d9p758lm9c618lpwa0cw7jlgjcmxy2p5dgxa9umsz5ei7d17ngpi7wgco01gnhycfybv8w017pdlh7lzv7bbsc1jg768j5dyxpqjv82gyy69ivb8luvju8ysvxm8lqlpuihbuj5du1m4poaf4k3bw850ro4k7akg9bepawrbfx1grdsd8zafbla67xiresnv43irgpr7iyr559fe3du376x4'
    })
    parameterValue: string;
    
    
}
