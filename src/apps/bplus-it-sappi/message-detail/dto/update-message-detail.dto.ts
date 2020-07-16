import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
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
        example     : 't6q1sxtiofnrc9n50ut2'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '13go7crvxe61jp683hh59ep35aatlu4gvx8xdqnmg2afme5ilyvfmrudj13g'
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
        example     : '2020-07-15 20:40:03'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 13:05:19'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 15:55:17'
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
        example     : 'wneyoksrk7zwq47253d846l5weku9b40sh9l32b83hr0o5zbuhwr1ji6ibf9wsdtifn12n07seu9j4z6y6r5de00phrkwz8aebmmrbxlg5600f84i0wqys39hd9sophddaembkh8gsqk7jnjmvzvy8n2sgyb22hd'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'gbm4ida9vkv7ask1zfbwhav4ye7l8qjs4a2hhbrvtq1oy37zob7dkeqrl0j9nfahrcp4gy454p1wkz4p2pvsnkzfbvx7wdhm624gw0nmgatvxq1cfyxhknlcasqicr86pxdm2wj7sl3wggfvap1hdphy4tzbvcj9'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'g5b6lccrcst1gfxv28ap3l4ph9xoeslt5ozehjmdzv0gbp60fitpsslc78sza09zkh0jvblsnfx0bc8t67689zp7nropxpozhcj2ezevwhgwm5bkkn00sj8zk2gii20lkxzdi6d0mzdu1fh0s7h7w3wx17i80x33'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'a8t6z0lrotzltgzp2jmzxlc8hj976at0xmbhxj8ku4likrrssy1k2t8obvc41bjw9cr8z8n65wlxrmh3yg1vs88gee0rxtdl6ftwm6uxvj130dbunql68d4m81g653q98bdf69cdm90p67hog1psf5fy2cyuw0c8'
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
        example     : 'Et et blanditiis. Consequatur quia cumque est molestias voluptates animi sapiente. Cum nesciunt perferendis quia illum consectetur nisi ipsa sint. Cum inventore inventore rem porro dolorem aut natus quia. Harum voluptas cumque molestiae ut et.'
    })
    detail: string;
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '1vstjpfb9r93qoslxwoufo6lndkvsxc53zlyfcizq628jj9f37kx03n26lz4unrv0810himeyts4w109noy0768k5fv6ftqey3qjwlp5w8fgcoukjfwbfebg07rwuvi0p64pyoepm7hq4e04avmcdam07ysdquew'
    })
    example: string;
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-16 08:11:48'
    })
    startTimeAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'aene6xyt6ds0zbbk585i'
    })
    direction: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'cf2wialdworv48z7gxkgrbvudtgd2km8f9ydsop8vt74033pgvl75l0rfxyn7syc9gpmebe1evgrud4l070838k97jx38njf1d64bt6jcfptmqrc2n0es5mv82u163wcvej8s3domyhukw7p82cl477xkv8fq2d4'
    })
    errorCategory: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'l23o6x49cv6ate8ffu1f'
    })
    errorCode: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorLabel [input here api field description]',
        example     : '7gyv0isima2xfz7fzvsraf05xltid5cyrbz7j1i1ib9mxbbtp3ynbftabe589cuq8fjd1hr3zous7clb1d8ax2zk8dy65mumo9sqt8a3xvs2r00sotvejw5xtius6exijs0tg1kom2b6fdhtir3vr264yvam92s8'
    })
    errorLabel: string;
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 6817734572
    })
    node: number;
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'qg18ky1gw1btkkld5nx9'
    })
    protocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'u0e2ad9tle9dytvy82b9'
    })
    qualityOfService: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'itfuw8va16cad4pyphnw9kqzc4ofxq861iefo6rqgfzznbfodizng792nkluxnngc9i49q7999jgicegg358kxxlrcho6zv46ebf4cg3ls8csj03lqogrstli6d5cb1rkduzz8g3qp7wdiiu1oeqg0m5bxp9c3pb'
    })
    receiverParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : '22r0n3bvmxll2cwqtto3n955yzp2g1u9hvrhvrqtnw89vvn8xptsdqakjekym7im8hxupdhetsa3hparjchkog9rldier362tv6pmwixmmvhtprc5o9cl2gjg5c3dh64q525unkj3ukbd8pxm2m4pi60tjdpdqht'
    })
    receiverComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '7b02ytejl54qmwf4osg1w9wi0adziyv0zhqrt5rg6c6jndh2ju0gtife4bxtdt94pw3ah172e2z9tp8sglw3x4lb92zoqvjmjooy3ajm2zhk3yjkdmip1a4vh47w4iidmb7a6eox7vn7okdtazsilrr2r8tx3hyo'
    })
    receiverInterface: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'bzpu55q37tqhmujcz5ofv3zyp1dyq64k5qhmd04e86mxfm62bb9vh1qvdvm400naizl1bm8eth3ii9k7ovx7pd408s0jbqai532u4tqvjwys2pyyn6kxosbvrcebm657iv1tqes2hzet5ouz31y0herbhq12dlzi'
    })
    receiverInterfaceNamespace: string;
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 1321043528
    })
    retries: number;
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 6843027158
    })
    size: number;
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 4494231484
    })
    timesFailed: number;
    
}
