package fr.mistral.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by hel on 06/03/2021.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Basic
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime date;


    private String type;
    @JsonIgnore
    @ManyToOne
    private UserEntity author;
    @ManyToMany
    @JoinTable(name = "users_event",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id"))
    private Set<UserEntity> users=new HashSet<>();
    @ManyToMany
    @JoinTable(name = "event_groups",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id"))
    private Set<Group> groups=new HashSet<>();
    @ManyToOne
    private Location location;


}
