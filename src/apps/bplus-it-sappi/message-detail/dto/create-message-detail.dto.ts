import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '958b0f58-f437-4ca5-85e7-fd3b52a3dbad'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '91c5b5b2-4760-4fb1-b38d-a11055359f65'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '0c00fe31-8298-4a9d-bcad-c8a21d71f595'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'cc255k32lp2wivgtf8rg'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'p2v5obqdix5425oefwpo9n8iyrjouiple5f5opi0md0g8dlsgxp3paqug2b7'
    })
    scenario: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '0fcb3034-69db-4bef-ac3c-ccc0538650ac'
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
        example     : '2020-07-16 03:28:39'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 19:04:04'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-15 22:12:38'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247'
    })
    flowId: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'wdn1dobvbr4cpxupqh4wllmnbd07ouhyujfy18aepznzcqli5rmbt3okfxy4g901ty47ng53sy1j31dxmeiu2rvlftu474cfz20krvdx7ao6lwvd1lo52jcsfdojhd7c8xy6387sak0oxu25hm9xvtsmwamqh9d9'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '4mcsyyb94330te21r55y6wydk1kncfsmhi4fcqzbabdwxr8qod3nbc84wrx9q5clk1w5i5f0uz0hsujjly1kapu6uksnv2wbb3e2d8579kcid7qbi563u35094dxaj2hzoixqjcgfowf6e77y0f2imzzesb8m96w'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'cjjva2u7lp3p6fdd3i31txbvgfevnhx3qddose75gvvxu27kfolq4bullwn8pggldn4aa29n5lemfr1c6fiv5tnye63t791p55i2klruu75i4yeilfynjshi8ev22vu80wo9ykbguo04b19iifgnb2uahevrahnx'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'gcjrpb5mu80kmslgwzibzsca4g8rrm0n79v0o1x83iowzj2oeeknfmbdshjky62y9gv1lve9njn0zb7nbks5wnlnd852wxianoafjfiew29f6v3mlt7wln7jfzqk3vxsreb3wh0fupidetxfmej42m1j9bkomdru'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'TO_BE_DELIVERED'
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Aut rem velit ut adipisci et. Odio enim rerum ab ullam. Totam optio vitae autem magnam beatae.'
    })
    detail: string;
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'n7lw4ez42gxtas56y0pfzv5wf8bv4pstzxvej3p87m7k8b0mkg9tkia36pznszscab2dpc9t2gcuk0bvf5ywmyrdcruoqq33pt01gguwimdc3zbf7md3s67l2q4vsvch5hnbyuo8gy730cfmk7u59xf3x624g6q4'
    })
    example: string;
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-16 02:56:48'
    })
    startTimeAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : '6fgqh2n4of944juth4gy'
    })
    direction: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : '0jnjbcfahtg3i7fhiucjkvfn0lwgz5l5qgn8wdpm9coved406diergtqfmwbiu30mbcv24zh71k7z01mepo80rluq9rvs45crfxvludxlr9c6ofxslq71uri2ihwr6niq626z8xlh7r8r6twpsw65jsp7mt45d4v'
    })
    errorCategory: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'bo0q5wdtol6ca5cgoj35'
    })
    errorCode: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorLabel [input here api field description]',
        example     : '7asuh4iiz3bb0hdsrhjxnuxgd0kxny63dp03qrvb350z4d2n79v21lkfue368jxg3o28j2xn595iy3mqjxy82ctc8ml18zrzmkufkw1o0frvj5joht8tb2xharss38eakbfuefyx9djipd7yipf43039qit8h2ul'
    })
    errorLabel: string;
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 4183034880
    })
    node: number;
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'nywegkn9f6od31m4h07k'
    })
    protocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'ww1wzsoyahdburxuuiae'
    })
    qualityOfService: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'ix1x0daqw10ra9xd79dhv2pd37wc7zqw568sky82mnbepmtkl5vodrggkpee7k9ufhgv8atpstb5smdu9caz0718m2h2hvqs52eir3liwou6litk53wb4wpkci60cuzma2i5ocrk2buaveguxi6ohqpemxaf5253'
    })
    receiverParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'wkkc27hh8mss4dklkox6etul9blo0dfh6gru7lfgt8niz4hblnjcm4tol54aax9qr56c2f8dd5q2m61epkgr0hs4wj06urgko6hyhdgelsq1sfzujb5dswfuiz5pf155u16vxessc2ykvg1o1dd10kp6q35du0p7'
    })
    receiverComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'yqgdhtjt5au8v8ebc4zyu0gcmt4jarbj2czmj9azoarj8igs8wd2jzz44s8qtvh7k9prtl8vt0960k3b61k4abor0gb798ue7hb57th7rbf4olzihh2zaxgf0xkuhxau1cl165icchasqq5aw0kxkrimzllrgbf3'
    })
    receiverInterface: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'grvxenbymly490k8w2pmzcys0brktaqx3fkw8zf3nqqqzcm9yph65lh1l80rb2ouvw4neoumc3skkthobfzl1zngw1q1j1smplpljbx03n53vs6mblo97lwpxilas9opjlkyrljvlttm45frnlx4fe3prce32h03'
    })
    receiverInterfaceNamespace: string;
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 3190950928
    })
    retries: number;
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 8478204393
    })
    size: number;
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 5079054783
    })
    timesFailed: number;
    
}
