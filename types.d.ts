type User = {
  _id: string;
  code: string;
  fullName: string;
  emailAddress: string;
  createdAt: string;
  updatedAt: string;
};

type Project = {
  _id: string;
  code: string;
  name: string;
  description: string;
  AIResponse: string;
  createdBy: Types.ObjectId
  createdAt: Date;
  updatedAt: Date;
}