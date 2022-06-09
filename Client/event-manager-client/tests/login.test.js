import "isomorphic-fetch"
import testsHelper from "./testsHelper";

const helper = new testsHelper();

describe('my test', () => {

    beforeAll(async () => {
        await helper.registerUser(helper.user);
    });

    test('login successfully', async () => {
        await expect(helper.loginuser(helper.user.email,"8111996")).resolves.not.toMatch(/(error)/i)
    });

    test('login bad password', async () => {
        await expect(helper.loginuser("reutlevy85@gmail.com","81119")).resolves.toMatch(/(error)/i)
    });

    test('login bad user name', async () => {
        await expect(helper.loginuser("reutlevy@gmail.com","8111996")).resolves.toMatch(/(error)/i)
    });
})

