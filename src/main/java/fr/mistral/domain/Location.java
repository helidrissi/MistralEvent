package fr.mistral.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
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
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String adress;
    private String city;
    private String phone;
    @JsonIgnore
    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    @Fetch(FetchMode.JOIN)
    private Set<ImageModel> images = new HashSet<>();
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "location")
    private Set<Event> events=new HashSet<>();



}
