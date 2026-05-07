import datetime from "zod/src/v3/benchmarks/datetime";

export interface MailingInboxMessage {
  fromDestination: string;
  toDestination: string;
  phone: string;
  createdAt: string;
  status: string;

}

export interface ContactFormData {
  _id: string;
  id?: string;
  status: string;
  createdAt: string;
  phone?: string;
  email:string;
  name:string;
}