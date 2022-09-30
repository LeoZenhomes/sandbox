const AUTH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qVTNRamhCUXpReVJVUTFNamhHUTBZeU5qVXlPRVk0TmpGQ05FTTBNemxHUlRORE1ESXlSZyJ9.eyJodHRwczovL3Zlcm1pZXRldC5kZS9hcHBfbWV0YWRhdGEiOnsiemVuaG9tZXNfaWQiOiI2YWJmYzNjMS0xNzFkLTQyZTUtYTY0My1kNTYwMjdmNDY0OTYifSwiZW1haWwiOiJwYXVsLmt1amF3YUB6ZW5ob21lcy5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5kZXYudmVybWlldGV0LmRlLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA2Njg0Mjk4NzExODI0MzExMjQyIiwiYXVkIjoiWHF0QlRQdDlSM3VHeWc0ZEluZ0JjbjBSZjF2clhJS3QiLCJpYXQiOjE2NTMzMzI1ODcsImV4cCI6MTY1MzM2ODU4NywiYXRfaGFzaCI6InZsMHg2VHNHQ1VlZFIydzk5blNKb3ciLCJub25jZSI6IjJoZktzeEpvQlFEc1VNaDVsd3dMc0ZBMHFidFp5Z29PIn0.cXtGlOMpbrgk8Fnhco3NyRTwUAVoyDZ07UkRp9G3XnB8i5JTvULFk2dxQL6na1q8DEBGuA2HUp19Hkss0EOMyzrCWJGWfMHdPzbEn65hn_dWT0xbH0ozCXmcwsL6049HSJYO8Ax5dcK7rSFR5s5byL2YWHbiCRCR2eFgrDzqqoao0SIbNC6FYGtJGFHvn5XzFPTaIm2n3KWowppH-pSiFnYGySE8bUPQfvba1MWAYR91t0cRWywYwNDq4zxdC4WwoGwNMnAftvpdcUdo_Wuw5X6A_v-LXihubVletDtzdogwuRQvDYm5OnUJ-S4lUh0avL8NmwEN7dXr4AYIyXpeNA";

export const ApiClient = (() => {
  return {
    async handleResponse(response: Response) {
      let data;

      try {
        data = await response.json();
      } catch (error) {
        data = null;
      }

      if (response.ok) {
        return data;
      }

      (response as any).data = data;
      throw response;
    },

    async get(url: string) {
      const response = await fetch(url, {
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + AUTH_TOKEN,
        },
      });

      return ApiClient.handleResponse(response);
    },
  };
})();

/* 
export const ApiClient = {
  async get(url: string) {
    const response = await fetch(url, {
      headers: {
        "content-type": "application/json",
        // Authorization: "Bearer " + AUTH_TOKEN,
      },
    });

    if (!response.ok) {
      throw response;
    }

    return response.json();
  },
};


*/
