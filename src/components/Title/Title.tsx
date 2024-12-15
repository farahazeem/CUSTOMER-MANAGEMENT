interface TitleProps {
  title: string;
  fontSize?: string;
  margin?: string;
}

export default function Title({ title, fontSize, margin }: TitleProps) {
  return <h1 style={{ fontSize, margin, color: "#0370b9" }}>{title}</h1>;
}
