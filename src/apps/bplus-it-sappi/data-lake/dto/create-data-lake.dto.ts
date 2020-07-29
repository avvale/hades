import { ApiProperty } from '@nestjs/swagger';

export class CreateDataLakeDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c2d540e5-b438-4484-b19f-e7c32f8b99b8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'bfbfb489-0d80-419d-a4df-9f53018cf6c1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '9498d414-fe6b-4005-9a40-0c6890b67ec2'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'g2mm0djx185077j8e98vxeu7emxdqro31jrfte2kr4nzcbrx5n'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'payload [input here api field description]',
        example     : { "foo" : "bar" }
    })
    payload: any;
    
    
}
