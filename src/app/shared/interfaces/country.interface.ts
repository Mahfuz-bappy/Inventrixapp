export interface Country {
    id: number;    // API returns id as number
    code: string;  // API returns code
    name: string;  // API returns name
    states: any[]; // API returns states as an array (could be State[] interface later if needed)
  }

  export interface State {
    id: number;         // API State ID is a number
    countryId: number;  // API countryId is a number
    code: string;
    name: string;
    country?: Country; // Optional, if you might use related Country data
    districts?: any[]; // Optional, districts, type as needed if you use districts
  }

  export interface City {
    id: number;      // Assuming City ID is a number from API
    stateId: number; // Assuming stateId in City is also a number
    name: string;
    code?: string;     // Optional code if API provides it
    state?: State;    // Optional state details if API provides it
  }
  