import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '038067fe-dd6b-40aa-bb69-43657c527ff4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c30d6b30-0cc8-4e37-8131-75f6e21353b8'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'lb1924kceoth0dfowkwa0i148sdf8qxa4gtgpg1vbeq7bhibd0'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'fd64441b-766d-4c21-9fa0-8ab1cdccf383'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '4cdns63s9d8rp3bi4oea'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '8fcc2bda-4251-4342-b2b3-49424bcd00a3'
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
        example     : '2020-08-03 17:07:22'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-04 04:15:25'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-04 05:22:26'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'SUCCESSFUL',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'z9kb422h4lf5gk3llgo54ip14f6iy1i6r9z07e85'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : '0l5yu1r0bs6wtobru1wqp1bmwcwxnwkq5pbvmhznwr5n5b46fb'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '8da92p0eaahy1irbb2368z4delwwq9u9xwq7nooeiw6b4qyn4wchbrfxr8zu4wx62cfnyll9mgipeq24yyc5ywg51lzxoazclbjm63ih5rx40h8zger5hga4vgqp814v8goyrnftjpr43gg2o4drgvorp8wvep6s'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '62g8v8on56eg8ea27ndfs7b9n79c651qgf7z4kcjwaih6t6pmg3833dodfo1td3pbswveq8plp8dpmeo07o2c8mohg5shoz3dxw1c3elq5h22uxd3x44mwk2zt1ziv2ud8oj47m52fwi1xxtdie69x321t2irvbr'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '6nesutd1l9mtkgoyl2g67g09ua24t00ywgjj72hcpehd90hcz1h7juz5vvkoqy3bvc6tjqm41a2bj0cff6ulfcavzs8okhanpl57ibthrssv87vcftqik2gt3w1cu8qdg3o7b6fbrzfv8uqh3z4dr8k3i7hhglnp'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Quaerat dolores nihil cupiditate consectetur aliquam nostrum repudiandae neque sit. Omnis sit cupiditate dolor et vel deserunt animi. Sed sint voluptatum quia incidunt. Quaerat velit qui maxime magni aliquid sapiente repudiandae sit. Cupiditate quam blanditiis. Totam quidem illum.'
    })
    detail: string;
    
    
}
