export type DocumentSearchType = {
  documentId: number;
  documentName: string;
  documentType: string;
  documentTypeName: string;
  companyId: number;
  templateId: number;
  templateName: string;
  color: string;
  checkLevel: number;
  inputNo: number;
  accessUser: number;
  createdBy: number;
  createdAt: string;
  modifiedBy: number;
  modifiedAt: string;
};

export type TypeOfDocument = {
  createdBy: string;
  modifiedBy: string;
  createdAt: string;
  modifiedAt: string;
  documentTypeId: number;
  typeName: string;
};

export type DocumentType = {
  documentId: number;
  documentName: string;
  templateId: number;
  documentTypeId: number;
  documentTypeName: string;
  createdAt: string;
  modifiedAt: string;
  formSectionsRecords: any[];
  documentLevelsRecords: DocumentLevelsRecordsType[];
};

export type DocumentLevelsRecordsType = {
  documentLevelId: number;
  documentId: number;
  documentTemplateId: number;
  levelName: string;
  levelOrder: number;
  adminLevelId: number;
  approvalStatus: string;
  levelUsersRecords: LevelUsersRecordsType[];
};

export type LevelUsersRecordsType = {
  levelUserId: number;
  documentLevelsId: number;
  user: {
    id: number;
    username: string;
    fullname: string;
    profile: string;
  };
};

export enum CardsType {
  Document = "Document",
  Template = "Template",
}
