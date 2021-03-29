package fr.mistral.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "image_table")
@Data
@AllArgsConstructor
@NoArgsConstructor(access= AccessLevel.PUBLIC, force=true)
@ToString
public class ImageModel {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String name;
    @Column(name = "picByte", length = 1000)
    @Lob
    private byte[] picByte;
    @JsonIgnore
    @ManyToOne
    private Location location;

    public ImageModel(String name, String type, byte[] picByte) {
        this.name = name;
        this.type = type;
        this.picByte = picByte;
    }

    public ImageModel(long id, String name, String type, byte[] picByte) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.picByte = picByte;
    }

    /*public ImageModel(long id, String name, String type, byte[] picByte, Location location) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.picByte = picByte;
        this.location = location;
    }*/
}
