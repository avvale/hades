import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8761b63d-3ae5-41d3-95be-958ca51dfc1c'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'bcafefb7-cf68-4f3b-a844-1bb60c649712'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 's8l1p6m5ddnhzfr44v4w'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '433bnqrzy804tapn6sxp4mk2pex7rgc9br4p2peeqj1ta4yhvm0ndbvdvoum'
    })
    scenario: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '10ab02f3-b600-44cb-a7c2-63978290326e'
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
        example     : '2020-07-17 16:13:30'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 19:56:48'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-17 01:33:03'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '7111a4f6-d53a-49a9-ae2f-c337b4c299d6'
    })
    flowId: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '05wg1189za2i9ekvbpr1naa8gohnu5r6oolc5wist8sybjx0tlusc86bo7r6qzyvkpea7nw95kozgpruvs9qstaz5ll3u0xyl4doryanpuabow9rne8mlqco7l6ikwwjlluhjnr4boid16c3d2mwqrdwhalnc7tr'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'z8x43qjxa0xll8hcnwczq63dotegarvf9zw36kbn5il435ktkulngwh1vbzyxkp058p42f3pbe56m999nwrky9f22z942fjs2s840ipm72f2i53354gnnqc84m60gnynzh3lgsi0v73c5kn24n3vk2gr50sc1vk7'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '3xdo4radd8u4geaun6d16uy0hxtowmwx072oaxfcoul9753cte891c84leh877u0ce6kp39wd5ch69kwwpeb5nzhan5nnunsqboydhxonzbl8xga2idgwbz3wvttu728kr0chtjuvjo4z17yzqf7i2n1v1bbvypk'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '2kp12cng57i6hr5c2myujeq7vnwbexcnyxc46sxhty1iryr5dqfft9of351k27draxaacz66xatt76nwjdcjoauyzx03dxteywgv15m211u6vhw4x3knfq3ponmbkrhjphrgd5v3vc9fec849nut7mz4hyby8h8g'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'HOLDING'
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Maxime fugiat deserunt blanditiis. Nesciunt cupiditate et dolorem voluptas consequatur. Est repudiandae nemo. Doloribus nulla vel saepe cupiditate esse. Aut mollitia et maiores culpa repellendus aliquam temporibus quia. Maxime sit accusantium.'
    })
    detail: string;
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'gpdv1710nzesw6vezvwe6ibg4e3fl8ef8rs6uopj22lwssqahvttrk8lzakiywhrqe6lu5fen8pu6os3d9zhqds4z1x9plzgebfvqjn1m7v2l2yfwn3ptezekgn1w0qunxg73zh80p6udq4vhcccpbb9yr36adlt'
    })
    example: string;
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-16 19:30:53'
    })
    startTimeAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'wfam08pe5wmywbiv5yfa'
    })
    direction: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'r285ex9uwov3pofi3sho8t5cfm06zzul6py2ms22iwlugl4sws9ocrejzp3onfeveogwhvkunjgxjmsh37u96rv6tkx09hmqlvian9e3b16g1u2u9fca5755vnjwebsozy8fvktwqvb2nx3rclj1kj35i09tpl9y'
    })
    errorCategory: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'fwlhdk2tnotpq75ndyos'
    })
    errorCode: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorLabel [input here api field description]',
        example     : 'pyg2vl84epsx3ziw96q30nwi9g4eu6vh0ixg9kjd9g5mv5jzyfp9zdly2ep8grelshxg1ttrhi755mp7ihe9dk3fzf2xogaqbho05yect8s65sn3y2ov71tojgocgwugfrwu2qnutdm51y3bp3bgtapl8kkis3kk'
    })
    errorLabel: string;
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 3407380054
    })
    node: number;
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'v7nukr2podxq4h06w06q'
    })
    protocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'iqibol14ltunmcfwxi53'
    })
    qualityOfService: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'oea85a2wsjotiq33a86938nalgtz7ll48ltxtsosud2shyn6704onz87lcsyb1j35si5mwnkypg1ab07iygtcc5mth0g59hc2f3k2gyu04h0meya6id4d20lssj70tlgo3vjykxu915we93oqqucgg9qoff09820'
    })
    receiverParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'q411exldg8piymmp2480xx63uudykg0j9tmyigdjmelsqb9yffh46iusvoblgb8xkhh1jgjl3joqw326xjh7l3vbrf5zyli18klam2uzn4jecz5n2bw0zldq2jw7wdavm1eoyv0zgoebuz8v8besioom2v5h01wa'
    })
    receiverComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '1su38yix8d520qc0gww3eqjvfoz42md9bblp39wke6hwb64fzri7vhf82uve7blq6aryzsdgxkslasz3bvvc8xg8k8b4ctv68sbvx38w8109g9twlkpmya3k6v387vwwqnfl558xsuwctj9dn1d8wewj3la0m4rw'
    })
    receiverInterface: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'i9nw1rf0ffve009xdrkukctk0ihr2rpvgsk86ca4jn7z82r0pmx154nsor9688ld0zr7lm7b0wuchfpaa60rlru8h3cdy8vicxqxckwq5418g3lu6rh9h2iwj1grmwh3ov0l3uinh19mnbtk10dm667la9ydeo8c'
    })
    receiverInterfaceNamespace: string;
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 4298323518
    })
    retries: number;
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 4513591325
    })
    size: number;
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 4596879137
    })
    timesFailed: number;
    
}
