import { Alert, Col, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import millify from "millify";
import { json, unsplash } from "../../api/unsplash";

interface Props {
  username: string;
}

interface Stadistic {
  total: number | any;
  value: number;
}

export function StatisticsProfile({ username }: Props) {
  const [labels, setLabel] = useState<Array<string>>([]);
  const [downloads, setDownloads] = useState<Stadistic>({ total: 0, value: 0 });
  const [likes, setLikes] = useState<Stadistic>({ total: 0, value: 0 });
  const [views, setViews] = useState<Stadistic>({ total: 0, value: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    unsplash.users
      .statistics(username, "days", 30)
      .then(json)
      .then((data) => {
        const label: Array<string> = [];

        data.downloads.historical.values.map((item: { date: string }) =>
          label.push(item.date)
        );
        setLabel(label);

        setDownloads({
          total: data.downloads.total,
          value: data.downloads.historical.values.map(
            (item: { value: number }) => item.value
          ),
        });

        setLikes({
          total: data.likes.total,
          value: data.likes.historical.values.map(
            (item: { value: number }) => item.value
          ),
        });

        setViews({
          total: data.views.total,
          value: data.views.historical.values.map(
            (item: { value: number }) => item.value
          ),
        });

        setIsLoading(false);
      });
  }, [username]);

  return (
    <>
      <Row justify="center">
        <Col span={23}>
          {isLoading ? (
            <Spin size="large">
              <Alert
                type="info"
                message="Obteniendo datos estadisticos........."
              />
            </Spin>
          ) : (
            <>
              <p style={{ textAlign: "center", padding: 10 }}>
                Estadisticas de los ultimos <strong>30 Dias</strong>.
              </p>
              <Line
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: "Downloads",
                      data: downloads?.value,
                      backgroundColor: [
                        `rgba(255, 206, 86, 0.2)`,
                        `rgba(255, 99, 132, 0.2)`,
                        `rgba(54, 162, 235, 0.2)`,
                        `rgba(75, 192, 192, 0.2)`,
                        `rgba(153, 102, 255, 0.2)`,
                        `rgba(255, 159, 64, 0.2)`,
                      ],
                      borderColor: [
                        `rgba(255, 99, 132, 1)`,
                        `rgba(54, 162, 235, 1)`,
                        `rgba(255, 206, 86, 1)`,
                        `rgba(75, 192, 192, 1)`,
                        `rgba(153, 102, 255, 1)`,
                        `rgba(255, 159, 64, 1)`,
                      ],
                      borderWidth: 2,
                    },
                    {
                      label: "Likes",
                      data: likes?.value,
                      backgroundColor: [
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                      ],
                      borderColor: [
                        "rgba(75, 192, 192, 1)",
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                      ],
                      borderWidth: 2,
                    },
                    {
                      label: "Views",
                      data: views?.value,
                      backgroundColor: [
                        "rgba(203, 34, 73, 0.338)",
                        "rgba(181, 76, 31, 0.653)",
                        "rgba(234, 23, 69, 0.818)",
                        "rgba(203, 16, 81, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                      ],
                      borderColor: [
                        "#e61dcf",
                        "rgba(255, 99, 132, 1)",
                        "#c41268",
                        "#bb13c4",
                        "#c2413f",
                        "#f71b17",
                      ],
                      borderWidth: 2,
                    },
                  ],
                }}
              />
            </>
          )}
        </Col>
      </Row>
      <br />
      <br />
      <Row justify="space-around">
        <Col xs={22} md={5}>
          Downloads: <strong>{millify(downloads?.total)}</strong>
        </Col>
        <Col xs={22} md={5}>
          Likes: <strong>{millify(likes?.total)}</strong>
        </Col>
        <Col xs={22} md={5}>
          Views: <strong>{millify(views?.total)}</strong>
        </Col>
        <br />
      </Row>
    </>
  );
}
