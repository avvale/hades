import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5ccae1b9-af59-412e-bfac-deb9d5c66536'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '4b3424f4-bfc0-4855-b611-92ce0ca257c8'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ep74xsqfi5odnkbpjai0az30pqx0p2i4ndy81czmbjob19r213'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '63f20a59-070c-42ca-a5b9-596d3dae92c8'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '0kb21pe4ecx3e3je4mjb'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'fc93e7mk1p2an20czpdbvr2eb2alq1nr7az0dlc81xv7bz5kda6gr52fzwit'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '0c5378da-c2e6-448d-9500-30bc48c60bbc'
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
        example     : '2020-07-30 19:24:02'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-30 14:58:42'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-30 20:58:52'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '43mtiudxztqs7can93q3ov7pah6qworloo7y537y'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'fj6wba6d2ko3866nynkm2iq37fmca1sldfg2uy1q3thnqq5ywgx9bi31p88yi404yav2fhoyvjckdtaqto0xq4sdi3maact11lh1zbpy9th0pet88wfbi6ascusv5wzcowvumi9zbt77mzu74mol1g1fc6ci92q4'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'atqx67254mri5p3wyh34dkmn2zputp9awf1yucvnsfjjbo3dj64npms9lptask7jx8c821zzam0jx6po3r7axwehx6tohp1ul91xn3syiuzqmplutquy3bco4ss6j0xlrjprnbkef96qnfhblws2wckr7ixyq1ai'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'bygua1ztrkwrhpak31i6apkkfg6676rv2yy2igkxqrovow2vuf2kp0a1dsqq06lvbvtne8pgyeu3gj51u9ivioqfxxlpsy5xirykzqc88qlxydj32lbihn8fbtzb88zn6uhfr1z2djiw3lc5obudisz8gggbw1s7'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'psk95gsn6v1j7z8jn95c4n6dw56k5qg8xwa9o9b2umd8mn6d3lu1xr0uvb024634jnq9cooec0w6ljfsz18ngxug2fewbl1lp8nh3u5qs68ddhuixn8cbyq9jehqfahr8z4rx8aydizp8xnbaudbzjoazwcc8xw9'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'WAITING',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Ipsum cum et vel laborum non distinctio eaque consequatur. Similique quaerat incidunt reiciendis id qui sed. Ut consequatur omnis quia voluptate sed dolorem. Molestias veniam sed rerum nihil necessitatibus adipisci fugiat. Voluptates adipisci delectus repellendus et dolore illum non. Culpa non quos rerum a est iure dolores.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'c5u2q9bsmqzmk16041qjqe8vepiz9kpz9wpwkghq4i2c6fj79r3tokffioyr56held9hdlwn1en7eopx9yg7ietbzpkvv6ny40g9uiwf4k3oh3uiwj7afktqvlrhay6n32srr9w05fbj73ywvjnvmoyxy68x2ypx'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-30 18:36:56'
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
        example     : '08gis9v3nkontwhymaifzf3ri01rxh2uo8u6f10nx0mddwuitbifrud4nqjy3ze136t1z1i1atzdblx7oyxv09syowe4oigvdynmaehbfjoy0gidnpserf6c3mntdlxxfpyvqmooh1n0sow3bg5tu6hj8ez7x7mh'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'wdygwg24gn3wi0t2pribt5otjsk0s8uxmygagrnzvcavblv1w0'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 401672
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 3075416660
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'bso06t9mi63etey3tywr'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '8003wv7wlnegmvpggzuv'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'mu8pawdho4xp288a0yhk4tlbpu3aksevpvbsimv7n8jgxrrlbqzg5d5wq7coobip5tslokt45fkau6tvlvggqcbdll88wqozoeu3fagqxfobp9in5wxbv1ujd05kmgznookkkjiypha8dwsxoq0bgruradpafhjf'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : '9fef1nfvif22snndkan6ax97oujae71rtt8vfwct0y8p3z7zgwto3jbxuv10cz2qfzusi89866j5vllcnil7r7scdrpbzlqdcmszp6gqcz24k5eerpn45o6zfexyqbicxbx0m18gizj20k01135m85s51hs40gzk'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '5x2lgq9nmvfibqfk6jtb21r567gvzzs4louhyyo5nd9o2py4ku8onrdq4c6avwzsrwi7ejyhv5bpwx64mpkl0v93xrfnla2qlc45j5ln67wr4owz6l9aymlwz25negr97ijl41mnr9azxwmt4yyckjtdsxi9hg1i'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'xlsslpomfp5fjmq44uup1rvlz3quy1iv5zsyycllp3nh66mbjcuduwpilotz7av4l23xdve3bltftlmmzw1xw7b0qiclakoey7fp4x05slbvl8o76zwcd2cqy65y0j35qb1r5k4x3kyg0mwmdc0yr1yhdepnw0r7'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 2812807831
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 2580948862
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 2017815724
    })
    timesFailed: number;
    
    
}
