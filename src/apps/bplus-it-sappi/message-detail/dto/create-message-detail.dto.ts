import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
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
            example     : 'gyrarc53bzj8td4jbckc'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'scenario [input here api field description]',
            example     : 'bjr38qo3q4gjzz1rnnlw3rkp061l11cxieyt4oa96jqpyylop0k2fixwo56f'
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
            example     : '2020-07-21 18:03:08'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 13:39:19'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 13:11:05'
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
            example     : 'n8o30xdhfcd57tq1y5u1tn2edge69wfzimf5w7wm8es0axa25benaddf6yzs35zko07d5drzq1u5uxjdc1edadmtuwvl63cmvv4rqcngdugrrvck0mu2qsnuawxb8ylelqadfg8apo996463mmi6kcktn116ysqb'
        })
        flowParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowComponent [input here api field description]',
            example     : 'nf8tqf2djyqfdggk8sdytxp0o6lksjojm7t9r2wcrwsn4witgj10lq4lrsf5s5xkcnwp2prxwsgrbskurohtefcoz020bwsym16w9a8b0kv1p8dgajk3aoytiajh5pk6cba2h8pw62y7d4ybuvlpkjuohjzdru7j'
        })
        flowComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceName [input here api field description]',
            example     : '1825wv6m4d76svgkm3ol877e4edwcy5vz5t41wyymeczk99h0fpi1kuoi3o0ahieaves9p0vb7df3x5s6sita3es1msvuv2i3irj0svzn0e2vasb37cwmlwl1cgdbjcrrru3ek45lnivx8bvb51do3ks33hx7yl0'
        })
        flowInterfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceNamespace [input here api field description]',
            example     : 'urp6vqccjg558q2gv61g2jxb4jirzu7qc4srjva8cse21h7b8pc436kcaabce52bqr1l9gsrgjpl1y92sebd40ttr6ccgemdi12dkfmk32y48bxy4pfkyca0xq8teu3wa8nzmmldmobsxiofi7alut36ecd05bsd'
        })
        flowInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'status [input here api field description]',
            example     : 'HOLDING',
            enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
        })
        status: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'detail [input here api field description]',
            example     : 'Culpa consequatur odit aut placeat ex quasi. Sit et aliquid velit placeat sed tempora. Qui sunt itaque ipsam ut.'
        })
        detail: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'example [input here api field description]',
            example     : '7p5ahhpfb6xk9hpehdvkn26lgwnmvnqyl86acrac7logsoe7j3qri4eaph5vterr6c0t17oolsqtbdyjhvzdsmhqlqd2siyuaabt4xpvehgxmhw1815ih53cbfvpn7mzzuc8n7zeoangnidizdd2v2pcsokdjkbe'
        })
        example: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'startTimeAt [input here api field description]',
            example     : '2020-07-21 12:23:13'
        })
        startTimeAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'direction [input here api field description]',
            example     : 'bikldfe6ij66t69row55'
        })
        direction: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'errorCategory [input here api field description]',
            example     : 'e0yctj36gp83klmqt4ylnizsixbpgvjpclii3oo7zaia81ir6e87re0m526gdxubel130q4318nchbimyffgphv6gehnpb0uv5pn5tu0yz6wng6jxvy3nmp06mkj3zkk4qdi69auavb3zx7lbial85i3bbjwbfqf'
        })
        errorCategory: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'errorCode [input here api field description]',
            example     : '5a356huvucompw5jctpp'
        })
        errorCode: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'errorLabel [input here api field description]',
            example     : 'azayfx8oiw2434npanmayqkf91cn3ls7q1qlfgms0e1s4x2qz4hs1cwwx2932lpi2gv09e52e27epmi1z8rf8aqopr7r2hltdzh6pv6qjk3fjqevaxqoc2gxpzaenoc8wvdglpvcwkec7g9lthcmh9tgxgpgg2pd'
        })
        errorLabel: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'node [input here api field description]',
            example     : 8071536873
        })
        node: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'protocol [input here api field description]',
            example     : '6810i98gcpgr0edip3a1'
        })
        protocol: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'qualityOfService [input here api field description]',
            example     : 'wkhrddz1prcekplcbrnq'
        })
        qualityOfService: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'receiverParty [input here api field description]',
            example     : '54zzd4pjdqn8el7zdevq3ifow09et5p1lkl8kis67zel0yabf1otibql5skwwdzra6avkfbuzf2hrfv1mns8ojze0yvyqbkcj6jprcblujbprzln15882whypb54rmjqf4tilk4s9qmwevzlyngcp551swfm0te1'
        })
        receiverParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'receiverComponent [input here api field description]',
            example     : 'vy1a3jkaaa67u392gc7zca8xzxk8ziauoy9ogmamdis7qac3kp3jkoepcw64qk5tl3m98di4tpnhr9dvctggwkefjm8we42gfbyw93p7e49qsglspba89vskrt1vmaqbgftt6d4whssgn808r6np1tsatgpz8qxw'
        })
        receiverComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'receiverInterface [input here api field description]',
            example     : 'g3pq4jte1tsix0qlgiazrkmtv6qwe0f5z154gvcpgfywv7p69udmm8n0nub9zr1bx3yil1ipwskkx1ygxr9uzbjwc8z7lkb5hjb4aukhfzh3l76zb9jig7662343703lh0bwj8pds90r52b0gc0neo9wzoh4kc98'
        })
        receiverInterface: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'receiverInterfaceNamespace [input here api field description]',
            example     : 'i2b0fiibuir2tu9akaxblb9kc1ce7xsb9iya465wxqa1mz20ydsz5hcxvejamw5pehpdzq2me1i83oq8kupeg14ugmnfgrwgekldfxst4y04hcgyk33x48r8bbvbzadi55hkws40u6qdf28jnuv2y3q589v6l20p'
        })
        receiverInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'retries [input here api field description]',
            example     : 2196539932
        })
        retries: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'size [input here api field description]',
            example     : 3521226771
        })
        size: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'timesFailed [input here api field description]',
            example     : 9283572911
        })
        timesFailed: number;
    
    
}
