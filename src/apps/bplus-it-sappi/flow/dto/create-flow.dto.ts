import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '52ab0147-24ff-4651-bcb8-b0084ebb39cc'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd32ae511-ac63-447c-8687-05a47a9c6f80'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'fcd3c078-15da-4412-9f89-10406c5be431'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'xgcw48lnnwi3wg6efin4'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'mupjdtk69wl200iazxlf7y4fjatsf6ki4wgk63dd328uukj2imitgsx8b5dq'
    })
    scenario: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'n5wf5qzjvos46r6z00hlt4v36oax8ynz011cp3g5jfzdsqn10p8ox0civ4g8qsyct98g5mou9slw1ngzorstbmg87ipzwd3y4tuzcnzaqfo4blewi9q2bwognmvib52a1zx88qfqkc0rpebt5iixy39s4o2un8br'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'ixyjwp6850smcs5csrrkxd4g6dbluduk79rv81jpa76162mne6sfgciifjc972v75rn72pdc0sg7rxoq2rsx35sst9ry2cypcrhkwxv8arutlvevpu8jm7c3ytfwl3gso13zhjipm44cvw1mfuqm4mdiady6vev9'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'kpmb34qdtovwd5yyjen51rwxeq4gxti5kv2cgwrtnkmp88k92a9t9mrb4j68wr46cv8zsprwe0buwn2t7wisqrek5i8994s9afhu3gdb5x1aae14y0qf6c43m3xj5g9wvo234vcfqf2ve6e4lkddknjqlvvn9thr'
    })
    interfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '8lnqcjlf8qhs1b5lkco3ojzw1ocu0th5rmpn9gnzag3yk8vft1khqukzyaszo5iewpatinfqbn922y79annjivmu5hyntx5l71mstb6nci3rxnjctkha8ghaqucdc17gq59coae88is1ercyx41ydronl8f6r8so'
    })
    interfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '797fobq6466zajvvteebggaaimqb96waag7a820f9bycrlquui6zvniw69qa7z3xfrttpoejr8hdvujt6922jmycyje9vtc8dxaccxligf3xpp4kdy2jxqif71w2vzjanebnoayu9ggmkj3iep1tqyp8afa4ep7u'
    })
    iflowName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'zkphnxpk1emtoo64hk7c'
    })
    responsibleUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'ugnd8yl7cav7wkv4xvww'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-05 20:31:45'
    })
    lastChangedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'j6gw1qskg67ig0wlv3cs8to3r8mv236awtdnnq49at87akzsi1tmim7edmq9weengmkljti5frsc90xl6ugi0h0zhp1mj8pzahkjx32nfz5219isubpz53z8ty61vjpdhpmp8qo5p92fulxyyk5l65eratj7egzh77bsmsbuq7yahz7f72n1xgby69bpvoq98x8wvmqx4meqo3ah2e6da4cvqwtd6qsm82jtlvpl83yltgcgg9dkxvpungq2694'
    })
    folderPath: string;
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'ixko1lfw2jf45fthwnmyp806g4qtgvbltbyggq4xx0ht2scbejaqo6lazjvyydquqcqe4k8v41pi1j2fo199eiygjroxavrqf59rft9c9l0f0oim687yxwgvy4ca3x2ygm0ulhzt2z7feeam1zogzg6mr4207y8dduxaw3am46ss2gxjgxeela43p9oeftsbaexywlfktlpxqdles4g90xfe5juk4u0139nyokcqikodpqpoflwyonrwm52ftbq'
    })
    description: string;
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'b1dv2b51oz4d6eis3l1xl6y2wp4kj6nnl0upj6n6ygsy8u40f3eea2dtnlyg'
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
        example     : 'e92b3792-5b0b-4ede-adad-c9631564eab8'
    })
    fieldGroupId: string;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
}
