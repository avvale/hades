import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '33776019-8027-40ae-8ce4-0f736ddc7ad6'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'bb46f885-9e91-4ad4-bac3-64496af6c532'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'recq8s3sru55r7pw4mj2bv8v7yfyng1rixbj1v9l5ak058ac5labknnbgajgneqqtn9x61prejkf7kiwcfag1m2vxamgko4uq7ljzskxzfrviypjtvv53wcsono2otolcihfvqan70ryubesxcppyvrwsjeh28mu74f39hch02m0olgafxv31io1m8k4i3t2cn11jipwpy8wfonzdv1b6z0ccnrlh3c6d3t9394dbnfary0f89x8yaeqz3vkq5g'
    })
    name: string;
    
    
}
