import { Container } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FunctionComponent<Props> = (props: Props) => {
  return <Container sx={{marginTop: '2vh'}}>{props.children}</Container>;
};

export default DashboardLayout;
