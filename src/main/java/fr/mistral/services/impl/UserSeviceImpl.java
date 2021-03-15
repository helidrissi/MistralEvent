package fr.mistral.services.impl;


import fr.mistral.domain.Event;
import fr.mistral.domain.UserEntity;
import fr.mistral.repositories.UserRepository;
import fr.mistral.services.UserService;
import fr.mistral.shared.Utils;
import fr.mistral.shared.dto.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hel on 27/02/2021.
 */
@Service
public class UserSeviceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    Utils util;


    @Override
    public UserDto createUser(UserDto user) {

        UserEntity checkUser = userRepository.findByEmail(user.getEmail());

        if (checkUser != null) throw new RuntimeException("User Alrady Exists !");


        ModelMapper modelMapper = new ModelMapper();

        UserEntity userEntity = modelMapper.map(user, UserEntity.class);


        userEntity.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        userEntity.setUserId(util.generateStringId(32));

        UserEntity newUser = userRepository.save(userEntity);

        UserDto userDto = modelMapper.map(newUser, UserDto.class);

        return userDto;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserEntity userEntity = userRepository.findByEmail(email);

        if (userEntity == null) throw new UsernameNotFoundException(email);

        return new User(userEntity.getEmail(), userEntity.getPassword(), new ArrayList<>());
    }


    @Override
    public UserDto getUser(String email) {

        UserEntity userEntity = userRepository.findByEmail(email);

        if (userEntity == null) throw new UsernameNotFoundException(email);

        UserDto userDto = new UserDto();

        BeanUtils.copyProperties(userEntity, userDto);

        return userDto;
    }


    @Override
    public UserEntity getUserByUserId(String userId) {

        UserEntity userEntity = userRepository.findByUserId(userId);

        if (userEntity == null) throw new UsernameNotFoundException(userId);

        /*UserDto userDto = new UserDto();

        BeanUtils.copyProperties(userEntity, userDto);*/
        //userEntity.setPassword(bCryptPasswordEncoder.encode(userEntity.getPassword()));
        return userEntity;
    }

    @Override
    public UserEntity patchUser(Long id, UserEntity user) {
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
                us.setPassword(user.getPassword());
            }
            UserEntity userUpdated = userRepository.save(us);


            return userUpdated;

        }).orElseThrow(ResourceNotFoundException::new);
    }


    @Override
    public List<UserEntity> getUsers() {


        return (List<UserEntity>) userRepository.findAll();
    }

}
