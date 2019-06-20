import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class WorkItem {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 100 })
    public text: string;

    @Column({ default: false })
    public isChecked: boolean;

    @CreateDateColumn({ type: "date" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "date" })
    public updateAt: Date

}