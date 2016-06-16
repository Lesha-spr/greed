export default class User {
    constructor(user) {
        this.user = user;
    }

    inGroup(groupName) {
        let inGroup = false;

        if (this.user.account.groups && this.user.account.groups.items.length) {
            let i = this.user.account.groups.items.length;

            while (i--) {
                let group = this.user.account.groups.items[i];

                if (group.name === groupName) {
                    inGroup = true;

                    break;
                }
            }
        }

        return inGroup;
    }

    isEnabled() {
        return this.user.account.status.toLowerCase() === User.DEFAULTS.ENABLED.toLowerCase();
    }

    isAdmin() {
        return this.inGroup(User.DEFAULTS.GROUPS.ADMIN);
    }
};

User.DEFAULTS = {
    GROUPS: {
        ADMIN: 'Admin'
    },
    ENABLED: 'ENABLED'
};