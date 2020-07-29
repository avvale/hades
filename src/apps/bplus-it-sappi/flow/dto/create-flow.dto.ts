import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '8pyep93ulvwixx44eeeoarov62s6e3uelf8wvo57'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c9f4327d-1e85-4dff-80d6-f566e5e1f272'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'oiiqr4pgjuiuvf7i9rct0sijz35xf9mn965o1uvqjquenx3irz'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3f141849-f618-493d-97ae-909e79b3c0e9'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '9f3zmiam9749cnku8kah'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'gz49elt3abpjhntw8zlf'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'simth3g8bujhz3mytcollndhoowlj55g7hvy8bo2c63nc7xvtsbm61lozews'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'idv87o0pweg39u5v5d1tnweu43b54fa68p2k952sm8iljblyipyzghzdfkrt5if2e21e18ufy2fg80x7n5asi0wi05qnxiaq0h8n2uo5nt0ifqwbgu2v0xgt4y4ej8uxnoe4hqbjg0mwv1h9sw7q8mgqrb5qjw1b'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'gnhg4fbcdwk68yruh5xtg7ab29ftsf8d3qej9x1si5iwtmite80oj64s44b50hod6iy1jfxkcjh0lyb8zdz08djy8matw1patdptv27ip7ljibakd3909pyytxbiqpodf4gi55vfumodpcpu6egfb2f3aht0lqyr'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'web44rsrkky7xy7klnpzrxop5gh7cceng9osf6luqwzocsis84t96ty193vup04a2ut8z7cc11jb033abg0lkx33f9jh3yauvz6y8332qsj6zypss5m2xw2q8zpwwzdzu81ff9c68utszycool4e9ef34ytkf9rh'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'jdl3woq02ps3ms3x3q2jul1scpqpf2jneioorqzmhr111orskjyl3mlo4bkxkh6xo8m158ez7jz3wdbartzxf5mul7jero2dzo4mccu1lbe59thz4bb4ppvn8vc6297jpissosdp810vj3ffldstq9z0k8p0jxkm'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'c6suhzkiavegrypttr94eot5svoygsspt9leccdqtolhdk5agt146b7obfhuktoe75e5y4eapax9vbxinp5jnpimdk2icwjggdaobvy67ttoo9fa01vq57z6yrefj7ldpdwi8uorn25v8j71vxouzov69i5aeqwf'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'avsmoe0rdbm09bqe3oou'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'yp7j40e2ogbd01l8h7qt'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 14:00:33'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'olpr1a8gegaxut5ptk2usi36walem54mjyo2gcla4j5dajhsy815d14gkmv6d6or6xsx39lz3fizl1aot4k9h8s3o0fpfbdu3jw6l04mic3xe4aqknw2rtwol9bp452bdbqjkmgys4ifhvh0bn0aba2h4u17pw6bjgldfjv2q2m6f8z2f59ep5ihzkpcuf8kmzi9utrf7vs84anve1985w1dfkd6u38h1mq4vglsstjuuei1npqurpl5ev0x3b0'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'zh81q3268yiu42n7ywhcxb126s5o794k9v141x1qd845dnjp3o7zfbz708irdetvqhnrlr4h0f9cywmq0besybqft07sl25nqhgbng91003eqb8b9wl0yyht0plvoox585ubu4am0ci37ldtm7xrjhcclbc8oz8ut3hacgkis1w3inqnx1yfo91eh1zg899u0oc3rj89a3bcsjp64v1mnn8n69dopnpa740ifpvqhabuuaxlzd80lsef9c5hm3v'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'qlnk97tdbjjn2izzuwxsabzec2zqolwndkf6hpprru3lhfrb0v0xbdexardh'
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
        example     : false
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '61d7c7e5-118c-4aa3-8a94-562c0805e506'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
