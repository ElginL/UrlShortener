import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class UrlMapping {
    @PrimaryColumn({ type: "varchar" })
    longUrl: string

    @Column({ type: "varchar", nullable: false, unique: true })
    shortUrl: string
}

module.exports = UrlMapping;