package fr.mistral.services.impl;


import fr.mistral.domain.User;
import fr.mistral.repositories.UserRepository;
import fr.mistral.services.UserService;
import fr.mistral.shared.Utils;
import fr.mistral.shared.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author hamza.elidrissi  27/02/2021.
 */
@AllArgsConstructor
@Service
public class UserSeviceImpl implements UserService {

    UserRepository userRepository;
    PasswordEncoder bCryptPasswordEncoder;
    Utils util;


    @Override
    public UserDto createUser(UserDto user) {

        Optional<User> checkUser = userRepository.findByEmail(user.getEmail());

        if (checkUser.isPresent()) throw new RuntimeException("User Alrady Exists !");


        ModelMapper modelMapper = new ModelMapper();

        User userEntity = modelMapper.map(user, User.class);


        userEntity.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        userEntity.setUserId(util.generateStringId(32));

        User newUser = userRepository.save(userEntity);

        UserDto userDto = modelMapper.map(newUser, UserDto.class);

        return userDto;
    }


    @Override
    public UserDto getUser(String email) {

        User user = userRepository.findByEmail(email).orElseThrow(()->{
            return new UsernameNotFoundException("Email : "+ email + "Not found");
        });

        UserDto userDto = new UserDto();

        BeanUtils.copyProperties(user, userDto);

        return userDto;
    }


    @Override
    public User getUserByUserId(String userId) {

        User user = userRepository.findByUserId(userId);

        if (user == null) throw new UsernameNotFoundException(userId);

        /*UserDto userDto = new UserDto();

        BeanUtils.copyProperties(userEntity, userDto);*/
        //userEntity.setPassword(bCryptPasswordEncoder.encode(userEntity.getPassword()));
        return user;
    }

    @Override
    public User patchUser(Long id, User user) {
        return userRepository.findById(id).map(us -> {

            if (user.getFirstName() != null) {
                us.setFirstName(user.getFirstName());
            }
            if (user.getLastName() != null) {
                us.setLastName(user.getLastName());
            }
            if (user.getEmail() != null) {
                us.setEmail(user.getEmail());
            }
            if (user.getPassword() != null) {
                us.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            }
            if (user.getGroups() != null) {
                us.setGroups(user.getGroups());
            }
            User userUpdated = userRepository.save(us);


            return userUpdated;

        }).orElseThrow(ResourceNotFoundException::new);
    }


    @Override
    public List<User> getUsers() {


        return (List<User>) userRepository.findAll();
    }

}
