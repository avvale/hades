import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
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
        example     : '2hhhunp6c1eaij1fbpg0qgz5q69e28c2b8m3x8aq'
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
        example     : 'x9d2han8s9yp80ur0yws0bdv52rlnpfc19sb4zgx4tg4zo2ecs'
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
        example     : '64z2darpn8y0p5uz9dj8'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'wkfswz2p1f40lmnerav3'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'me8khk390ur2zsiyu5buy7u2dlehtyj218g81zhzb5q57kv3h5sjq41i4bt3'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'qpx0vysj6x8xcd9iww0s8m7gbju1vs6s6goa2q0tuvv8em81qerac7czipxdgqg30oztt3i8kcgbi0nkch38a238ddf082gehn5s6d3m35s0aren1l2a0ou2kqa5y097dl14cjm2prxht7ib0wj7hn3adsxyfgf6'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'n51co46vsonynszhaspfh26th0hngv2o9w1gto8snxffblbkk9sddro3x9hjqgwkbb83c1fm6zvlakstb3bd658b92zhdrx9fv8gsl77madunib1v41l2b59ymq1fxx21u5fn18lwh92pbv34npn835opdb4rt7t'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'gtynsl83zpaav1etvb2pbjtd4suz9sadjemkn8vuxk9x8y1mta0615356ace14q9b1n78yu8gxj133uvsttib76smfe30bejfqyunx1gy4chbl6rhfs46gwthjtw9o8duc3fjgqm37abqwh7z9v4uvc31qfouqkg'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '3tt75lbmr2fwy24ash0vyw8hc49fo62vxyq0gqrcc5f4ndz5uf23znu6vymb3ggpug64mvafif76nterbz6m68hepw4yk03l577pkd8qdz1jow60u8awsqxicex7dlp64hohhcrsh4tn8wbgnp11b6qv9vek047i'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'x0p1f0c3nx37asc3o9gikj9wktjxz5eeeyqsddbwi58tn7qyn3e3n4sol5zxoidi82l4h3ytys1t7mkvtrzvv83djp0jlvjhouehs8mh6pk7mkafo3gl7zx388qbme6a9dbwj56rss4aivlj7yv81nccn52jeria'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'us2d82ulwm9xctu44zrr'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '5q5ynd8hsqqtf8s22j2g'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-03 17:44:06'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'hrducty9ueulx8dviirsuha07wo9meydblik6fpq30ne7s7nen5iquj8bwfh8a0dsznqvbxlrl7t2r1y4hhxynu63mciy2sb9r8mwfdmnkggznbbwuhv4qj9wobc7osocr5cz0l3xaedvk5un7y03hqmhl5onwebmbslb2mspngzq81jfs2dtv8cbj30aguyi9hm19n5f5j0cdtie0smec6ip5zduknz90tzcbldbt3bkuxexs46xp72lnpy1lh'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'q8u8nt1q2das8sk21gkqbet4ohi2dk49vhfeu9xw37zq7j3pgoyk4jornm1gcooeejxl52zal7wmefc7iss13orrnei89vszdl3wnzpf77l0q1kv4ibveureg8m4aza0vily64n7sgxah4rv3c8si5kig2yollvn5syx8mllwfsf5nr1h9z9qmji6m1y4mwb9o6gr7dvk5nz1rrapwpdand1spknsqydowutyy5ts7d1h2avz8u6u643kdoulz4'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'xlycdyxw8gdnlwpw5jcbkc7olrpwg7tv9eplpieqic1kcy2p7p93z5k56r60'
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
