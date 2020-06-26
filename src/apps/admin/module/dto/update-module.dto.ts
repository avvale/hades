import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '92442675-0203-4d7b-a251-1c3657038203'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ansxvz4kefy7hg9ae00u4l5yp51v94qpw5b25ffhmg03s3fxfjp1aek64o6wxvz0orqmhsmqpubtf3ti8ovy5zsrdbjedhwqanhzu7wfwj2kl5yah51k990vkqvopzc7i3aholii6teodswa9um6sk4sshoishuckwm3tmwvpru87o8u9v69blqaq39710hsvmftz1ber6ow0so7gshviml3ki0krr55kvpnxbi7lqqmp1qhzbod4d2n1e6lxcg'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '7j0t5guecv1mx0awq3ol'
    })
    root: string;
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 185558
    })
    sort: number;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
}
