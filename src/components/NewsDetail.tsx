import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Article } from "../types/Article";

const NewsDetail: React.FC = () => {
  const location = useLocation();
  const article = location.state?.article as Article;

  if (!article) {
    return (
      <Container fluid className="my-5">
        <h2>Không có dữ liệu bài báo</h2>
      </Container>
    );
  }

  return (
    <Container fluid className="p-0">
      <Row className="gx-0">
        <Col
          md={6}
          className="p-5 d-flex flex-column justify-content-center"
          style={{ backgroundColor: "#fff" }}
        >
          <h1 className="mt-4" style={{ fontWeight: "bold" }}>
            {article.title}
          </h1>
          <p className="text-muted mb-2">
            {new Date(article.publishedAt).toLocaleDateString()} -{" "}
            {article.source.name}
          </p>
          {article.description && <p>{article.description}</p>}
          {article.content && <p>{article.content} </p>}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium
          neque quisquam aliquid, illo similique non praesentium ea eius
          accusamus animi ex aperiam. Molestias optio deserunt asperiores
          praesentium tenetur quis illo. Quasi in nisi corrupti molestiae
          possimus eaque reiciendis aspernatur vero dicta at accusamus quibusdam
          voluptatem molestias, deleniti totam assumenda error aperiam est sunt
          veritatis sit consectetur. Reprehenderit dolore quis explicabo!
          Dolorum vel placeat culpa rerum, voluptates libero neque sed nostrum
          excepturi voluptas suscipit. Reprehenderit ad, modi, sequi id adipisci
          explicabo ducimus consequatur facilis culpa neque numquam distinctio
          ab, ipsam tempora? Quae ad aut saepe recusandae, quis consequuntur,
          beatae nulla suscipit, a exercitationem nobis labore voluptate eveniet
          esse sed reprehenderit asperiores adipisci impedit enim. Tenetur eius
          cupiditate accusantium. Voluptates, atque culpa? Sed animi, quaerat
          incidunt qui natus ipsum, totam ipsa, dolor ut voluptas architecto!
          Maxime consectetur a mollitia esse. Velit, porro? Eligendi libero
          molestiae voluptatibus porro molestias repellat eos nulla dolorem.
          Illo aliquam amet voluptates aperiam neque quas, voluptatem
          consequatur nesciunt aliquid tempora velit illum voluptatibus quis
          culpa autem ratione minus corrupti voluptatum asperiores! Magni
          tenetur nobis dolore quia natus autem. Praesentium nostrum dolorem
          beatae. Ex doloremque, eos iure ducimus porro, quis, deleniti odit
          voluptatem esse recusandae culpa. Cum nisi impedit mollitia obcaecati
          modi illo, consequuntur non minima quo, minus officia! Enim sint
          molestiae, ipsam architecto voluptas minus maiores. Fugiat, quaerat
          recusandae possimus voluptatem iure officia dolorem minima at sed
          debitis adipisci, voluptatum rerum omnis, quas nostrum quibusdam!
          Unde, corporis accusantium? Quam, deleniti corrupti? Qui corporis
          excepturi sint fugiat eveniet error iusto, est nemo dolores veritatis
          recusandae pariatur cum, sapiente perspiciatis cumque earum officiis
          nisi! Ullam ea consequatur non adipisci perferendis. Similique quam
          nisi excepturi corporis fuga neque veniam consequuntur reiciendis
          maxime! Amet libero eos molestias alias ipsum temporibus quidem non in
          dolorum eligendi! Suscipit assumenda doloremque, praesentium itaque et
          rem.
          <Button
            variant="primary"
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3"
          >
            Xem Thêm
          </Button>
        </Col>

        <Col md={6}>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <img
              src={
                article.urlToImage ||
                "https://via.placeholder.com/800x400?text=No+Image"
              }
              alt={article.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </Col>
      </Row>

      {/* Hàng 2: Khối màu nổi bật phía dưới */}
      <Row className="gx-0">
        <Col
          md={12}
          style={{
            backgroundColor: "#ffeb00", // bạn có thể thay đổi màu tùy thích
            color: "#000",
            padding: "2rem",
          }}
        >
          <h4 style={{ fontWeight: "bold" }}>Tin liên quan</h4>
          <p>
            Ở đây bạn có thể thêm thông tin phụ, tóm tắt khác, hoặc bất kỳ nội
            dung nổi bật nào bạn muốn hiển thị dưới bài viết.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default NewsDetail;
