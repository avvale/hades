import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'z8yxgofu3otkglwniqvyb0kzsrm1wkwpra0orxijnuc4wmplarmguonokdfteppcqdczeiycyxkt6cty28pwhrqrz8e6mxcukgocjifkzvr2x0uby5s1r4ngjbb4gdwynuw8g5l6i90iasu4ujtcr6r167hy3a2iw3c3zyb9jf5236x5doacy3dn0j8o64tp8qh3cjzykcfshorlg5g37trfs7p0pyqdfixnx857u4q2a5ti4i2hh9khx7qp9za'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'root [input here api field description]',
            example     : '53zh51w78efr1hmhnh4k'
        })
        root: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'sort [input here api field description]',
            example     : 164289
        })
        sort: number;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isActive [input here api field description]',
            example     : true
        })
        isActive: boolean;
    
    
}
