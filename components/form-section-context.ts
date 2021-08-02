import { ClientDataKey } from '../hooks/client-data'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormSectionContext<P = any> = {
  component: React.FunctionComponent<P>,
  key: string,
  mutates: ClientDataKey[]
}
