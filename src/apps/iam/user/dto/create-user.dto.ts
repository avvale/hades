import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5109fd03-621e-4c9b-bfcf-b240394770f9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : 'a8ac502f-deeb-4168-934f-3d5a038e830a'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'vccclt78r22qu0gfjh443gauhv7xh23svlfdj39ri3se2q5vema7f05hkjtctjrksi78xe6u145c6qecuf8wfvd72iu7y78jmrowvz570td256qv33pyt9rr6atkfynudjwkdk1uwehy58nwdilmlyu19x4qsel39ntawrc3cj5kq4ixme04rl4e5ik2ny8r6d3rsujx1zsbvdp61v3vfdtrqqunzpiyohta6c8i344l7j0tae24tdrphwnghml'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'dd1iep63ximw73i49ktdgno71rluj3mbhbk4l5ie2ivhhjn4jb7o55agf77863q76l934gdvk6uxq7n02vjkyzgjm4giv6qpwn08yf5isd7d4u2n54tii7zsb483ahne36rrkckadw5urv2iq05yqffqzqidi9i277rj6i0mgkbqpkkyxn7afpypvovtyywqtacakvqnt5n60rq8o2zgww0zol7rinrssc0jnfgqj5clwi0sjnxsow5o34bynjs'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : 'apj1t3jl4xy2ryb61fpyxoiv1wfl1s7tfiy76h24vzpadhbpuly4t7oe80k39ji3xwidc4uyn0zvg7iify4fk9w9gf99bpmxn4gemfrlfi50mjtsztqat5khliskbks0y2qjcrwdacyokt47enzg2gwot0l74nur20khrazeq26s9q8egm1hs64x5mr35ws5d6ii5pgph1bju98y2deoalvtmbmwo3xkbn45v2efcnbafk6f1inxjydlii1zft0'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '5l65gv20zkejw10b3abbg157bthq76vmt4fp3kew924wkmnsw9a3sjsj8nhj'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'langId [input here api field description]',
        example     : '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924'
    })
    langId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'uvzpbv9fgh7ytojswp235e0jkqtgzt3piq48ftxrlg3nj48alt4kuicanbf3k5da5x82xzccsm1dvin2q3l0ypftacju8see8puk1y492edc8thdlht0juox'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : '2nhjpgl7s44n3jkmd9msoan4x9ksodw0lbc4ggxt7o3ojlas874yy5hps4vy5es3kpxzylcsx7983gkaw2i2sqruxymwy6umvzekawvuvwog6kbsalv5imvi76ftonh5l6d9md00e19456rpifv3jymj65viqsb01kipl340wsbxey87mma5irg0z6crwaxbh0jlg2frap639vg4fvgjfy8o64egfe21oijwsgir4q8o6jany76hpvs6x45jlws'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : 'da6pbort9xe43oiyxdggljakre6gpx1dqspt3avmgczxlfecc8v61rmin3k83u5picsjci6ccsldyapwcln8i7i99nvml8vg5bbeo1ea604piklhesrogpilnxehsbj1mspd54ujb1vx8fbdo3cv048hefnmhhn123nuhvvp0ly3liiz50vij0zb1e68wuj34f95bp32rd76tte2pw23w9ac7z4qraik9hc658p750esjqz1ectaotoufvq6j4y'
    })
    rememberToken: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
