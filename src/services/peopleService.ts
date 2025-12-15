import apiClient from "./apiClient";
import type { APITmdbPeopleDetailsResponse } from "../types/people.types";

export const peopleService = {
    getDetailPeople: async (
        id: string
    ): Promise<APITmdbPeopleDetailsResponse> => {
        const response = await apiClient.get(
            `/person/${id}?language=es`
        );
        return response.data;
    }
}