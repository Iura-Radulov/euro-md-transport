import datetime from "zod/src/v3/benchmarks/datetime";

export interface MailingInboxMessage {
  fromDestination: string;
  toDestination: string;
  phone: string;
  createdAt: string;
  status: string;

}
