package ro.unibuc.flightapp.service.impl;

import org.springframework.stereotype.Service;
import ro.unibuc.flightapp.model.Account;
import ro.unibuc.flightapp.repo.AccountRepository;
import ro.unibuc.flightapp.service.api.AccountService;

import java.util.NoSuchElementException;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository repository;

    public AccountServiceImpl(AccountRepository repository) {
        this.repository = repository;
    }

    @Override
    public Account save(Account account) {
        return repository.save(account);
    }

    @Override
    public Account getOne(long id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("No account with this ID exists"));
    }

    @Override
    public Iterable<Account> getAll() {
        return repository.findAll();
    }

    @Override
    public void deleteOne(long id) {
        repository.deleteById(id);
    }
}
