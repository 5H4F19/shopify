import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Shafiq',
        email: 'admin@gmail.com',
        password:bcrypt.hashSync('123456',10) ,
        isAdmin: true,
    },
    {
        name: 'Showeb',
        email: 'showeb@gmail.com',
        password:bcrypt.hashSync('123456',10),
       
    },
    {
        name: 'Shayan',
        email: 'shayan@gmail.com',
        password:bcrypt.hashSync('123456',10),
       
    },
]

export default users