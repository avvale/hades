import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'db4f5d87-76f1-44a8-a983-52c855191056'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'jjpaou84s6o4fhczvw7voa2489nx66g7etjgzoyh2o4pb1j4d1'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '9a71f5amkb5rbueg92fw'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b'
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
        example     : '2020-07-28 21:22:11'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 07:30:46'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 10:27:21'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'emfwaswd8rtzoq1ah3vwwa0h15ko5gdbjrulifuamqp619cg0epluuxzu26rcqdjez6740v7583ch55fo2b3g7ckm6m7xjlend96sdq0decar69wa8hggtkhuqkdookwbfx636jo3qx9ka7lf4fwjn76jyc0bhpov39vowd753c5b2vczwroilo1qgbn2q89pj853cwsxg938f055rhmsztrptt1bp3fttizozbz7cho0b6at7oajzttu4l43d1'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 8958069099
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'z38dwos1pm7672gc9vjdcun2w1xaxn4jwxvn8pt3tplsjfltwtwbu8y75su6mk2a8xdy2q1fkmh89ujoedmdlw3ih0wdy6k2op4mxt54127iowcfysq6d1t5qtawklsn5dx5wq24z3m7a65x3bgq30ybpmloib8g'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '3is32m5o758paqb43ot6a8sk70bs8q6eft17ab3ontusz0o53s3wr1dj4h9dlybxhvdxf42bj09fjfu5szzpmltibshpen9djy5w1f177ca5k6w3wc5yqf68tqabjuh3bf9311g6x4zmrw0svguys0s4flp3os38cugcpw5ofe04sfyzfz8lsevvni8sg99s692i5k3u8pmin0j1ys5zh0ecn3corsyln1knsopq54xsrte1vi4cpr4s9wtmotj'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-29 06:56:16'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-29 04:10:49'
    })
    endAt: string;
    
    
}
