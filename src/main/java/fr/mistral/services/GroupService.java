package fr.mistral.services;


import fr.mistral.domain.Group;

import java.util.List;

/**
 * Created by hel on 06/03/2021.
 */
public interface GroupService {

    List<Group> getAllGroups();


    Group getGroupById(Long id);

    Group createNewGroup(Group group);

    Group saveGroup(Long id, Group group);

    Group patchGroup(Long id, Group group);

    void deleteGroupById(Long id);
}
