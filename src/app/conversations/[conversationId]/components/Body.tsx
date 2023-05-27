import { FullMessageType } from "@/types/message";

interface BodyProps {
  // initialMessages?: FullMessageType[]; // TODO: Optional 해제하기
}

export default function Body({}: BodyProps) {
  return <div className="flex-1 overflow-y-auto">Body!!!!!</div>;
}
