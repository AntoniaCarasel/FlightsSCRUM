package ro.unibuc.flightapp.service.api;

import ro.unibuc.flightapp.model.Account;

public interface AccountService {

    Account save(Account account);

    Account getOne(long id);

    Iterable<Account> getAll();

    void deleteOne(long id);
}
