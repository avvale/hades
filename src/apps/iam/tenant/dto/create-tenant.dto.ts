import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '235f8cdb-d652-4a2f-a996-8a729d774e90'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'm5pll36imbbwkwo984e5s83mmdr27gbktr3scxh3mzdnan8irod95igq8vojgg87cxv6jgkm42ye76o88qb4ep4jgb5gnc393gn8l8w43ct1d51n7xdpesvbwe8938a2ldkdq89876pqlmsnccndiv1s8tuajfxyzkfbnnpeswhpp2niy7m80x7s19bcsp56rlu5l0wm7kh2xvkbelktis1uwr0jh02205b8z48nco3at4586o2ftsiu8y0eocg'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'wpqprmuudxl22ezkmo6kg8jbtd6ynrx2nrnb76jgu7aquct5ud'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'logo [input here api field description]',
        example     : 'l6gsdl302znm9uwwczyqrascolj0hllzd1sjjquqofuwdx4sptp57vnwbixjf1ksg6fsg7i66beg5gxwlfr8330eidw5mh6mcusbt3qxomou3fuum7mgvo2rp55qtwb8mt1oezgdz4et75yqlvrlnpkmyzg23k9o5cvxpenpwrrqbtfpg4rhnvuolr3haqy46y6sipntovhufimsb24b4vq50er2l91g8jnf7augjfy784e7f6y09kljn4qnypn'
    })
    logo: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'accountIds [input here api field description]',
        example     : '',
    })
    accountIds: string[];
    
    
}
