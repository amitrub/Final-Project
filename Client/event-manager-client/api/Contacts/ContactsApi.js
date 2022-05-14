import * as Contacts from "expo-contacts";
import ContactEntity from "../../Entities/ContactEntity";

export async function fetchContacts(myContext, setFullData, setAllContacts) {
  const { setIsLoading, setError } = myContext;
  setIsLoading(true);
  Contacts.requestPermissionsAsync()
    .then((res) => {
      const { status } = res;
      if (status === "granted") {
        Contacts.getContactsAsync({})
          .then((res) => {
            const { data } = res;
            const contacts = data.map((c) => {
              const name = c.name
                ? c.name
                : c.firstName
                ? c.firstName
                : "no name";
              const phone = c.phoneNumbers ? c.phoneNumbers[0].number : "";
              return new ContactEntity(c.id, name, phone);
            });
            if (data.length > 0) {
              setFullData(contacts);
            }
            setAllContacts(contacts);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            setError(err);
          });
      }
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err);
    });
}
