import "isomorphic-fetch"
import testsHelper from "./testsHelper";

const helper = new testsHelper();

describe('event addition tests', () => {

    beforeAll(async () => {
        await helper.registerUser(helper.user);
        await helper.loginuser(helper.user.email,helper.user.password);
        await helper.postEventManager();
        await helper.postEvent();
    })

    test('check get event owner from event', async () => {
        await helper.postEventOwner(helper.eventownervalid);
        await expect(helper.geteventsub("event_owner")).resolves.toMatch(/(amit)/i)
    });

    test('check get event owner wrong name', async () => {
        await helper.postEventOwner(helper.eventownervalid);
        await expect(helper.geteventsub("event_owner")).resolves.not.toMatch(/(daniel)/i)
    });

    test('check get event supplier', async () => {
        await helper.postSupplier(helper.suppliervalid);
        await expect(helper.geteventsub("supplier")).resolves.toMatch(/(reut)/i)
    });

    test('check get event supplier wrong name', async () => {
        await helper.postSupplier(helper.suppliervalid);
        await expect(helper.geteventsub("supplier")).resolves.not.toMatch(/(amit)/i)
    });

    test('check get event schedule name', async () => {
        await helper.posteventschedule(helper.eventschvalid);
        await expect(helper.geteventsub("event_schedule")).resolves.toMatch(/(flowers)/i)
    });

    test('check get event schedule from', async () => {
        await helper.posteventschedule(helper.eventschvalid);
        await expect(helper.geteventsub("event_schedule")).resolves.toMatch(/(2022-10-12)/i)
    });

    test('check get event schedule wrong name', async () => {
        await helper.posteventschedule(helper.eventschvalid);
        await expect(helper.geteventsub("event_schedule")).resolves.not.toMatch(/(food meeting)/i)
    });

    test('post supplier not valid', async () => {
        await expect(helper.postSupplier(helper.suppliernotvalid)).resolves.toMatch(/(error)/i)
    });

    test('post event schedule not valid', async () => {
        await expect(helper.posteventschedule(helper.eventschnotvalid)).resolves.toMatch(/(error)/i)
    });

    test('post event owner not valid', async () => {
        await expect(helper.postEventOwner(helper.eventownernotvalid)).resolves.toMatch(/(error)/i)
    });

})

