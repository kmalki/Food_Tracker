package com.esgi.foodtracker.model;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "keyaccess", name = "uniqueNameConstraint")
        }
)
public class Enterprise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String keyaccess;

    public Enterprise() {
        this.keyaccess = UUID.randomUUID().toString();
    }

    public Enterprise(String name) {
        this.name = name;
        this.keyaccess = UUID.randomUUID().toString();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKeyaccess() {
        return keyaccess;
    }

    public void setKeyaccess(String keyaccess) {
        this.keyaccess = keyaccess;
    }

    @Override
    public String toString() {
        return "Enterprise{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", key='" + keyaccess + '\'' +
                '}';
    }


}