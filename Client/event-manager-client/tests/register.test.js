import "isomorphic-fetch"
import testsHelper from "./testsHelper";

const helper = new testsHelper();

describe('my test', () => {

    beforeAll(async() =>{
        await helper.registerUser(helper.user);
    })

    test('register user bad email', async () => {
        await expect(helper.registerUser(helper.userbademail)).resolves.toMatch(/(error)/i)
    });

    test('register user invalid phone', async () => {
        await expect(helper.registerUser(helper.userbadphone)).resolves.toMatch(/(error)/i)
    });

    test('register user with the same name' , async () => {
        await expect(helper.registerUser(helper.user)).resolves.toMatch(/(error)/i)
    });

    test('register user with no password' , async () => {
        await expect(helper.registerUser(helper.userbadpassword)).resolves.toMatch(/(error)/i)
    });
})

