jest.unmock('./../user.js');

import User from './../user.js';

let userData, user;

describe('User', () => {
    beforeEach(() => {
        userData = {
            account: {
                groups: {
                    items: [
                        {
                            name: 'Mock1'
                        },
                        {
                            name: 'Mock2'
                        }
                    ]
                },
                status: 'ENABLED'
            }
        };

        user = new User(userData);
    });

    describe('#isEnabled', () => {
        it('should return true when user is enabled', () => {
            expect(user.isEnabled()).toBe(true);
        });

        it('should return false when user is disabled', () => {
            user.user.account.status = 'DISABLED';

            expect(user.isEnabled()).toBe(false);
        });
    });

    describe('#inGroup', () => {
        it('should return true when user is in group', () => {
            expect(user.inGroup('Mock1')).toBe(true);
        });

        it('should return false when user not in group', () => {
            expect(user.inGroup('Mock3')).toBe(false);
        });

        it('should return false when user have not any group membership', () => {
            delete user.user.account.groups;

            expect(user.inGroup('Mock1')).toBe(false);
        });
    });

    describe('#isAdmin', () => {
        it('should return true when user is in admin group', () => {
            user.user.account.groups.items.push({
                name: 'Admin'
            });
            expect(user.isAdmin()).toBe(true);
        });

        it('should return false when user not in admin group', () => {
            expect(user.isAdmin()).toBe(false);
        });
    });
});