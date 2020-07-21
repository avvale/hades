import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '5492a0d1-93ac-481c-a5ea-33c942cdac16'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : 'b24766bd-c188-42ec-b6f5-747b702185f3'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : 'bf59205d-9028-4ccd-a453-f436c46f860a'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'dc7i712g19asz2tf8xl4'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'scenario [input here api field description]',
            example     : 'oqxqzca8p71bbw34r6cyqk6jlb4p44z0jx6ut4brjdekzpd5m3uc6wlmzi86'
        })
        scenario: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionId [input here api field description]',
            example     : '389d64a8-c605-4c09-b81b-8262809c4117'
        })
        executionId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionType [input here api field description]',
            example     : 'DETAIL',
            enum        : ['SUMMARY','DETAIL']
        })
        executionType: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'executionExecutedAt [input here api field description]',
            example     : '2020-07-21 20:43:23'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 19:12:23'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 23:37:01'
        })
        executionMonitoringEndAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowId [input here api field description]',
            example     : 'b98f55d6-c843-423d-bffa-f329aad7550c'
        })
        flowId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowParty [input here api field description]',
            example     : 'b8ypndxc9txaei0det75gdpk0p0vejwpeo8v0fp3k9892myfs7r12osek4o8puz3hdcdeg3bv4ppvvy4xk6336j1uaetxn60pkmqjtpeil9xmp8vrhrgeqdh6jtczxqkbey1acgxkcm8ko8rqf584k74pdjgo75x'
        })
        flowParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowComponent [input here api field description]',
            example     : 'yb7yk64uw76rc8mtr5kenr3rh5xttl3rhkn7tatv1b5odep7yytkflh3qdndnlysx7cfn348cnc47e0oint8k7gpx5usbjs2hdbo780e1ieurfoqz9p75o85pq1qu5vteg25rrhksatyuj82ks1tynnqzlug24ma'
        })
        flowComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceName [input here api field description]',
            example     : 'fwictu6zd9arsm8q6dcg6xu18gvcuwm4to7kv3l6akne3ahbutotd5ohy9ua9vt2redmpf845yj08ga8zak3j9vcm9fz5ajcznsnm5nl4rk5z1giiy5khl96ihwu79kf8prh6jgm6900mv0u9c9tkohecv52k92l'
        })
        flowInterfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceNamespace [input here api field description]',
            example     : 'vqaodrmrpnts1t21jvbkx0ypxq29o3x6ay186rpfc2sxx9sus7c7fg2x6mispr05pncwfkb6bb0ut5svnogmoalgbsgawxpx5ineyef4jn2k7k56v4mzr7oz1mjy0oxpkb2khr123y7fk8275by73clacgbra2ab'
        })
        flowInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'status [input here api field description]',
            example     : 'CANCELLED',
            enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
        })
        status: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'detail [input here api field description]',
            example     : 'Incidunt excepturi rerum. Blanditiis consequatur et iure cum laboriosam error eligendi labore. Voluptatem architecto voluptas numquam veniam. Error nesciunt quibusdam.'
        })
        detail: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'example [input here api field description]',
            example     : '6zregagxrrp9fcrh5kd2yxkofptmw7nvvnn4alz5v9kr3o31nx9gu7ui7t97b7ft8d4i2l93x7hmiu5ocsac7kcbyvzsug5aikp9822pu1hu0kqsyy6v0dofdr3dqvm2w96iuyecfcaeqgj71i2v7piwm47vtoy2'
        })
        example: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'startTimeAt [input here api field description]',
            example     : '2020-07-21 08:52:51'
        })
        startTimeAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'direction [input here api field description]',
            example     : 'am38dh74acs1bvwvcfea'
        })
        direction: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'errorCategory [input here api field description]',
            example     : '5j7hc081m3zcvtx02psv5g0h9ub8vzurr58bm470tk0r83q86z1j2bqdal8wfkzkmsjqpnkomvm1ajy3kvboli4obkotugpnwzhr8bbfl7wsdn6bctock7ngny942ipyhl3af93dkxv5xrqt45h0w6oa9ofngkbe'
        })
        errorCategory: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'errorCode [input here api field description]',
            example     : 'r0usmppok5lq7jsbhz3n'
        })
        errorCode: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'errorLabel [input here api field description]',
            example     : '1nm0guznmuew2pw7zpbveryv2lbhjzu9novzplu0jae95ronkyn9etlbs5nmjixcwglmkjnta5rqsnvq1bvln7a20y6b9kn9f2qwf9vvcz6kljbt7tbn324gx8atuw0hru580bfsouqotg8rt3xcx8nh238a44sj'
        })
        errorLabel: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'node [input here api field description]',
            example     : 9391217797
        })
        node: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'protocol [input here api field description]',
            example     : 'c73zofk4kx9hiddrsobh'
        })
        protocol: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'qualityOfService [input here api field description]',
            example     : 'zlrvk8garcn9mxtvsrtc'
        })
        qualityOfService: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'receiverParty [input here api field description]',
            example     : '3n9ass0aylxcw99in7unu0fztjiztgue7scpv3wduyh70x3xbwuk1xdesy2xbcn7zaisk0cnnnh11cw83o9f58vjd6kgmbnpwdxnwr8et2nh83aqyf80k1jikxhnh4pwya2jbcxxn3weh93cievk7m3c97o61k3y'
        })
        receiverParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'receiverComponent [input here api field description]',
            example     : 'a2s18y9ih48z0jn4ouzeos0pd04alybtut6qe93ydgx53dxakeieidv565xoyvsie8h6fzn6f72dseftqvxd1989p4mknu8bsbqdc1yqm8e6csahxsmyc2zvuuwfydf9w2uumyhppxfq7xn9wwyc5xvneeni896a'
        })
        receiverComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'receiverInterface [input here api field description]',
            example     : '3f32h2ak5htu5v2ck9qzqwkhcqabw2et4t55ydqjgy0wdhxukryng5up726ffu9jhugibvvz4jtnkjmrs2ar2gz7zknfr0slh7t0huwdbj7s26my4aen3tubml9j4trga9w4mndice1tjlmm1zby43sj1py594nc'
        })
        receiverInterface: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'receiverInterfaceNamespace [input here api field description]',
            example     : 'nihfm8kurt3b7hx029iaapalt2zijf01h4x35mt1medt8ivagbfetq2vodz4e6frv2rqagkaafzr6ur59w914qqkg7j6rkhmrsg5buwgrl03ag0fxmf2r79lnl6m0560q1ffyc7yue4nr8lg010kk7javz5n0g9i'
        })
        receiverInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'retries [input here api field description]',
            example     : 3100681625
        })
        retries: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'size [input here api field description]',
            example     : 9411036497
        })
        size: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'timesFailed [input here api field description]',
            example     : 1628618351
        })
        timesFailed: number;
    
    
}
