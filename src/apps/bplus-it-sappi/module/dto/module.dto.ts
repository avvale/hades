import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '48b60d77-1552-4b86-866b-3ecf0ae50150'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'pwjd7e0z1rvsk7e4063q5vzftcem4yw9onu5omx0rpv2mchuqg'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '68f61958-4463-4c61-b7de-54cc773f8024'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'w8c5qnyrq9se3fniu55y'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'f40125ee-8415-45fc-b829-51f5671351ce'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '5xye7zpgvpn786bomcxhkhlm7x4z5klib1lyb8m7ervw6siqnw0jzsyx54bysjw5fwmz8noypkqz836e3tiwaes08btbuuqu1uu87i739xikf37jn7gtwxa9kvud273hrxoudl9ogxch62amzctzp3ocdcwqy9rn'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '0rsw2qmi581cgimzsisl350h7fks758ipyqju2v38asgi3usdy57w2d6lk9wxt5amam9cr2hxek98zn88yfmdad04kc7aloiw4vejteiyw11n52vr2z056theo8hz2enjgz89ba213ckgn5jf17saqcx7pmray85'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'd5xrv3mx51yjhht06py9rswrlbb4dx9boygr9ncq75tiy5c2jm4qydu7or1pynrq6ows9bxcl7doauk7obns0shrg6zcpqhmqi498owijyvtc5n2vf7adpwj4r7ecd9xh0dpex6op5npgymy5eyhlh7nd7r4niru'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'f2e6ca50-4789-430b-ab04-e9372a312d72'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'immqvaluwlw32sofig352xlso3tn4ybvjicgrylndcq0hmcypzuwrpwehg34gqt7wywmkfdxm0am38d8nyu410z0s0dkllqi5vsz3unvvwr9571j62w5bxkm8q7ddrncukn4gnhj6m4o5c69v2yt3cevlhv99y3p'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'f900g8rd8jj1y5p90dtnheq7nd5yahcfi93puyeqhbgjif5mqz40kbk4t7imt7nph19thmpo4a9ecapzqcjzfcfrsrkl4c6dtjau5x91amzxuc7t8h95vvhicobosodx0yet117izsajqii94pibkedhwvchcme6'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'i2btw6yll8eegy4g5sbt4k82r0ec4j1b46prjmmoias1x2dxl7urezh5ktxwlgds1p9pc67wepbopcqjwy1bmd9a6vgd8psmorndgafpyikhy3rl8chugryex09qjng30war1rz6t2e6tdj253d44u9rdf2jps17'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '7ude2raegge19m7x3yjk6ifppl5i32j5v5fd38svy0xf76a7gdwot8sqs13yjdivzf9f5e3byk0y440heg2aottso4qydwqe1s2ykttyrr5ohh0es1drjfjbqj44iitaa0tt1v2fhbmm3bh4eijgh9d8nomj71i4'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'vj9ejz3nisfeoxvmdl4i'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'tmy8v9ffti4n65emo59kv46xo266agzgb3twif7q9i15spe1x3n6ky03avxdwmoigug2m85th8vkcpstfquz161i85f05jliagstzxta34h60klvcwadomfqdi4yw1ayv4c57io0qvqcwan8hu9ajyf29e16dz9h9yrjfwbm9p4mby7oerotq3qvis2zu11a7s9kk3ukzv3v9vtsi9vwljn3k39l7cawag8kxzorutljqiwifan276gjwny6f0h'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ftp5x8nmu6sisfki0455l4eb0hwyzi3bpozb9adiy6ruyis6xcy33v3rtui969lbidqy45fcktxhrj9roer04wtssu59am12y1gb6k03kduv0g5m9wu1s3h9mubnasrt9eo935zh91802eu6bqn249xgn597346gpfznisadq4j3a94zq2vw761i3levqgmcrwyasv13sr4lp7gcrx044x8mpitqiwn4lzkg2gvh7df9i1gbbipoxpi6jhhs2n6ilhsw6td6emdu3se00i37j5cvodte1u21cdpd4ve9avmlfmkj35vovqhrl37ae6iu'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'ehnjmks2l8r9ccoy7qozua2ss62cv1aez7eog0bte32g983yr63m7mwav2x5xz4f2pap6bkf70pwmmvhbxh20lh67efa78jo7ikcxm63jc8i47r77bdsamsgjcnvo32bi3rfyk3mv14u3snxujw1xw77xf7qgyx48bolg9rlrld9w6h0y7hfb4j36jxmxxe4do9hu65acxnbs1nxgbo11k0y5n6hhqzg35guhoit12jwtevz42zx4n914ixp6kkvf796q4xur3rcj6ukgm87p38mb2bjr815hoi5nx2t5on8de6n3a3mdok172v8ln9q'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'g6eiocuply0gzyu6ee85hvp945zio4bhk5g9ka2jpgh4aq8xob5o3s40zzcncf2tglssu3j0kntpt0vlku3m1tr554zno1ob3b83ezyl8tun6khcyo49w33sqb89er9kwgukubtvgcuhr1nm362shqsyjifz7imk6aemjbudga0nkidca6z1cyvis3kexneqa97f6hu93j2hzfd6a9bkkeixaeu53nxku0o50ws4l8yyeq9s3kas65zgiokxgfhilxatu8cdoqdcf432jkq9mc85mqrxg4qy9m24unws0ubi7wohfb9jwy8nopobv0ix8x6ecca6ru9b01hf9nady5165wumh8pi6pw8a2h2i6tshph4zkf3998ly5y15tlhhfrex0v95lfekjw94mdywm4cuyituj3oav63ost96obmfrklefposvics4gvztz8i2w8747kssfwxmwsb0joeoqr2evciidxyr56sslza2u55n7q2epnnsz1ni26ccuia02knsn23bwf8al33wfxydqn2u2wpskwqczzmq54k6xm4t7c6b58vju97zdcrqy1xh1gh68yecx8yj1g2o7aaudn1swv7ucxwytefxuolhcr4p0n6gvuu00xz5e7ak74gunbk1h2p7akj3eajsefx06s85cgkp54tw7mt1ghmssii69xyb7x6r65nwq3yk8ihqgjk2oi0c73lj0ot47i0jq1knhxvn8wno9m36gg6fchbe0o1try17z4xalzy93a24vnt22xwo6k3t7m1uk9ctz8oh793p738lajvho82f9xjvil1hcuf6k0jqe1wanvu5tkaage8mxlmtt57w0ddk0zlds4xg9o39huosvuzp01zuhupfpak8rt3q0b38f30sltsm8omv7z0ossg5atxiuuk8vu27cv0tv6f02r9ycfqvcelyzys80v90m5z3r5t4kjsgtt9itf5oppcmapd8itu1pcfaw2gpu1btzl19bkka20ne6013dagn5uv0hi'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-31 03:28:36'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-30 23:05:29'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-31 07:18:58'
    })
    deletedAt: string;
    
    
}
