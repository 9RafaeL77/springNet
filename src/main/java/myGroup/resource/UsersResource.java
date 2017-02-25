package myGroup.resource;

import myGroup.entity.Users;

/**
 * Created by Rafael on 21.11.2016.
 */
final public class UsersResource {
    private String firstName;
    private String lastName;
    private Boolean admin;

    public UsersResource(Users users) {
        this.firstName = users.getFirstName();
        this.lastName = users.getLastName();
        this.admin = users.isAdmin();
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }
}
