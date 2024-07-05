const parseJson = <T,>(guard: (o: unknown) => o is T) =>
  (text: string): ParseResult<T> => {
    const parsed = JSON.parse(text)
    return guard(parsed) ? { parsed, hasError: false } : { hasError: true }
  }

type ParseResult<T> =
  | { parsed: T; hasError: false; error?: undefined }
  | { parsed?: undefined; hasError: true; error?: unknown }

type SubscriptionSuccess = {
  result: null;
  id: null | number;
};
const subscriptionGuard = (o: unknown): o is SubscriptionSuccess => {
  return (o as SubscriptionSuccess)?.result === null
    && (o as SubscriptionSuccess)?.id !== undefined
    && typeof (o as SubscriptionSuccess).id === "string"
    && !isNaN(Number((o as SubscriptionSuccess).id))
};
type Payload = {
  e: string;
  E: number;
  s: string;
  p: string;
  P: string;
  w: string;
  c: string;
  Q: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
  C: number;
  O: number;
  F: number;
  L: number;
  n: number;
};

const payloadItemGuard = (o: unknown): o is Payload => {
  return (o as Payload).e !== undefined  && typeof (o as Payload).e === "string"
    && (o as Payload).E !== undefined && typeof (o as Payload).E === "number" && !isNaN(Number((o as Payload).E))
    && (o as Payload).s !== undefined && typeof (o as Payload).s === "string"
    && (o as Payload).p !== undefined && typeof (o as Payload).p === "string"
    && (o as Payload).P !== undefined && typeof (o as Payload).P === "string"
    && (o as Payload).w !== undefined && typeof (o as Payload).w === "string"
    && (o as Payload).c !== undefined && typeof (o as Payload).c === "string"
    && (o as Payload).Q !== undefined && typeof (o as Payload).Q === "string"
    && (o as Payload).o !== undefined && typeof (o as Payload).o === "string"
    && (o as Payload).h !== undefined && typeof (o as Payload).h === "string"
    && (o as Payload).l !== undefined && typeof (o as Payload).l === "string"
    && (o as Payload).v !== undefined && typeof (o as Payload).v === "string"
    && (o as Payload).q !== undefined && typeof (o as Payload).q === "string"
    && (o as Payload).O !== undefined && typeof (o as Payload).O === "number" && !isNaN(Number((o as Payload).O))
    && (o as Payload).C !== undefined && typeof (o as Payload).C === "number" && !isNaN(Number((o as Payload).C))
    && (o as Payload).F !== undefined && typeof (o as Payload).F === "number" && !isNaN(Number((o as Payload).F))
    && (o as Payload).L !== undefined && typeof (o as Payload).L === "number" && !isNaN(Number((o as Payload).L))
    && (o as Payload).n !== undefined && typeof (o as Payload).n === "number" && !isNaN(Number((o as Payload).n))
};
const payloadGuard = (o: unknown): o is Payload[] => {
  return Array.isArray(o)
    && o.every(payloadItemGuard)
};


export { 
  parseJson,
  payloadGuard,
  subscriptionGuard,
}
