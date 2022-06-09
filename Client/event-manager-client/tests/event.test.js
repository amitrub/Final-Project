import "isomorphic-fetch"
import testsHelper from "./testsHelper";

const helper = new testsHelper();

describe('events tests', () => {

    beforeAll(async () => {
        await helper.registerUser(helper.user);
        await helper.loginuser(helper.user.email, helper.user.password);
        await helper.postEventManager(helper.user_id);
    }, 30000)

    test('user is event manager', async () => {
        await expect(helper.getEventManager()).resolves.toMatch(/(true)/i)
    });

    test('check post event', async () => {
        await expect(helper.postEvent()).resolves.not.toMatch(/(error)/i)
    });

    test('check get event name', async () => {
        await expect(helper.getEvent()).resolves.toMatch(/(hadas@roee)/i)
    });

    test('check get event name wrong', async () => {
        await expect(helper.getEvent()).resolves.not.toMatch(/(hello)/i)
    });

    test('check get event type', async () => {
        await expect(helper.getEvent()).resolves.toMatch(/(wedding)/i)
    });

    test('check get event type wrong', async () => {
        await expect(helper.getEvent()).resolves.not.toMatch(/(bar mithva)/i)
    });

    test('check get event date', async () => {
        await expect(helper.getEvent()).resolves.toMatch(/(2022-10-08)/i)
    });

    test('check get event date wrong', async () => {
        await expect(helper.getEvent()).resolves.not.toMatch(/(2022-10-18)/i)
    });
})

