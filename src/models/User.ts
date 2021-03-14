import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('users')
class User {
    @ObjectIdColumn({ nullable: false })
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    phones: [
        {
            phone: string;
            ddd: string;
        },
    ];
}

export default User;
