import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'sf3qu7j92joggxfjky4gmv4ki83f7iovqwjxu973'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '83keocvaywebuvzhf5el003mkmf527j4wmuqkua390fbrfzt18'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '6vx6tzo6enc6ze1lwowx'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ysfnzeu97uwa84p0eelw'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '7d1llw13zbb7izsakjs7chohdbeczdfh5fb5duvdalelczvfnfbth9r0rjde'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '7ph7ovaqan42pdj1gvkp9ea2wr1rm1h57bclujq1ggqjyd29urvfvigrsdjwouyx5fauksk4h1gieed83ymdqj3ypjs0sh8cnkm74off04t6uv4vr2aane80gdng9jl90396rlo3r9tyao1ny5a9ykzqnsakb3nq'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'm2vlxnsx8ny1qgnzdohjti2f74ak6ygwhacvs3bhzy3ew5nr0ai54qae90a7bgim8tzuu5q5ox7sd4su2dz0a3mkpnny8fvv0t3ggt6se5rmmg22l8z2lnre92zdkt6m5fqp9jbtunyii44neu9rhn148vudxz9j'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'b9so7ixtggbn77lzhufhwsepja4nb5mbgl1jye5zbcfpmthn4cz5kfor7hy7yyvtdg29egse9sox0gu7zbkbc7k1003wqn5lc5k0soxa2muk4lv0ue2cu6xwbjle6x0r3spo1hk18w7qj1poqn1dj5qfqhshdmyv'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '7y4rfvobj7g9gwm87x7hxznxg5oaust7hti84rq88chpt8z1zomwm56cnnu6e9upecrpjgn2v1cfvybxgrodco05skdwho57gfjhza5p4rreyszh4l0mz946clskrrf0dmtcjfmvgeo0vbqjlnkl65qr9t8yxdld'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'kdl5ns449s81a4tbndtvvdg0h8x07y3aoqow8zvz4kmyd282b4dmc8m5c1t0lt7cj1xl5ayq9h99j22c7tm8ibljz5zvcayz3e5eim997eblrr0pi9r5xhs6hld3vjl02eq3tkw505fkyyr85bjuhxet6vcrcs2y'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'xhxwl4sqhxjgucl1xxmz'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '00hrsdx6tx1hkeia2tdh'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-03 05:48:04'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'zunh8gus27kn0x9gdv8n1ykx6107am761snb2zpyiaownqjg84uth2qq7wbmp850u6qixuzeaexfez11a442k1y743vt135z9motfrgv7ibet54ysaineu2mwky0dlrc3wvg4951tyjpckeme3ccr0239h906k3wmyh5g21314ratppni4z5hvo6ywccy1q7ml5omsv8k8esc5ys03zl9afibb5b9q3t67chu4h6jv53e18wm9sfvjefy3q864e'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '5ly75yqwzfs22to52j8s7sg90lfldqsc796z7h61k3qw79s4b65palohvz0odcnml51gcjhg3yx21zwtxx0rq21pa7dylhjkjm1c9xe1atuzag48w8m4tq0ql1g9o00drcli52ivnzl7zne4izhuotwogxqd07gcptewl7h2bnwj5qncdig8e0fyz1ci3dzz8mrkyv610kenm3nlo0en45007j6a432kbh6klryftj7dpjcbhssr2a51my1jai9'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'i0v8e8iqrsb59d1adu91vsgga9xuzxze8qqmjqu4tto4c8h41t1bmrpekjgx'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : false
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
        example     : '0f49570a-fb86-434e-85a0-9c4dd9688a13'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
