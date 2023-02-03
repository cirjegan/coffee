// Sample Data
/*
{
  "id": 3337,
  "uid": "9b038574-9a8c-4324-af01-1bc121472e47",
  "blend_name": "Joe Coffee",
  "origin": "Kiamba, Kenya",
  "variety": "Colombia",
  "notes": "muted, syrupy, red currant, lemonade, strawberry",
  "intensifier": "bright"
}
*/

export interface Product {
  id: number;
  uid: string;
  blend_name: string;
  origin: string;
  variety: string;
  notes: string;
  intensifier: string;
}

export interface PageQuery {
  pageIndex: number;
  pageSize: number;
  firstPage: boolean;
  lastPage: boolean;
}