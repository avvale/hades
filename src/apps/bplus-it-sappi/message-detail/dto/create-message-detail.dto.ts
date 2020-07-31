import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5ccae1b9-af59-412e-bfac-deb9d5c66536'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '4b3424f4-bfc0-4855-b611-92ce0ca257c8'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'e46e8t9uaiy746r85cbvzok5rywdsw9sdrz511j840wyo5u1e6'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '63f20a59-070c-42ca-a5b9-596d3dae92c8'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '4allrbc7e6bzhyvvwx04'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '0znw8rcs8ojtyl9icr92xv1v65zr8euo2l4mywjwral1kdbni5lldlbu0856'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '0c5378da-c2e6-448d-9500-30bc48c60bbc'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-31 00:17:47'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-30 16:01:59'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-30 22:15:42'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '5c66p7jea9qmnghlioekitbd8p1b8ulgsu85o34d'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '2ve2enn7vsypxlzhf92elp5ikcufmf9kbeu6tt466nesdtpkrk9n7pmllfpvnomybk3oyc04r3x0j86m5hees6tldmg6opzedleq87q3bm28no8446vl30ih6184tun2xk8gb8jl2z6z2b7umpc02iom8ldyt0ms'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'amjmyt221snop92w656dubat9029nwnjyejg3tda7ulsg2spstulumdml1uqh5ztwbpanmhzanhw54salo05e3rjh7519tl1cavq8lf2hpgwybe7179tqxgwdyetjo093ox718hpe1p6zh65a0xs8ftoqf3qm4ut'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '7slzl9kotbai9t4g0ybx1djlytlaqdz8bw6zhtph4bbvfu7btjaow2jame5e71557y62ojl1z38ewdzbcem6l0qqyfrq67n6kv2mjrd5bvjpgvvg5mxlqg9wdgb7daayqx7afcc3bxnjno214vim9otuzmjgylxv'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '7m6biwn11nvj7ms9moqn05nkftn6tqk17sycu4fs9639u6043d5tbvdbbt80rxqu5a1c7vpbm80v6ltvt8694w5oybcbprf4xzuqu1znhvk0bp3h85dpkbjpegj2zqpess1y6oehndbkox2ijbwkcjosvjz2eyh1'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'HOLDING',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'In rerum fuga. Fugiat nostrum non. Vitae laborum est delectus pariatur occaecati quis cum quia aut. Enim magni voluptas voluptate. Vero rerum ad itaque.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'x6z0rs6d6v2lvpk51bkq6fnojdutp2riyzhvj8tkuk76nj4s6de7k4vv9zzcbe0hs0wvoy81p96zjraiubn23t5qf1rmizblg2eenxeepfkmqbq3lzhl71v4hywpyxl6zt2a8r2an02s2kpl3u4g5c3j7ncjn3fu'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-30 23:34:23'
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'INBOUND',
        enum        : ['INBOUND','OUTBOUND']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : '0wjsypxphe63u1uzyv2ps491v9n435za28u5mlfdtkwd77urvyo04eiy4o6hh7dukpz5r1rcwlnhviq6kxum1w08ofjgeqdqpbw9thaam7zb3olfbaj53fw5gqx3pn2t3naov7u4gfnwop066uvhzqq13htsvpjw'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'pzgg083iiwbfxur4nf29l5v5h1al1dl79t96nxqkmk4vqnekjk'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 176647
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 3171272243
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'yeip0k7mf4rluefy1sat'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'lrka89ki2dhehpeuipq0'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'gympdypuxvkp4s6v0xto09rcsjn92dstzptwc0uwfds9sxczvojviqottgblyvg9428tsfe1px2lnq3zv0nt9d4og1htgs3gnk6cgd4vtid7g2w0cob6ou43x9l0obut22mbidymino5naz7wx3fvl890h3gup48'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'v68dmmjmy0uztc1g2gq3iksgcey92g0cbdgp58gp0yz3ltl94grmw5kkxsoabhmqrmw4qukxasjnt3mnee8bhrq3ikuk1c731ae8i7hb0ki224qt3sj6gv13jl33botgr2m9q8bv1f4e3kzekqxbmri29abqbqgh'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'xwm587yghpvmqwi7wgvtuogu83nh5mp3kedxqep640u9qibhcwl1eghmj2jee2w3tst7s4o0fgckq39aas4mgda8mm6tciq8u6g8r946y8xxdbdykkahhjhxxdzkfib0za7cz8njo2k0h7ih4cvhe1t3qu87fh10'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'j093q7qms2obqqs5ee2doujjg07qkfxejcsjfx3t4ypqin9mg56q4fnrpfccrvpi294npjm6pvt8bap5rrigalj84u4kf4wyjs07rij49n3kmx7jzwsd9pj4skayzbnywxnj6c5ig3cr9i4xqbblm62jnvfw6jek'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 8527582837
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 1747478567
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 3581047398
    })
    timesFailed: number;
    
    
}
