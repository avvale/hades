import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '55510c84-cd62-4db9-9935-e23121ce61ec'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '8mn1iywsv6enwrpdlc0bjmk7amdfjipuj5x1thal'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '4az9njmjowq1phi2nkzr2zur6svnwx0epizntctdhuq6zfienq'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'b3766561-bd36-49fe-a736-5f6d8f8298ca'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'wovpxjttmma95l5zntlj'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'mp3wq8kquete2rxjrxm7'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '83xp105bizas2glf4i3wvc1562emet23qva8t3ixe95sfuedkdb7qstpoxuj'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'rv4pdy0509jtnhmmft615z5ox2mtjoce4ef5rcwnrtzkx7sveymx88h4ri2axhcnf662ncdk5ep3trektkp417yauvifpuhq2rky4k65mo1w1gsjjv0xmxw21e04s6vgf38gpf2mdjb1hgetea7e5koddvpys3o8'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '8ct4vz151nmehigipjxwm1u0v0n19rdujcoi5sndol6jkvi4pghs50qzs7rnqx12x4hw8su0a30pm2gg8qyo11a6q8gesdvjoxye64fls7ky9m3l3atskacbz5wd3n44gx8icjk12pcrap4yj8b4dgohmqbvi8zp'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'c1ctppsi8rcb3c5p1b5lzi1fl34obweo3ziwlpksvq3gzyo5jvl9yat78a09em9b8mndhsurs61mlq06mpvjtybb447ssj39fkeakv2xb4xqhhtkw4cfybjdr8jysjl1tp3jkz5udnu9bpjhxs9dynav3mo1o2vc'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '5guo09xmb6tfn4hrup7cyhi60f4vk282adi7cp9htkvs5wghwhr126nv8j85rwgvp7jilksidksrfdsbuquwrec9aujb6okxw0n1l1eeef0diufz3j8dkk3chdomlog9p45ffche9gve82fzicuhuwgmwml6bd11'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'n9o5b1xi0gbvzggxtmrjhdup1sivd6igd2scmkxf3c4mhhcqjt0kpts7xisxraffdsammk1kwq7gnxy06ky9ghs8v0v81yc0fns9njkcec0j44e89c0fnz4sdagosgmzewfs0f1nlq4evu2aqpzyt4d46ef7k2kn'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'mvpkayfcahydm4aw3yck'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '0hzxu6y922enm5ptqf05'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-04 05:42:32'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 't7yjk7oegt8rqrbwnzeta4qyn4ceyxuu9a7ayysmyq6cllpv3k32c6fq5uqcy6jh1szzt2o1xv6luv7l694dy9u4x7izs5ddct446ywcfr0lmpdhf4xtk42s1l934o259zfyowgvehjguqm7d1lyd35d8lx05rqquae5b6ow2pw4gbzqx3pvvqs69ypguo6fab0sxs7rgejyd5c54tokcod7fube7m5w1bo2r7fl8vwi1t5vfbwi4v16v4v5vks'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'c031tjepyxrbtx78shg34b1frzcouy4fk9olfuxtitv73kyic7swjly0d91fcqem925mxpbuw3gxhl6906idylvidjyfrayjkcq1yo38d40jo9qsfx1u1m4kwr7n0v8in1l62h8oid4ivlpjjqxx8dafc5pft8nu9tiumyg7uljkdl9a28l183a92o5la40bpzt7jmz1p51qfqhnc94yiad14r6t1qd9cml073ou94hu9sozjqscvb9nebcis2o'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'rjpn5h3ntj4315ashqu1uootg86dxxwonib3uxyr3s6jj9lgxwsbec5lke5j'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : true
    })
    isCritical: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : true
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : 'f403744d-a5e4-494d-9d50-9551f66d5acd'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
