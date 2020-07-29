import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'iz3jy9k4a3mmo4e7vl01p7pllmphhfh6liju1mwqvoegmdng5b'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5e5a9aac-0829-4694-ac34-9b453b70cb58'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ohs7j58gz5223r0ooan1'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '82c807dd-f496-4b60-b7b2-46295ea32038'
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
        example     : '2020-07-28 15:34:31'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 18:14:11'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 12:07:36'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'COMPLETED',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '1mi4y7q9pfczdb5cfk3h47b9pnp7ks0clab87x5mi9fk8thpemtyxzyzi2huvtijooy8h2evjfpd6hddd2sairhtjymt1f7b4x7qmyfsjf1a59m7h7wqnhrt2z906wmm3oiz04qw9nn3147j39j4qebic9gvad27flqj65eziohhtwwkgt835jo4ey9739dyyy8aecp3lhmb09319l89a5udzsiu6n7edf4pq5uxugto3t4u4n6t1c6nqsy5fwi'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 3007700607
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '4iv1vnkfn21jwgce182u954ckoibj7x7amigii4zgha1eau03vrhpsyfl66oz8bu7jwu4hwn2ubf051ddmuseomoq0q3fy3l69itvwgnbaun9yr4bge1i6oabyjabh4u9cxkz4e6cev8ap02l14obkc07uou0i26'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'jyf0fwcic3253h4y7nj9buqoq64e9jci3qfagskjpsjtc4d6yt0pdingwowtq20abz7vz3cqjqt8rzyfj4zwpqxbiv90q1ljmotz7kh8go20c3zmmdakug6nivr2xed2m2apbpxphht2uc59wct6e1mot23qudj5ebu37uj9j1heg2k5ruewkmjm8selx77wzvb0m9c4bnkzq13wxgt9boy83njybdkybyeqfxrvsqu5gn70cbrykr29qehuhtd'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-28 13:54:45'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-29 06:05:22'
    })
    endAt: string;
    
    
}
