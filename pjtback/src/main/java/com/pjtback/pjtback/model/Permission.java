package com.pjtback.pjtback.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Entity
@Getter
@Setter
public class Permission extends BaseEntity {
    private String name;
}

