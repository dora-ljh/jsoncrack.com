export { ClearModal } from "./ClearModal";
export { DownloadModal } from "./DownloadModal";
export { ImportModal } from "./ImportModal";
export { NodeModal } from "./NodeModal";
export { ShareModal } from "./ShareModal";
export { JWTModal } from "./JWTModal";
export { SchemaModal } from "./SchemaModal";
export { JQModal } from "./JQModal";
export { TypeModal } from "./TypeModal";

type Modal =
  | "clear"
  | "download"
  | "import"
  | "node"
  | "share"
  | "jwt"
  | "schema"
  | "jq"
  | "type";

export type { Modal };
