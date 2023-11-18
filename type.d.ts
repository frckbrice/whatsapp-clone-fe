export type Placement =
  | "top"
  | "bottom"
  | "right"
  | "left"
  | "bottomStart"
  | "bottomEnd"
  | "topStart"
  | "topEnd"
  | "leftStart"
  | "leftEnd"
  | "rightStart"
  | "rightEnd"
  | "auto"
  | "autoVerticalStart"
  | "autoVerticalEnd"
  | "autoHorizontalStart"
  | "autoHorizontalEnd";

type User = {
  created_at?: string;
  email?: string;
  id?: string;
  image?: string;
  name: string;
  phone?: string;
  updated_at?: string;
};

type Message = {
  id?: string;
  created_at?: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  sent_at?: string;
  updated_at?: string;
  emoji?: string;
};

type Group = {
  room_id?: string;
}
