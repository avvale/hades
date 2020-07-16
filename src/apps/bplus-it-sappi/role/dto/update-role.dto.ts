import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '28186aed-f2d9-4ca6-870c-36d994e0fd6e'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'cm2754msvzkuupyxx6lxrxmv3ddmbwy144wi182xbqxvexvo92k0jsrup8t53djkd2evz5oju8vbh3sj73kmcapaz5stjwg3ipq3zq92mx9314pmx4vg359g0j7yztlzs7h5vnd6sg2ccd5zj0ko9v4wexjwmuf54uljx8ss78exsykxv1zlgmkxj10l9hq0c5y6kca6m414zzmwec1zrnlitlqqnq4nztkso7656lvjqso7fe0s9s8k77vtqol'
    })
    name: string;
    
}
