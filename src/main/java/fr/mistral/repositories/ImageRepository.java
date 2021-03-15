package fr.mistral.repositories;

import fr.mistral.domain.ImageModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by hel on 14/03/2021.
 */
@Repository
public interface ImageRepository extends JpaRepository<ImageModel, Long> {

    @Query("SELECT u FROM ImageModel u WHERE u.name = ?1 order by u.id desc")
    List<ImageModel> findByName(String name);


    @Modifying
    @Query("delete from ImageModel b where b.name=:name")
    void delete(@Param("name") String name);
}
