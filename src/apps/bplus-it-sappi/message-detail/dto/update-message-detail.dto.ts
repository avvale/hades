import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '827d03de-7afe-45e8-b1c8-2b8b51d6e800'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '826afca0-24b2-4e1c-b27f-42c86cfb6336'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'lmt6zaotbr6pa7n51o9u'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'x7dz3z2nvwoe6s2skph2ub0l378k4he4hsozt53t6nsw2op49p7py38s54u0'
    })
    scenario: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'bb46c976-e4a1-4565-9ee7-2e719b0a0830'
    })
    executionId: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-15 09:01:07'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-15 04:37:15'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-15 06:13:50'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '54d9f494-d5b6-40c1-ad6f-04524a63f9be'
    })
    flowId: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '2h4ezdc1pxqhje2v4ftyosgjxbu777gkg2sqevt2lc210cqgefhvlngmghl54o3dlcfdiu66cr21n0dmdo9h1189mmb394ojycrmrlj1zodr1414iy3949wmm61e5k231n2dsqdkhzkdb0qzd2ewx82gnzfcfjx9'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '4sirvgxfpcgjgv9ixrh001l3fxsig0bd104no1imenhl5nlozgp2og4kdacvfr1w4vy9zesy89bhyy8db2hugpwvjomgdrofevpqoc2ivgk9algi240zv3jkh0rpizk4balx3czrjgr7w2qra6difr74o5fb9yf5'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'ly9etkbq5gn1uxlor0rucw00n7obi7j4phwj4rngnjn8779ae1lrhxi1th64dhlnzf3hzc5hclfb1x80ufdk3z51va0x1r7gqjrqbde2hsngtyacoj9dx8hnln8itqo6phj74irs9f23bf9nguosma4uz9pxj4n1'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'wg51477o0ljo2aisqcmtn44ylbt1zoeq33korzel1doj90qndwypf3nklrw48jzt9cmmz4uoaebontjfuogh5jc3sox1kpmm4h33tpbhzxww14y91uybheglxn1mcjzfukcwd8q0gfpr3nigj7e1pu4owql0ge25'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'DELIVERING'
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Aut quod numquam nam. Consequatur explicabo nesciunt voluptatum saepe voluptatem voluptatem est sed est. Reprehenderit unde hic corrupti illo vel id. Cupiditate molestiae voluptas quia quae magni repellendus eveniet illum.'
    })
    detail: string;
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'r0jqq59jgebcvwxv8wsyomvgxj53vvu4c3bw6drp1saweabqqz4gb5wzqr6zvpozox0un7kgypuop08ij05x2wb703c7mp3mqlefp7so08c44t1ir1mp3ecc88xm38w6sguheuncw6rojvqgevbr8z8i1l677y43'
    })
    example: string;
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-16 00:10:20'
    })
    startTimeAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'h6pc94s0e85t5ct3fd4v'
    })
    direction: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'c68sbuntnb6t82nx53ic0xpyoglq6nn1jclv0ka6xyx33p0yyve21v9bn3n5v0iw9j165oyd3juax52yk8t31ll20a6utob8s8w2tcu7kt6z19ztgonk6gnz0gl6c0joij6tnxlcq9t9eqfgdsmdkf3akvxfax5v'
    })
    errorCategory: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'rv887034mk93o2b1v040'
    })
    errorCode: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorLabel [input here api field description]',
        example     : 'uehf300jvq3bezdv1a1ptnumrof8npy9y6ogu1k4fx228nmumlfdy580hj2syosttnpmclbt8cs9dlc0ozrdj4eywcegjndqqonzvaofpyu2gfe7gqmiw6dk0tob1ccgm0khst1hpu2v0xap564rlhdd0wmq95qy'
    })
    errorLabel: string;
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 8519298150
    })
    node: number;
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'euo4u0eb929ptxfegwsi'
    })
    protocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '6atc32o1w2cz1idbh3dv'
    })
    qualityOfService: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '1i3b76j6qg0m8lbkyy880mu8zwt05yld6z0u001z8cordeiyoyhzvi0qcirwgnagqmc61lpew66cbjun2qdk5f4fwhue3ic5mg286dk2bcwf2y2kt5rw7w9ke3ztt9ta8lcq1rptijha2b2552dx88zzmwpv9fth'
    })
    receiverParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'ark0m18ssf8gowa9941nnxgpd0zosty2hlq75ilz2lihshqg0m56dreo72ht6m3vn8ckehtq6ig1b84hydg46isfeu5qmpf4la3ulymp9802hy2ese1pmrgqd3lx2yk3lse0zo3o1j48z0eryhiri0hmm7vcb3hz'
    })
    receiverComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '39iz7deeldakks9pzimrjr4we8b3qqeb1e4khwbw8hggic214hdpz94i3ulh8a95omvp5f7hv1big8u9we3dxtktlwqz7wa0ticikyi8wjzaksmlcti08t10gdzp8o4ebifbeengk2a1q5dyupbul0sdoe8ln4kp'
    })
    receiverInterface: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '9jzkjfxkttnlda3t8ifoh1vkquicpewkqvzpis99yvv72w8nvo2iyjt2njty824wzkejyio5eqvk6603og05u6v1u6ia125xgfud7hzx3uf55plrvn6l1wtj52t3tka4koqblx6r8g6hasfenuw6938b631ftntd'
    })
    receiverInterfaceNamespace: string;
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 2493444077
    })
    retries: number;
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 4093137016
    })
    size: number;
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 8066126987
    })
    timesFailed: number;
    
}
