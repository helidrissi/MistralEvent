package fr.mistral.domain;

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
    @ManyToOne
    private Location Location;

    public ImageModel(String name, String type, byte[] picByte) {

        this.name = name;
        this.type = type;
        this.picByte = picByte;
    }
}
