import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6b05d4c4-bbb6-408f-b640-dcc5e2939960'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '33neww2sh9kpovql2hiipjeocbwstj8cjxuh9bh5'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f47af28d-aad2-4336-9207-0a6b77e9bfdb'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'of8ilckmcu9cl24ekvky80z5dw5ukm0nlod7lw013ptpnh7lx6'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '8db51b8b-b745-4e7e-aebb-80bb967a02f1'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'b4mqo6mnqq0w1k1cv40f'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ist14p9cizbpy0n1g3hk'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '91b12fihf7ex5x080iyj3b5hiztj3eufvl9smjosdc5juxvzra01hkvaf3nq'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '37v520q6tod4tlg9ppkeprzjpjidoipwk3c4xi23m170wdvbvrbfhcl7leogcwuucy6q6qs8ru9wgt0vd1b3ec54wuldufiy66888v7maioukou2hnnczd9mhed6ego6vtr6li6u8kju88dyrazjhqs8lbod9u98'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'w98oxztkfk0z01t9e4usggjsnkjwd1384kx6nkj4pq52yko3kyq6d9dgvigwr6ozb099pf78v0789gpty7tt8ym6cgbqg7ku1w35dxe2ngstrof4l2o9ixdpyq55kjwgcqaguefy9qctdvm1c7abfbfujnea8yl1'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'iihx416w8zfts27uk2yule81p8tb78h2ble7cauipmbdnt98jqc55br1cswq02khhwou8ktftqtg1ik6hay8iayrjq66x7z4sexeefcc7vau6j2vb59g8vr57yuarf1prnb6a1orl5530yz23jp3jrmwk4su7uij'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '7jzhr8qs9zybq5gnttetp1xylqs15nkvph6ktks6vhnhp7g9lstpo0efyrq20eluggggajlxi1ptkgbr4xamc8xnc7xhlnp9jzpce8v8axdf8mh12lwshjlxe30xnlzfbu8r84po07cv6fehkyr9rr39y04h237f'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'lav35obdc4iatkgihzaelsr8ksnfshe26pkt784ns5uy4rl2tygu3zhwv6ipb1f75ugawfxjtovt2dbxeh7lesw13qg6qj32eivrqlpaznqdph1ik1sj4uac4vx50311g65l8f0yxf8vscok4754y6dy8gqbjne9'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'sng6wchedfnr2j64zagz'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'mxl1k788t37q3y8ncw29'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-02 20:57:36'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'ilaux6dlb4y83i52jxheia6kleh6m8lx020zv5obwq1vsaf13jbaw0vy7kapm1f02vvkmbxasctf7shemnon0k16z0zk0vm7hu50aanjfdswwr30zwiqb2ld0wzq2whr3araytdzio9ioiubekgggfyygdoolbbayex0am2ojndgwtmfocsyj6ub62x977lsbh0gofb6kk8zj7qkp93jx4uajij8wmd9jxu7tyyas59w48blmaiiscq45em52qc'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'zzmyt4k4fk8m80b1xk6mkrzbptjbbhd52vt63grzxvmmlb9yq87v7gfbryk8933f9q1z6swqfru1bg7drs1kxptez9wosdct396yqb4ndts3s3medqe0lduskhubxf2vw9c1a95prox1ddd3iwijw3htrngeg5j25iz5toxxetdokeo2zhvau3e1ie906z16gt5rba5anignrpseo1fwlklqzn3oc9kt4y7dyc9gcrrns7x9hijo393zdnpie8g'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : '277x0m619hts0q39gm7b4yhgjd1juxz7u9buzyxgrw2i100fwj900yuznqzc'
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
        example     : '818b53b1-d946-45c3-9006-1bf5decd917b'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
