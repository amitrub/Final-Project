import SupplierEntity from "../../Entities/SupplierEntity";
import { logApiRequest } from "../../constants/logger";
import { base_url, getOrPostEventSuppliers } from "../../constants/urls";
import {
  global_timeout,
  global_timeout_message,
} from "../../global/GlobalValues";
import { logAndCreateErrorMessage } from "../../validations/validations";

export async function fetchEventSuppliers(
  myContext,
  eventId,
  setEventSuppliersData
) {
  const { token, setIsLoading } = myContext;
  const url = base_url + getOrPostEventSuppliers(eventId);
  let functionName = "Fetch Event Suppliers";
  let request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  logApiRequest(functionName, url, request);
  await fetch(url, request, { timeout: global_timeout })
    .then(async (res) => {
      const data = await res.json();
      const loadedSuppliers = [];
      for (const key in data) {
        loadedSuppliers.push(
          new SupplierEntity(
            data[key].id,
            data[key].name,
            data[key].phone,
            data[key].job,
            data[key].price,
            data[key].has_paid
          )
        );
      }

      setEventSuppliersData(loadedSuppliers);
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      logAndCreateErrorMessage({ Error: global_timeout_message }, functionName);
    });
}
