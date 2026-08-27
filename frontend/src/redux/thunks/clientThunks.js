import { setRoles } from "../actions/clientActions";
import { getRoles as fetchRoles } from "../../api/auth";

let rolesRequestStarted = false;

export const getRoles = () => {
    return async (dispatch, getState) => {
        const roles = getState().client.roles;

        if (roles.length > 0 || rolesRequestStarted) {
            return;
        }

        rolesRequestStarted = true;

        try {
            const response = await fetchRoles();

            dispatch(setRoles(response.data));
        } catch (error) {
            console.error(
                "Failed to fetch roles:",
                error
            );

            /*
             * Allow another attempt if the request fails.
             */
            rolesRequestStarted = false;
        }
    };
};
