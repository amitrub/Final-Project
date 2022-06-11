import {base_url, getOrPostEventSuppliers} from "../../constants/urls";
import fetchTimeout from "fetch-timeout";
import {STATUS_FAILED, STATUS_SUCCESS} from "../../constants/errorHandler";
import {logApiRequest} from "../../constants/logger";
import {logAndCreateErrorMessage} from "../../validations/validations";
import {global_timeout, global_timeout_message} from "../../global/GlobalValues";

export async function saveNewSupplierRequest(
    myContext,
    supplierToAdd,
    eventId,
    setSuppliers,
    navigation
) {
    const {token, refresh, setRefresh, setIsLoading} = myContext;
    const url = base_url + getOrPostEventSuppliers(eventId);
    let functionName = "Save New Supplier Request";
    let request = {
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
    };
    logApiRequest(functionName, url, request);
    await fetchTimeout(url, request, global_timeout, "Timeout")
        .then(async (res) => {
            const data = await res.json();
            if (STATUS_FAILED(res.status)) {
                setSuppliers([]);
                logAndCreateErrorMessage(data, functionName);
            } else if (STATUS_SUCCESS(res.status)) {
                setRefresh(!refresh);
                navigation.pop();
                setIsLoading(false);
                navigation.navigate("SupplierPage", {
                    eventId: eventId,
                    supplierId: data.id,
                    isAddSupplier: true,
                });
            }
        })
        .catch((err) => {
            setSuppliers([]);
            setIsLoading(false);
            logAndCreateErrorMessage({"Error": global_timeout_message}, functionName);
        });
    setIsLoading(false);
}
