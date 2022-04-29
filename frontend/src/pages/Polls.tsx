import React, { useEffect, useState } from "react";
import Panel from "../components/Polls/Panel";
import Chart from "../components/Polls/Chart";
import axios from "../axios";

const Polls = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ name: "", description: "", votes: {} });

  useEffect(() => {
    axios
      .get("/polls/")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log({ err }));
  }, []);

  if (loading) return <div></div>;

  return (
    <Panel name={data.name} description={data.description}>
      <Chart votes={data.votes} />
    </Panel>
  );
};

export default Polls;
