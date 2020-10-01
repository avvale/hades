import { ApiProperty } from '@nestjs/swagger';

export class UpdateTenantDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '235f8cdb-d652-4a2f-a996-8a729d774e90'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'hdoyn4hej6x5dkm7jtniudo5o4mjytdf7hi8hujavovjpq953pm8vy614ciksu06ier8wmu3afkniw5q1rbj2gu9hguxvh1rxli1prqxzqmjugr2u4k42etbiac4nq4hyyhmvto40k570gn455tizszj4tfm4nhd9b31v6txfjmwqjmtyeapna7u1c9ssqedjuwl6yz4dyp2bjqm7j21vmjha4rwnytsfnmmqh9d5fw87p0grj0izjggcudg1ha'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'ct2wtoomksq0ldgyqcktmixhxlhxu8kf079pkuiqahmx2nic3f'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'logo [input here api field description]',
        example     : '2n22emwui6flhryf4jfixyezgaht7raeace8lzs00td088i6hyghj2u1zjfw7z1rbiqp399nuo8kc4sweqses4qmso7dbj4buzgd9gxjxflp8isyxpk0sizz5u57tw3efa5jf26s98k4xaro8s7s7yoez37wu4dni34lrlgrjrycrf852bljsyr87hy508duemszp5qmrugl63sr2ndp1huvsnu2joqmb028meclwlgtekz6ay5fy5856srocmx'
    })
    logo: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'accountIds [input here api field description]',
        example     : '',
    })
    accountIds: string[];
    
    
}
