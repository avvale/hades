import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6102cd62-f5ae-40db-8796-60d4c2bd4af0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '470e0e41-4038-4d35-816b-64cbf3e28219'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'lqpbjo1u7illkqmltwl83n2ks66vbrycn1u98vymfh7dy2yk3s'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'c4c3516a-2055-4add-a17f-6d42aee3abdc'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'lj2qbvwxlryyjlq7hd5g'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : '007f20820vw67e0zye2xcs3fglhgykepp3fh7hja21u7q85ho3wutq1x21t0nkn6be3mishdmlgusp455vxbg3djpi9pmw4zh1gq89wy8dibc7ta889cmfccwa2coob8vzlfo3506xy09q9tdh6b4j1xob63vt4eyuebjk3du7i1ap4rikqc2nhkdxrdqih4pxyrn5jdwwiau75hztqq2t40mxu2ler1vrxjmjho9hwttx5tnmubpiwokgqo7bo'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '9isem2nwfsbrba493y2z4avn19smqrj7hn168rtsbdufwnnpvs46pdmrz2ivkbil4d852bnoa5htwixqi2okqhuwq76j9xcv1gxijwgfl9qqorps1q5i9735l422rbwp1fu7fu1x2c3mmg8u0lvribc5bpwqobn5sceohuqoiz28md6bbnoklkysmlekdvh1j8q72qzc6ze60o10d7zvz3cril9dse23cgshd7q0a0bthp452yzbrh94sr8yqnk'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'cmhmw4s62ssj53yv7agu6db35i0cqz6hirykmcgyybmv7wfsqf75xhaf7656sz9t0268nl323122i82duewkjhkj6slfqmv9y6mvi5q6d0juqu6q8odrgjtj6z763b83zohcmivv4723xes5o7unqm0s3en76e29648glhd5qq3nishd8voswdn8xgav4uqusbjmplhdetxrx2q47yegp9xojv445iadt8e4hq75iih8rgfasmg4e334n0w577g'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '00xbpaosnprnshwqxo33dg9p7gtmb5pg3z88kupzyz7py78q66op6vbnhwi8gdewy2sm9l18kl5zwj5x051rsjjw5jatpoadhblirjp9k2bivv7agumrpn7f'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'gi85r2yojr5dvy36mvspxhq0lnvhup94upjxok66pgaq2qkey0hi0bsaib5j'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'j8bqxa35op35xzeq0txjemk0zlpzsjzberlr2jxckrnu7bsq761cborz52gwlhn3z47rps0p5rcfyzuoouzpo5w896n8vt3900jwc2wiocny70wkvhzn69kgixy610gxawygr6dy73axlcfafw6sergl59tc568mg7clmxm95rl7h8d80orglft41bdoyosj5lgvctwlo43mag6km21nl9acs9vnsmxkhlcurbxa84p4r1jnskcqtan0fe61kq4'
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : true
    })
    hasConsentEmail: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentMobile [input here api field description]',
        example     : true
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
