package fr.mistral.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

/**
 * Created by hel on 27/02/2021.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name="users")
public class UserEntity implements Serializable {

	
	private static final long serialVersionUID = -5763827745308343856L;
	
	@Id
	@GeneratedValue
	private long id;
	
	@Column(nullable=false)
	private String userId;
	
	@Column(nullable=false, length=50)
	private String firstName;
	
	@Column(nullable=false, length=50)
	private String lastName;
	
	@Column(nullable=false, length=120, unique=true)
	private String email;

	@Column(nullable=false)
	private String password;
	
	/*@Column(nullable = false)
	private Boolean participation;*/
	
	@ManyToMany
	@JoinTable(name = "users_group",
			joinColumns = @JoinColumn(name = "users_id"),
			inverseJoinColumns = @JoinColumn(name = "group_id"))
	private Set<Group> groups = new HashSet<>();
	@ManyToMany(mappedBy = "users")
	private Set<Event> events = new HashSet<>();

	@OneToMany (mappedBy = "author")
	@JsonIgnore
	private Set<Event> createdEvents = new HashSet<>();
	
	

}
