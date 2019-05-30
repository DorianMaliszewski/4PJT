package com.pjtback.pjtback.service.Impl;

import com.pjtback.pjtback.model.User;
import com.pjtback.pjtback.repo.UserRepo;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private UserRepo userRepository;


    public UserDetailsServiceImpl(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = this.userRepository.findByUsername(s);

        if (user == null) {
            throw new BadCredentialsException("Identifiants incorrect");
        }

        new AccountStatusUserDetailsChecker().check(user);

        return user;
    }

}
