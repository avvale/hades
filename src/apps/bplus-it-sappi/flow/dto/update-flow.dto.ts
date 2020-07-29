import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'dca73653-5f25-4652-b032-04a805aaaa71'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'xkc8d0kzpczxa35l8j6ew2eyvyjoejy5qty16lcq'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '805fbff4-17b6-4b1e-89ba-15bd0330d86e'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '1bxfzcn282vdn2h9r2uthk05dxwi1m1qxaf8vimrrnqdnpvtue'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'c729ce28-3b1b-4572-b781-ef38c7e06766'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '2akf1544f2lyzldxo7fr'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ti3839pmv08chfvwz0tg'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'advhzx8tatl0xdz0mn5ctvu8wdjx0fokqsfw8zktn8zjukx3f926diyd8occ'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'p5r5otgnaqsn81o6vl3r1wqpcpef048grxgu1dwqnm777s6u60bvybre70uuxzdg426gqut6oyvabh4yt3eqclowzn11yfzco81f2a2mhmc9bxhn9ir5ljcfykf3gjn16lymfhulz296tkq4534cla0nz1m3173t'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'fgawy6o4rkxd19hv5zitfw3sy0nnt3do5o99qdshxqkgwc1qrxj9a0kkze3c5vj9vjrb48t6mgi1ozbdusehfi68gchd87altolmtlo8lvtiyk9eigk3a5jpk1coogenu7kyywge3ozx1c7c46kmtl6evsfponht'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'na233z9qwz77sjm80iqttcu8keqthus9w1fdp28akk53vxxpz16f758y9hjqtwq0o61m1ut5yjw0xav9o5bg9120od2s3l7x77x72o39vdsuk01gof3dwrrhj7a6smsw53kxlgiudd8t8p549oaf2cr3hzhvsb9v'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'pfzzmuygbihld057gf0memiz0hmm8njqqaw19oubp6879hta3rqewsm4afz74o3khol029k00iaajdbfy1ootj4er2cdh1pqw0bfnffzcyua0i99uq34rpys5bnmdq0661mqetlmhbguznykvdjzaqyv7gzadq8n'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'dr9pf644lqhszeidy55xziyv8i3n6mimmgssc26rxxifmdywdjrd8400ny0ylusdalz8qo80h87wuz6wi5av0sd7n42b8e7it5yfu09twb2mz74kfukzmwo788ede6qpoiw83corsff8f4o1bftftsf21q0o85mi'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '7tu2c3i9y1608xc8kkgh'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'p9ahtag6lcidbdt5puwl'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 00:13:52'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'mgmnqiz8k5eht7wvy6go05ciecrpbjh6okz9wna6bbt35gqbdyxe4bbzslimih0fthc26i58mlekhhppb8dm4ewuca2rck7dos99jdgdz2ma82zc4pv3jbswhlxnpt2o9ky3yd95j16egf4tzhy30e79bqljarde5utxubvus0f8c9f5xvjnqfv30rvbrza1p8sdc7m8ojzu2mw72zt6qcztqqw09zozxbfscy1siyv7mxc8kbekvcjzyqbh264'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'pz2v324ls1zn5prtxs7uhw3ee4m96uzam91vxl2ycrnkd6u9a98lswjnsgqp3utlligca6ni8s5sqcjts10ivd60ev6d3lmfoksylroy8h42wbwpbt1oo6asy8jiu2b9691lw6pau9cg6w1gpvbfkl73azjbf4g5vxys8y54u8g6pmi5adqi20ohdacv6lpnrpa6754q1es22v2ymuhe5xouokesh9suaggkw9fw1vzqh9kc8rki0tlo0uyghm4'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'ge4339ewcdw8nf2e6570733uu11yojw9zjwk3ao4xcc3totzyl82ypwl5lvo'
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
        example     : '913dc527-b649-4dfc-a892-98142524b324'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
