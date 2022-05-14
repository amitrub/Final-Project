import SupplierEntity from "../../Entities/SupplierEntity";
import Log from "../../constants/logger";
import {base_url, getOrPostEventSuppliers} from "../../constants/urls";

export async function fetchEventSuppliers (eventId, myContext, setEventSuppliersData, setIsLoading, setError) {
    const url = base_url + getOrPostEventSuppliers(eventId);
    await fetch(
        url,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${myContext.token}`,
            },
        },
        {timeout: 2000}
    )
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
            setError(err);
            Log.error("AllEventsSuppliers >> getData >> error", err);
        });
}