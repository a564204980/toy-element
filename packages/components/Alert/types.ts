export type AlertType = "success" | "info" | "warning" | "danger";

export interface AlertProps {
  title?: string;
  type?: AlertType;
  description?: string;
  effect?: "dark" | "light";
  closeable?: boolean; // 是否可关闭
  center?: boolean;
  showIcon?: boolean;
}

export interface AlertEmits {
  (e: "close"): void;
}

export interface AlertInstance {
  close: () => void;
  open: () => void;
}
