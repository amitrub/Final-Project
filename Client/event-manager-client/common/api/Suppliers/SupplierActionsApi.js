import { base_url, getOrPutSupplier } from "../../constants/urls";
import Log from "../../constants/logger";
import { logAndCreateErrorMessage } from "../../validations/validations";
import fetchTimeout from "fetch-timeout";
import {
  createOneButtonAlert,
  createTwoButtonAlert,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "../../constants/errorHandler";
import { global_timeout } from "../../global/GlobalValues";

export async function fetchSupplierDataRequest(
  myContext,
  event_id,
  supplierId,
  setSupplier
) {
  const { token, setIsLoading } = myContext;
  setIsLoading(true);
  const url = base_url + getOrPutSupplier(event_id, supplierId);
  await fetch(
    url,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    },
    { timeout: global_timeout }
  )
    .then(async (res) => {
      const data = await res.json();
      setSupplier(data);
    })
    .catch((err) => {
      setIsLoading(false);
      Log.error("SupplierPage >> getData >> error", err);
    });
}

export async function payToSupplierRequest(
  myContext,
  event_id,
  supplierId,
  navigation
) {
  const { token, refresh, setRefresh, setIsLoading } = myContext;
  setIsLoading(true);
  const url = base_url + getOrPutSupplier(event_id, supplierId);
  await fetchTimeout(
    url,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ has_paid: true }),
    },
    global_timeout,
    "Timeout"
  )
    .then(async (res) => {
      const data = await res.json();
      if (STATUS_FAILED(res.status)) {
        logAndCreateErrorMessage(data, "pay to Supplier Request");
      } else if (STATUS_SUCCESS(res.status)) {
        const message = "Payment passed successfully!";
        createOneButtonAlert(message, "OK", "", () => {
          setRefresh(!refresh);
          navigation.pop();
        });
      }
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      Log.error("AddEventOwner >> onSaveEvent >> failed with error: ", err);
    });
}

export async function saveSupplierRequest(
  myContext,
  event_id,
  supplierId,
  supplier,
  navigation
) {
  const { token, refresh, setRefresh, setIsLoading } = myContext;
  setIsLoading(true);
  const url = base_url + getOrPutSupplier(event_id, supplierId);
  await fetchTimeout(
    url,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ job: supplier.job, price: supplier.price }),
    },
    global_timeout,
    "Timeout"
  )
    .then(async (res) => {
      const data = await res.json();
      if (STATUS_FAILED(res.status)) {
        logAndCreateErrorMessage(data, "Save Supplier Request");
      } else if (STATUS_SUCCESS(res.status)) {
        setIsLoading(false);
        const message = "Supplier was updated";
        createOneButtonAlert(message, "OK", "Yay!", () => {
          setRefresh(!refresh);
          navigation.pop();
        });
      }
    })
    .catch((err) => {
      setIsLoading(false);
      Log.error("AddEventOwner >> onSaveEvent >> failed with error: ", err);
    });
}

export async function deleteSupplierRequest(
  myContext,
  event_id,
  supplierId,
  navigation
) {
  const { token, refresh, setRefresh, setIsLoading } = myContext;
  const url = base_url + getOrPutSupplier(event_id, supplierId);
  Log.info(`SupplierPage >> delete supplier >> url: ${url}`);
  const onPressYes = async () => {
    setIsLoading(true);
    await fetch(
      url,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      },
      { timeout: global_timeout }
    )
      .then(async () => {
        Log.info("SupplierPage >> delete supplier >> then");
        createOneButtonAlert("", "OK", "Supplier was deleted", () => {
          setRefresh(!refresh);
          navigation.pop();
          setIsLoading(false);
        });
      })
      .catch((err) => {
        setIsLoading(false);
        Log.error("SupplierPage >> delete supplier >> error", err);
      });
  };
  createTwoButtonAlert(
    "Are you sure you want to delete this supplier?",
    "Yes",
    "No",
    "Delete supplier",
    onPressYes
  );
}
