import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '794001b9-8cf4-41dd-a73f-15418d3472de'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '782585c4-40cf-438a-b856-3d4028f1ec38'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'vatdux0mb1nwragqpr6qlm1rj08bgqe0obg2cb9d2gtq3z2mzu'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd2492e4f-c54d-432a-a1e7-5bf6fc002707'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'p53r4tup54hn9af6fti3'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 've834dr6ulaj3e2xfr6rzq97k8oc0phosmck8xkg5jgptq40kcuegbroez01'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '4iht2zrah84f77vylw580z6644k43kjkkpkqn98ytv66df4bbaanr790knfrhwd78rvvrkcdu2bl27bli9rwlkvwyg6lnefs3zezfo3lzp0s2n52uu9hxg33buumf0i6d1zi7hpv0j72nmhg7x1bgwxta0ttl9yd'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 't2m7gxub9d7qx3o1crrwfsj9m2vrire7d2zh3hy152b4vkv6tahmpo6utjak7l8izi8l97lzyhciifvy1qx112w87uoz57ia57ebai6ef1xhgdu8khwmn335qji5pexm76acnn1lz3idluzdrm24e4zqww0eqh8n'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '1789cgb4tp7pjg8zni2aqnh9xt3oehhf5l5tp5ugth5ocre07robh98h4xr1ki7vx309pxhrhbn6vru42jmfo957r6mmabj6z2hw36mgwfwo5rrhvhuggmoebmqq1nw62km1lulysov88hj88p89awivqeq9f0pd'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'ifp11rajx1pqqvscc4eurm10ttuzrd6y0kzhvmc1ft4wofi4h9yszn9h3kj4xpi7gazlumuazxf8bx9ik6ugrdhik7nd25bb8hnktkdzyvor1p5o1ez2reudr062hbzs8d3tx1s32otwmoja0cny0vywgs2hkr9d'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'er21lhfmo31sedoj2hat4age435h7flkkd2b6su8j7112xx1o47v9fmsbwerzqnvs6u70oevws57jn63v4yl7y06xjkhm4usdyjkxv0vy8c1bej9kcazxel6097wyunlagpcpu7efpbsetv5wxa3ffu0pr3fvix8'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'jxf20w1uewkin182ra15'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'ybhwxxo5a0t8bde4p63p'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-23 23:00:44'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'h5gdmryh3ij7px5bhi04s56e64i8t06yxwm1xjru6lwey8izx6lrg0icu6cxvvnnny6b8tfe2gulceqvgq6q1en9aoy8cypah5bge30kfbav12zeowwivb1ks4j1ztts0bemnnzz0qjfe1i8ajj4ygl67d7eijvi0wean8emztgmdi46vso12xwg4th4qa42fxgsx26am3362slm6y4lw5siihwk23mt6os8gqq8mei0gn1kuc8g8qfbk4z4b5m'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'olvaxb51pp6vwx0aou9thkzjs0n08b3ng0ef6op2y8wu0vacgp8jqfwevyuofvydqgviuei4rwt38aqwmi40ofj43jsrd0e24rwg5o2gozuaw1j942u1r83oov7zgqkxirxbrfqssdabpcgfin10gqdo25gm7y6rz83w2i1xgsivce0irrth0i0wjtlmpf3cootomm2eswqhgnix9q2oqhmzaj4jamkmqzvzhi53v6720k5tlrqfd4bycl9q4c9'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'epts2tum26aww5hprh4mgmss6e0hsayzqqbysfq6ckit5ud9ajtqi6dmn0kc'
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
        example     : '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
