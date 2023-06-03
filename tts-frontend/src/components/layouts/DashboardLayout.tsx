import { Container } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FunctionComponent<Props> = (props: Props) => {
  return <Container>{props.children}</Container>;
};

export default DashboardLayout;
