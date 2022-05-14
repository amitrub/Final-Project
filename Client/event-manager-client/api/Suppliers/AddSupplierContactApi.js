import { base_url, getOrPostEventSuppliers } from "../../constants/urls";
import fetchTimeout from "fetch-timeout";
import {
  createOneButtonAlert,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "../../constants/errorHandler";
import Log from "../../constants/logger";

export async function saveNewSupplierRequest(
  myContext,
  supplierToAdd,
  eventId,
  setSuppliers,
  navigation
) {
  const { token, refresh, setRefresh, setIsLoading, setError } = myContext;
  const url = base_url + getOrPostEventSuppliers(eventId);
  await fetchTimeout(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        name: supplierToAdd.name,
        phone: supplierToAdd.phone,
        job: "Choose supplier job",
        price: 0,
        has_paid: false,
      }),
    },
    5000,
    "Timeout"
  )
    .then(async (res) => {
      const data = await res.json();
      if (STATUS_FAILED(res.status)) {
        Log.error("AddSupplier >> onSaveSupplier >> failed with error: ", data);
        setSuppliers([]);
        const message = "data.Error";
        createOneButtonAlert(message, "OK", "Add supplier contact failed");
      } else if (STATUS_SUCCESS(res.status)) {
        setRefresh(!refresh);
        createOneButtonAlert(
          "Contact has been chosen, fill supplier details and save it",
          "Great!",
          "Add supplier",
          () => {
            navigation.pop();
            setIsLoading(false);
            navigation.navigate("SupplierPage", {
              eventId: eventId,
              supplierId: data.id,
            });
          }
        );
      }
    })
    .catch((err) => {
      Log.error("AddSupplier >> onSaveSupplier >> failed with error: ", err);
      setSuppliers([]);
      setIsLoading(false);
      setError(err);
    });
  setIsLoading(false);
}