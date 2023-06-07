import { ProviderResponse } from "../ProvidersRespone";

export type selectedProviderProps = {
    selectedProviderState: ProviderResponse | undefined;
    selectedProviderSetState: React.Dispatch<React.SetStateAction<ProviderResponse | undefined>>;
  };