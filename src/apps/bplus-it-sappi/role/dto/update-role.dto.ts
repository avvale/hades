import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4714a3fa-28f3-4057-a74b-e64cf9a9df55'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd83bbfe5-040c-465a-91b1-e0fd147d68f2'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'a1lt5lan7hgulobtwkzjyjsv4jbpxvb0c7w1t9mxfjclufjp9y'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ga94s3apukbkw4s5oylybv2f2sw9t2vyc43eym5iu79ogbk3glcrymmshx55g2tw070oozfsivfvjbs2j4l6eonbo75kvb051p0ehcpn2wai9kgvc9fr1yvftmqlm1dlhva1bza6hne95wiy8ruh7drd6qm3hglqye8li153uuxl9qx17zpux9feyyi3attnkhmujmtgrjun2jadlpis8wrvdxjq5rz06u7m35qcl5qkwe6pg6vi5gf4vrlhrv0'
    })
    name: string;
    
    
}
