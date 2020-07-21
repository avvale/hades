import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '45700825-9f4d-403d-9d36-a21fbf331a93'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '136c296a-11a8-436a-aab6-0a9f7e4c22ee'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : 'f0aafb29-c406-4ece-9787-2e632eec3833'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'ibzzrl8pjtzwfry3r8dm'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'scenario [input here api field description]',
            example     : 'uwmzw27vg1d6cclv2v6f1migfs3ukpr0qfyci0llnprs1wr0ydjwuz2oft8q'
        })
        scenario: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionId [input here api field description]',
            example     : '784d23da-a6b7-4fd1-b66d-b546b3825386'
        })
        executionId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionType [input here api field description]',
            example     : 'SUMMARY',
            enum        : ['SUMMARY','DETAIL']
        })
        executionType: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'executionExecutedAt [input here api field description]',
            example     : '2020-07-21 17:33:28'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 09:34:45'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 14:15:19'
        })
        executionMonitoringEndAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowId [input here api field description]',
            example     : '90a21551-3c36-445a-ac70-43eabce33ab8'
        })
        flowId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowParty [input here api field description]',
            example     : '53mmd4i9og8vm4fj4s4yieiq6t4xl2erdio2u7wo38rc0zlfpmh4flbalinzuh95vq2n62gi5t5epniqs4mkx69hlc83j6tf7yii3uznjqf343uquvlxp5q4ovc6u5zauizdzybkt3sb4ecu6e2klcryr29xxdnm'
        })
        flowParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowComponent [input here api field description]',
            example     : '5bnbst71vk0jbfuvnvbxdwjxopw2uzzgzlg14sw975bcnzh5uru5lmo7ms7xc13jp990pr9176cdkxox7gg5xt1mjtjzgvcya0hdgb22fkhhfki8o2zkh5lsz1dogyitf5tqrrfclhul5xsga9h1ov7uu9e9yp8x'
        })
        flowComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceName [input here api field description]',
            example     : 'y0nrve4pybstayrwnsczgppu0lco67t8jcaywgcakujks5d9jkcokr33r4sri14mp20b37u3rq3wtbdw5isy5bmpbomnczyb8h43c8azek9vy8facdqcrztxrs17qc5ieyqfu47g0nweojvcfivnpgwcpbf7pxvg'
        })
        flowInterfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceNamespace [input here api field description]',
            example     : '1f5iy11a8oc0frsv60b5khz2sr8vlaxqv0xw279lmenz6p8x7ae9d2iwrlt864t5wjsvjcixwsy7to1j0qhkxcl26zjfsoveecoaozeb3xxe4d592rgl9t5v7o8jtaff4w2wo8jiausnd23vty8lr10xi4w2bh4w'
        })
        flowInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'status [input here api field description]',
            example     : 'TO_BE_DELIVERED',
            enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
        })
        status: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'detail [input here api field description]',
            example     : 'Ullam incidunt provident non sunt nulla consectetur sed blanditiis. Dolores dolorem fugiat quidem ut. Ex facilis excepturi quam provident non soluta aut quas officiis. Iste cum rerum excepturi expedita vel suscipit quibusdam suscipit nesciunt. Et voluptatem inventore autem qui corporis.'
        })
        detail: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'example [input here api field description]',
            example     : 'h2dmngcl73qfk21nigm2j72aofg9bwdktlynhywtw374tyu1qzjpuzqxceei60sategi4drujfjpqd1u2gk6n5t4hnka8hgazm85m2moh5bywccf36opcdaye7z399vgt86dtxj85qqr8sdadk479w0ybueeklnw'
        })
        example: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'startTimeAt [input here api field description]',
            example     : '2020-07-21 18:18:39'
        })
        startTimeAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'direction [input here api field description]',
            example     : 'vp8w4zqzufg8cwiu3e31'
        })
        direction: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'errorCategory [input here api field description]',
            example     : '4ue9gu9e3cx6ftrhahh7e78c9l18v127xfr5vahkkrefdes2eveb26suf6d5hccah4fnm52rd9fvq867lcwnmwi6kwckogc2a676ol7thp1ugfmx31p2tvl6rtntmyfv6erjevjm81o27clm1cyutaz11ybtng50'
        })
        errorCategory: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'errorCode [input here api field description]',
            example     : '4spv9ixmp06borp2507g'
        })
        errorCode: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'errorLabel [input here api field description]',
            example     : '48fgeerqc8xacsj0rlwu72cw2x28vhk9ns5wiysji5itv5m7xgwg9htnk9s3zacfnwqo5gd9fpx9o8i0o4ik8a0vn2op9cjb93g0iszg2didgf4xuji7pm1uew2xq69ags2jar9x8hsw1ptmuiz3kkohdjlc2z1s'
        })
        errorLabel: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'node [input here api field description]',
            example     : 2482030493
        })
        node: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'protocol [input here api field description]',
            example     : 'zcvegbmqbi3tjrkyow89'
        })
        protocol: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'qualityOfService [input here api field description]',
            example     : 'gapp75xr4s2ccl4cuouu'
        })
        qualityOfService: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'receiverParty [input here api field description]',
            example     : 'hv51cwvk763dny8pm2hodv0a7z9xzgzw36z5h4mshvcja452wogbbqpp5u6mbm3jyajdprcdxv8u458jp1omw4pgagez4cbf8jn5uqz4cu3q49nd2eh64dv0qmv6utdjoqvpb67umsepjusx1oi6qg3o8ex9gig6'
        })
        receiverParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'receiverComponent [input here api field description]',
            example     : 'tgg5c5kkgvkztngp1c0t689hopmx4amg6up63xp11a7qccjtn1uaj6nd9sqebkl3bgw92d0i8f6hlalidkba48tw3yd6iv4ugl9rv330c0ytasrsbj52pz6g026rk920veox3est98k1mpsu3g5ycwsrpp10ptkk'
        })
        receiverComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'receiverInterface [input here api field description]',
            example     : 'fww8yq3atismbgpkx9tnj7j3cujnpzb2olw2okcs7b1ov5z1gkpmd3bhi9u2fhg90ftlsf64dbd5kmbfu69ot7bfwvcrzrdf55l70w397lirpi7oncmlzyjh7larvp6wpmq3uztv5y30yd71c4u4qmnw34in60w1'
        })
        receiverInterface: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'receiverInterfaceNamespace [input here api field description]',
            example     : 'r86cx0mxv50usdyoavd53may2d2rqb26bgtkpw248i8gbdc4s0rrzoxo80q1v1792tjdmb62mikepue7momzyuj5mkevjqz82leq3ndfqc1m1b9mbfjhkfuuyi6fcmywt3tpo5177p0uyc7kg53s40y6zjxben38'
        })
        receiverInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'retries [input here api field description]',
            example     : 6884635548
        })
        retries: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'size [input here api field description]',
            example     : 5423440034
        })
        size: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'timesFailed [input here api field description]',
            example     : 3002651924
        })
        timesFailed: number;
    
    
}
