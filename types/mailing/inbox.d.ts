
export interface MailingInboxMessage {
  _id: string;
  fromDestination: string;
  toDestination: string;
  phone: string;
  createdAt: string;
  status: string;

}

export interface ContactFormData {
  _id: string;
  status: string;
  name:string;
  phone: string;
  message: string;
  createdAt: string;
}