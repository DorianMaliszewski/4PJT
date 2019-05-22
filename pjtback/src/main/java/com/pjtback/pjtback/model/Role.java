package com.pjtback.pjtback.model;

import com.pjtback.pjtback.model.BaseEntity;
import com.pjtback.pjtback.model.Permission;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class Role extends BaseEntity {
    @Enumerated(value = EnumType.STRING)
    private RoleEnums name;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Permission> permissions;
}
