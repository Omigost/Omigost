package com.omigost.server.rest;

import com.omigost.server.aws.OrganizationService;
import com.omigost.server.exception.NotFoundException;
import com.omigost.server.model.Account;
import com.omigost.server.model.User;
import com.omigost.server.repository.AccountRepository;
import com.omigost.server.repository.CommunicationRepository;
import com.omigost.server.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping("/config")
public class ConfigController {
    private UserRepository userRepository;
    private AccountRepository accountRepository;
    private CommunicationRepository communicationRepository;
    private OrganizationService organizationService;

    public ConfigController(UserRepository ur, AccountRepository ar, CommunicationRepository cr, OrganizationService os) {
        this.userRepository = ur;
        this.accountRepository = ar;
        this.communicationRepository = cr;
        this.organizationService = os;
    }

    @PutMapping("/user")
    public void addUser(@RequestParam String name) {
        User newUser = new User();
        newUser.name = name;

        userRepository.save(newUser);
    }

    @DeleteMapping("/user")
    @Transactional
    public void deleteUser(@RequestParam String name) {
        userRepository.deleteUserByName(name);
    }

    @PostMapping("/addAccountToUser")
    @Transactional
    public void addAccountToUser(@RequestParam String userName, @RequestParam String accountName) {
        if (!organizationService.doesAccountExist(accountName)) {
            throw new NotFoundException("Account by this name could not be found");
        }

        Account account = accountRepository.getOrCreate(accountName);

        User user = userRepository.findUsersByName(userName);
        if (user == null) {
            throw new NotFoundException("User by this name could not be found");
        }

        user.accounts.add(account);
        userRepository.save(user);
    }
}
