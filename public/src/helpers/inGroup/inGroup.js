export default (account, groupName) => {
    let inGroup = false;

    if (account.groups && account.groups.items.length) {
        let i = account.groups.items.length;

        while (i--) {
            let group = account.groups.items[i];

            if (group.name === groupName && group.status.toLowerCase() === 'enabled') {
                inGroup = true;

                break;
            }
        }
    }

    return inGroup;
};