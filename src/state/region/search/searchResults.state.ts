import { BehaviorSubject } from "rxjs";

const searchResults = new BehaviorSubject<string[]>([]);
export const searchResults$ = searchResults.asObservable();

type RecentSearchResults = {
  data: string[];
};

const fetchRecentSearchResults = async () => {
  try {
    const response = await fetch("");
    const json = await response.json();

    searchResults.next(json["data"] as string[]);
  } catch (error) {}
};

export const behaviours = {
  fetchRecentSearchResults,
};
