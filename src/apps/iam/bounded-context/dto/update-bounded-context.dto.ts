import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '100be2dd-fc5a-482d-9093-45dd8d9d58fb'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'j18wxfget9wv0o6rku2xbibqbxgrwarkilqlzlamsfswqrdee3zx9hv9ldpjjxuko84r921ewr5qgsocn74e0xj4yowwde9aipw830eq4qf07cw0hm2zt617v9kykuos1n210ci4agj3ft41j4xpdrapf2y3ipm5trf00urx3sav8f9mc0u2ig64owst98jvyf4vuqngi5m7p20f8b9rpti5qexdryrdrfhj3tewx0cnpliv6ottpx2q76z2yoo'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'y1z1hruow20mwy85whivrydm9ihtyz'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 299948
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
