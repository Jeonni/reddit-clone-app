import { Exclude, Expose } from "class-transformer";
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from "./Entity";
import User from "./User";
import Post from "./Post";
import Vote from "./Vote";
import { makeId } from "../utils/helpers";

@Entity("comment")
export default class Comment extends BaseEntity {
    @Index()
    @Column()
    identifier: string;

    @Column()
    body: string;

    @Column()
    username: string;

    @ManyToOne(()=> User)
    @JoinColumn({name: 'username', referencedColumnName: 'username'})
    user: User;

    @Column()
    postId: number;

    @ManyToOne(()=> Post, (post)=> post.comments, {nullable: false})
    post: Post;

    @Exclude()
    @OneToMany(()=> Vote, (vote)=> vote.comment)
    votes: Vote[];
    
    protected userVote: number;

    // findIndex(): 조건에 충족하는 값이 없으면 -1을 리턴
    setUserVote(user: User){
        const index = this.votes?.findIndex((v) => v.username === this.username);
        this.userVote = index > -1 ? this.votes[index].value : 0;
    }

    // reduce(): 0 + object 로 들어오는 값이 존재하면 계속 연산
    @Expose() get voteScore(): number {
        const initialValue = 0;
        return this.votes?.reduce((previousValue, currentObject) =>
            previousValue + (currentObject.value || 0), initialValue);
    }

    @BeforeInsert()
    makeId(){
        this.identifier = makeId(8);
    }
}