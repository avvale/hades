import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '35c7033a-a9f1-4378-b2f6-31ac10190849'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'be1e4846-c166-4a63-b080-cdbb12d02b42'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '34d50977-a2a5-4f06-b2df-b3411f41a587'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'v9fq5d4qj4iq3i8rintk'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'bb68760a-bd5c-4ff9-b194-14faef31ade6'
    })
    executionId: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-15 05:54:05'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-15 10:36:11'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-15 03:29:17'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'INACTIVE'
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '66b34d6c-887e-465b-a19c-8f850de1f93a'
    })
    channelId: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'rxgoxiggpx5x1hqszka392hpjla9c76fb7qhmc1japsnlfwgotkn4iz6z1pnux4it7n5yejs09pslwxmhq4qoyg47sl3dcb464uunpxzd14o29y2jms54wjh9yjy17ji1a53ws85lhplfxxtwlsosanhensxelis'
    })
    channelParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'v2vxa0f80lq1m7zk2laa38j8bdei8wksk8kt08vae1glzli8j728ig4w51fqlr5xbrascm3e5fv9wib3x2du1n87hjox8hrec9sbhobtkfsh9rf2q1ajhvd2cm1vy6ejs4kawjq9ct7jkwnncxounbspcc9dyp34'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'nc2e0buwmjs0vgz2r7aio62cdgtc1j8x8x6aupaugcslxtsakksugdvzf7gibig3egkyzzocoxo9hyql1l862qak9lv54m7h2g98mjrag1ubiagzaps90ozbe6p3lqr79rsjfnn5b9o1grfgs31gztb9h346dp2i'
    })
    channelName: string;
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'A quos voluptate eius necessitatibus illo ducimus. Ullam veritatis natus ratione ut hic. Eligendi sit dignissimos temporibus est nulla quasi.'
    })
    detail: string;
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '1psjmnowl5ziqbjasi9fybgv7ppd9gdn3glflau8ngek4vy9ijkkiupjd5023zxpuqsi9mwrs93y5xbcp9wiuzdhq3qtlzgzsx6am4vl0svcz8dw9v751ll5eu566lhzvbgnvvpgtea15cr56x0i6oii6hinur8a'
    })
    example: string;
    
}
