import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '32ec5b5c-16a3-4070-9194-b71ff8e678cb'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '31088825-f57c-4fa3-9757-103a534e9206'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '3f34a134-de5e-403f-b00a-95954bf10fa4'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'urxkt1jkddq13w2sbi65'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'roleId [input here api field description]',
            example     : '329b2892-f556-451b-8d96-e301f8b7a390'
        })
        roleId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'roleName [input here api field description]',
            example     : '8q6n9e7ul4p0smy217iin9hq2rvctn366mrfb7imkc5i4br8oys5jrdk8kobhtor9d5y24hgeut508duls4ia757753owjmj4xm31a650au1y20rioo6ax99re61bw0caeiqpmmzh8207gqa2uz9suybmfhock3cgjzuzfipwi4qc29mcdm9dgpocyzmhlj8eh3kosbxgm114m9kxituwjucivuwakgb5kiyl15ovea0b6k0t3v9e96c9lzjsf9'
        })
        roleName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : '30ll7dkprwch45d78otiko7uzen4hu59qpch77j7t395bgzdiyw3e0i20cxls3pjchzyj4x0xirym6m3f058af1yd4f1szalohdsdroablhft7f841nm6rvq7j6arn3wklsm3moxg46glvnyevveftowp7tap5jo9p3sqe50ul8bj2qapdihzt4vr7rkd99k6d8j2b2k4snb7llbsy282rgxpyk3zsiv32re6nfl7blaxe1a9fnati766q6spmb'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'surname [input here api field description]',
            example     : 'vh1rk3fyxyzusf6w4i1x7btnk8bs61ej8lxrwcccobbcbtnw2eyo0p52e87pv3kqgqls067d9tggqb0cvvjktktpvpa2osx0gnjlctqt4yd34bup0aik1arln2k1sx83dt0r5mgyvc86tayv5j2niwqjslmgc670939irxmkydawza27c9izwylji6kz4rn1razrljoio01l0lv238devenaw5dfezy8q6s71oocwhwj4khalv4xdzy88vrh8su'
        })
        surname: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'email [input here api field description]',
            example     : 'caksat3nvec59qyffd0qyo1tiele03ewffy03jv8yro6ml9868s8g4bt82hgspdybcbczbar3ugb6g7dqp9yx56qu9hsxb7368s0yt6q02b3rqmne9zldw3a'
        })
        email: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'mobile [input here api field description]',
            example     : '83e4mrbzlnuvxrrti9lvfyqtpxe6imdjrvxmdfi7jdqcaybpm2rainphax5j'
        })
        mobile: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'area [input here api field description]',
            example     : 'mvcm1azjiy1c6ne0fb5zwm8uh2tv5rxqxykonoy3u51yf0jlh4li6v01sxj43nxsdnbuir9v76xu7tlogod455zg91xz0ieqxzgfwvixesvp0w3h5p16ikghbr8rclp98wfgj8ifzce4211xamp62z9n8rijdcpbr3o0eelfcrmap7zi4tjo7reh335hyn7ypadz9bbt6n9tqgrjjutzinjhxxfy0fthtxaxyzkzg0k5kwxie2ug7dl4lq6q9q3'
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
