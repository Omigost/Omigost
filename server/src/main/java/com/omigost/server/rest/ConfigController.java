package com.omigost.server.rest;

import com.omigost.server.aws.OrganizationService;
import com.omigost.server.exception.NotFoundException;
import com.omigost.server.model.Account;
import com.omigost.server.model.Communication;
import com.omigost.server.model.User;
import com.omigost.server.repository.AccountRepository;
import com.omigost.server.repository.CommunicationRepository;
import com.omigost.server.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

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
        userRepository.save(new User(name));
    }

    @PostMapping("addCommunicationToUser")
    @Transactional
    public void addCommunicationToUser(@RequestParam String userName, @RequestParam String communicationName,
                                       @RequestParam String communicationValue) {
        Communication communication = new Communication(communicationName, communicationValue);
        User user = userRepository.getUserByName(userName);
        if (user == null) {
            throw new NotFoundException("User by this name could not be found");
        }

        communication.setUser(user);
        user.getCommunications().add(communication);
        communicationRepository.save(communication);
        userRepository.save(user);
    }

    @PostMapping("/addAccountToUser")
    @Transactional
    public void addAccountToUser(@RequestParam String userName, @RequestParam String accountName) {
        if (!organizationService.doesAccountExist(accountName)) {
            throw new NotFoundException("Account by this name could not be found");
        }

        Account account = accountRepository.getOrCreate(accountName);

        User user = userRepository.getUserByName(userName);
        if (user == null) {
            throw new NotFoundException("User by this name could not be found");
        }

        user.getAccounts().add(account);
        account.getUsers().add(user);
        userRepository.save(user);
    }

    @DeleteMapping("/user")
    @Transactional
    public void deleteUser(@RequestParam String name) {
        userRepository.deleteUserByName(name);
    }

    @DeleteMapping("/deleteUserAccount")
    @Transactional
    public void deleteUserAccount(@RequestParam String userName, @RequestParam String accountName) {
        Account account = accountRepository.getAccountByName(accountName);
        User user = userRepository.getUserByName(userName);

        if (account == null) {
            throw new NotFoundException("Account by this name could not be found");
        } else if (user == null) {
            throw new NotFoundException("User by this name could not be found");
        }

        user.getAccounts().remove(account);
        account.getUsers().remove(user);
        userRepository.save(user);
    }

    @DeleteMapping("/deleteUserCommunication")
    @Transactional
    public void deleteUserCommunication(@RequestParam String userName, @RequestParam String communicationName,
                                                @RequestParam String communicationValue) {
        User user = userRepository.getUserByName(userName);
        Communication communication =
                communicationRepository.getCommunicationByNameAndValueAndUser(communicationName, communicationValue, user);
        if (communication == null) {
            throw new NotFoundException("Communication by this name, value and username could not be found");
        }

        communicationRepository.delete(communication);
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/accounts")
    public List<com.amazonaws.services.organizations.model.Account> getAccounts() {
        organizationService.fetchAccounts();
        return organizationService.fetchAccounts();
    }
}
