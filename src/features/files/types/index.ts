export type TFile = {
  id: number;
  type: string;
  name: string;
  size: number;
  path: string;
  isPinned: boolean;
  dateCreated: number;
};

export type TPagination = {
  page: number;
  offset: number;
};
