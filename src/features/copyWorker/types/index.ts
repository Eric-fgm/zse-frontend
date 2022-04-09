export type TCopyWorker = {
  id: number;
  recipient: string;
  topic: string;
  content: string;
  attachments: string;
  isPinned: boolean;
  dateCreated: number;
};

export type TPagination = {
  page: number;
  offset: number;
};
