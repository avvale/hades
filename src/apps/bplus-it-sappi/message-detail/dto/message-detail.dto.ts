import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '79de2087-0846-47b4-b4b9-5182a572d36c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'hjiz0b0nn83bqlej959olwee2ygepxixmqcq77ucdejeo6v2i0'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '0c8af42b-fc59-4d94-8b23-21249b593a96'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ihwkm0seugxat8r2n57w'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '6hgfyvd5w20m29901gtu18i9erd2qr7p8migv6o0qja02bsk8ctyx5dj7qcb'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '18891c63-0400-4f46-8189-1bca175e4527'
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
        example     : '2020-07-27 08:52:24'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 08:04:16'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 15:48:11'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '69475263-2068-4745-a249-c0e37746e355'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '8ahzhxwg8r5zzh5srcthjsa0yuxsgx11sw3te8lwe40igu3rjw0ybncw30icm41xwo28q0el1w2jhbxe07zccd98zovw63a0z15rsl6iwzrw0psgtxbvjzd1te0fjr6s0vic1ccvnws9t3ysy6a8r3q2l9gyh79e'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'ufpxcy0nfqq5h03hecmpqa951rfdyvtymn90uyr752kxjgokn32rs0jx9f75dgpp3m958bt1cndotllsvnhsujbhfgwpy8pbwldqr4ddumpevr7i7jwr66hozc92wsskhkbn929jcm6tc1m37m9u94gcjei5goh6'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '9ubw3ietdn1by30sficukb13o51azq401d61qplu5rkjz412l4vy12yqejwoel51mby5ayl9te8xziosc0qonmcp5kypdjnur3cl4tl2v2z573fjqbqs003fk0sdgml86jhwkdplmvx35qb6ccjjlhhk117vsqse'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '78tv602ouzxoyvuw2cjflsr788uddx8wxbf6kzyh456qpxhdt0cp9lr6aisnx2w40cv8usw9dnlpyd134zyaag3qzcza3rosz9p7ivx1ykj7xn87qxe220l7lk4yp7ehdjmil1kq7maptfwn5vowj7wqqxzvpwg2'
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
        example     : 'Et quia quidem distinctio dicta eos. Reprehenderit officia nesciunt in minima quod. Nulla quo rerum sed. Aperiam fuga mollitia et blanditiis praesentium et nisi.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'l6vx4ojum0u4cgowlyjoau80ideuv5q4yvebwap2e28ecj3nggne0iq5lwptraj4wun8s7ncpfxs5i70u5pxf3bucjnguco9eo9mnoj4hb5rr3e1z51c3gknbsuhtl19613solymkrfms3s0a5ceji4dtrzxt6xw'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-26 17:01:52'
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'OUTBOUND',
        enum        : ['INBOUND','OUTBOUND']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'rbxls9jxx70pjo6chh1tv3hzfnxkem6e1req7t021kwa0ytsb7yua6ele7b4c97fcc3cyn5nykmpx1fi8mypc4pj9mogahzwjkill3w9pb6gyh3lhnnd39nkmapxlbvzmkjs51e9ty1mmhdan7ycy43a0it6q8ns'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'x5q95j649jiekek0iu8f'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 890666
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 8384405902
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'gubf8o8bdh8a2xdxd3b3'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'gtt5j00yp40n474puf0f'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '32seq0v0yjkjj0ilzedt4h0scdqnkj5rejwrjp9xoenj4v3nyw9ubbyo3wr782x5ze32u5nehc4rlw09zhkm6h9vxnpm3u46itykh36yi73gma132uaglanpaomfjm2k50o3ikjea5prgkc5ynnrgkd6k2sjwcq8'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : '359mtpqrncw67v3qa10wrbf0lx2eywiqgbp2e4masknu9geyb01w7gd8ar1j0gay4kdt2jy6ypwtu49hfwddivrqhxe88n11o5cbzrpbpxkzx7qmknghmfyqnhf107e8hw26vnojocrnvle4y44r4stb4gm26z0h'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '0svad498a1uukl9p7u9ucxol1o38litabxce159iflu7pjlvzy294torgx6n3uizui3ibovfgivdqv1z7nxz157lwg5mdxti3jgh4ak2lcvncwndnlizy71rn5ciqzzpn7lfudjxbr84f24grcly5rpojm7757nb'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'guwp4uut94mt6qs9w247gsy0j7f2ncvy504gcrm96kxee1jgylu3jr3wt60z8le30dfdspf0evqsxw5v77q4neyeth3ne8s51zc8bgnh9ojvqhroxxu6czlvygur87cap7pf1gahsvmrorsgi9sksbb82v94y6ky'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 1553576011
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 1237094247
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 2733640668
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-26 21:02:09'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 14:02:41'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 09:58:03'
    })
    deletedAt: string;
    
    
}
