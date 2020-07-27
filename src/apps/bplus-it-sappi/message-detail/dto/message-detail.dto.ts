import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bf064a56-7ef7-49de-bab0-317061aa44d6'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '4caf00a1-cecd-40ab-8e5c-9f917e1b325a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'asjvzk7nz8mrcy98khbou7phcb05w15dy0gq6g446xfhxzzysv'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a470222b-345e-49ec-909e-c6cf4f2d3dc7'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'fe06b4qesvh1ugm6xa8z'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'n4w9vpl1f1plxv06sh9h231owbkpbuv8ncvr1y037a2ldnd64key0r977t4d'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'ad882728-8622-4458-886b-6c7a769d0410'
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
        example     : '2020-07-27 17:26:57'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 04:08:54'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 00:50:10'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'eaad4972-1832-4740-a6d0-db4ab070d351'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '218gr1uxrm8yr4kfxmwd9whmqkk3d36a9bij7b556hbt38vnji0saqxlnkmkw0kwa737wc38xp71op4ik4bplkyi01s5dsts58agscqf6gz2q02uxk0mvlns7rbknlgu4lop0qljn13t9kxy2z5tlkfbo4ilhmqi'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'mf81s6e5617lskg6dh9ho2zwlnjgzzzyg48ebow06lg196ckedbba5w0hyz3936hl591ni82lzinvr45puaulpnw7ynkba4bytz0jio768dq3yv53kyl1hond61wi7lgkymzz4mnbo4n5ddsqh1bhojsftr5xoef'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'z5lr8ywwfc86ihqx3sy7kx3vmx3g7uubgt4z4dtgsonyeryhp8qb4718fy2uaq37ak561qf4b72pskf23hc1v45qj7mlxkvsxwlov9xfgucoy0ksqmchivfs2asgibcaexd3r7omruuyv46n2czwa7mge3tmuy69'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'l9l05xbhqr4vul2w1x25fdk083ws8c0gf8pbe7ojii5iqmm3uohr8zgx6rxexw35u89qxpjjl0aneplwjbpam2e9s1pzvh9kbr0pueuvuy3imxmrbjewuwn7ammysakobvbz9idepx8n5tp9lfftmephxi2r0450'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Commodi et est eum nulla et. Magnam ut quas consequuntur iure. Est alias voluptatum voluptatum laudantium. Quia facere quia ullam suscipit molestiae perferendis.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'vhaib83l461z7rcvjza3h1m4ngao7qnnk8tum8mfzrckghn3ogmfllnm33cxjr67sr3m50srwclul0fqqafwjf9qbe85lb98qrpw9y3c7mpkmrxk9eldo38jl1gamr7mw3tmoqzy48rrt9rl259c34f7qr6cq7b0'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-26 20:11:28'
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
        example     : 'ip41703ejiq1gejk11qdqfv5pqv4794t9j4fxj4jeu04hht86tgip9fickiqzyrmgatdeiapiowh9pfox73jhg4uktcwxqic8vhb9m6rnp1j23vygmwk8c4sosbul9aulofuw3wf00erhczj15i2aenup7q8dsqx'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'jf3pl56xm0yu4clnaptt'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 214825
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 8391603996
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'vyk8gfxtg3h86ayb8p5n'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'elbjnrq5jz6ojeu7i3s4'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'ikxt2xa1enkvvcqjpaer9awuwo4a7we5ruv42xaj3dpl6ar5ujiyvgylvhwu04xoyf3adfu461ofcjdog2610vk4okjmwbbieyzk1aw3p6jmrogp9tlqte8wyadbvx1ah4l6l3jaa26nwsrtifbhk41lmk8361u9'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'nk474yvpzhp2a5aac87pgbloqjpe496hfltv2nle2vxceyaq4rwe9jm7lby1h44bx2ygz187pri1hahuoze9bqo51ueij3qffcy8hkpre1mdyvew65jzqluzqdtg0444gl0gykorzxuz51ou5ggbg5hn70gpoidn'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'q63mqvq1y93f32w0lrlmy0h9qdgerm27lxpphdx1ye271udqghw0hjjvcd5tai1kyqb2psqy08h0pwrhav6m2fu4lfeos5urpt0qzss33is05129jcpe60y8ayd1mpit5iorc20ob28f5iitjq9s3hnu4b4a6mpc'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'z9me6195pnxhoy2oesj1srd5hubl9pnjagn4uf8mdj0u0kinuvh72rigo9a81s3ra4dfl9tujysyz5o119j3x9c9rtlw3fukg5aqjr135zzcoczzv2rkgul952qpmaiy2ytycvytdowxutfg2f0yp8a3a3cq1qfy'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 1944038768
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 2496315234
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 7158445907
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 12:35:43'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 05:19:36'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 07:48:50'
    })
    deletedAt: string;
    
    
}
