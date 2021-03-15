package fr.mistral.controllers.v1;

import fr.mistral.domain.Event;
import fr.mistral.domain.Group;
import fr.mistral.services.GroupService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by hel on 12/03/21.
 */
@RestController
@RequestMapping(GroupController.BASE_URL)
public class GroupController {

    public static final String BASE_URL = "/api/v1/groups";

    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }


    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Group> getListOfGroups() {
        return groupService.getAllGroups();
    }

    @GetMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public Group getGroupById(@PathVariable Long id) {
        return groupService.getGroupById(id);
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Group createNewEvent(@RequestBody Group group) {
        return groupService.createNewGroup(group);
    }

    @PutMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public Group updateGroup(@PathVariable Long id, @RequestBody Group group) {
        return groupService.saveGroup(id, group);
    }

    @PatchMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public Group patchGroup(@PathVariable Long id, @RequestBody Group group) {
        return groupService.patchGroup(id, group);
    }

    @DeleteMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public void deletegroup(@PathVariable Long id) {
        groupService.deleteGroupById(id);
    }
}
