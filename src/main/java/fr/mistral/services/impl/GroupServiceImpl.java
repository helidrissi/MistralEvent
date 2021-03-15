package fr.mistral.services.impl;

import fr.mistral.domain.Group;
import fr.mistral.repositories.GroupRepository;
import fr.mistral.services.GroupService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by hel on 12/03/2021.
 */

@Service
public class GroupServiceImpl implements GroupService {


    private final GroupRepository groupRepository;

    public GroupServiceImpl(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @Override
    public List<Group> getAllGroups() {
        return groupRepository.findAll()
                .stream()
                .collect(Collectors.toList());
    }

    @Override
    public Group getGroupById(Long id) {
        return groupRepository.findById(id)
                .orElseThrow(ResourceNotFoundException::new);
    }

    @Override
    public Group createNewGroup(Group group) {
        return saveAndReturn(group);
    }

    @Override
    public Group saveGroup(Long id, Group group) {

        group.setId(id);

        return saveAndReturn(group);
    }

    private Group saveAndReturn(Group group) {
        Group savedGroup = groupRepository.save(group);


        return savedGroup;
    }

    @Override
    public Group patchGroup(Long id, Group group) {
        return groupRepository.findById(id).map(gr -> {

            if (group.getName() != null) {
                gr.setName(group.getName());
            }


            Group groupUpdated = groupRepository.save(gr);


            return groupUpdated;

        }).orElseThrow(ResourceNotFoundException::new);
    }

    @Override
    public void deleteGroupById(Long id) {
        groupRepository.deleteById(id);
    }
}
