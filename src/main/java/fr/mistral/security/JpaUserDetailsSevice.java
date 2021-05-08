package fr.mistral.security;

import fr.mistral.domain.User;
import fr.mistral.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Slf4j
@RequiredArgsConstructor
@Service
public class JpaUserDetailsSevice implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email).orElseThrow(()->{
            return new UsernameNotFoundException("Email :"+ email + "Not found");
        });
        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword()
                ,new ArrayList<>());
    }
}
