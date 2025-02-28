import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { Article } from "../types/Article";
import { useGetTopHeadlinesQuery } from "../services/newsApi";
import NewsItem from "./NewsItem";
import "../styles/NewsDetail.css";

const NewsDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [randomArticles, setRandomArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.article) {
      setLoading(true);
      setArticle(null);
      setTimeout(() => {
        setArticle(location.state.article);
        setLoading(false);
      }, 300);
    }
  }, [location.state]);

  const category = "general";
  const { data, error, isLoading } = useGetTopHeadlinesQuery({
    category,
    pageSize: 10,
  });

  useEffect(() => {
    if (data?.articles) {
      const filteredArticles = data.articles.filter(
        (a) => a.title !== article?.title
      );
      const shuffled = filteredArticles.sort(() => 0.5 - Math.random());
      setRandomArticles(shuffled.slice(0, 4));
    }
  }, [data, article]);

  if (loading) {
    return (
      <Container fluid className="my-5 text-center">
        <Spinner animation="border" />
        <h2 className="mt-2">Đang tải bài viết...</h2>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container fluid className="my-5">
        <h2>Không có dữ liệu bài báo</h2>
      </Container>
    );
  }

  return (
    <Container fluid className={`p-0 fade-in ${article ? "show" : ""}`}>
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
          laborum possimus voluptatem temporibus aut praesentium qui et at
          beatae. Accusantium accusamus a earum nihil culpa adipisci
          exercitationem ea non nostrum? Fuga temporibus ipsa earum ab! Incidunt
          consequatur delectus expedita itaque earum repellendus iusto
          necessitatibus qui, magnam omnis deleniti at ipsa veritatis cumque
          recusandae doloribus perspiciatis velit explicabo consequuntur libero
          consectetur! Veritatis consectetur laudantium vero eaque, ut, ad sequi
          labore voluptates amet consequuntur laborum tempora in, illo
          temporibus architecto quam delectus quidem adipisci accusantium? Quas
          similique ab sunt error corrupti velit? Velit dolorum beatae quae
          incidunt soluta sunt. Officiis, minus voluptatibus dolorum amet nulla
          vel, commodi mollitia nobis eveniet perspiciatis officia, aperiam
          voluptate qui velit asperiores quibusdam corrupti doloremque eius?
          Molestias? Nihil ut, nostrum fugiat quas nulla reprehenderit
          accusamus. Porro saepe soluta, facilis provident ratione veniam
          aperiam animi laudantium id consequatur repellat sapiente! Nulla
          quaerat expedita eligendi, dolorem eius placeat nobis. Laborum
          voluptatem dicta quia error eligendi maxime illo, nulla numquam
          adipisci quis laudantium ab magni ex autem architecto excepturi quasi
          necessitatibus exercitationem in? Doloribus laboriosam numquam non
          molestias voluptas rem! Nobis, impedit iusto corporis quos error
          corrupti iure quia quod dolorum vitae explicabo non recusandae animi
          cumque illum eaque eum, neque voluptatibus officiis obcaecati sit
          aperiam. Molestias dignissimos culpa reiciendis. Iure maxime ad
          reiciendis cupiditate, quidem corporis facere id quibusdam animi
          recusandae voluptas fugit. Dolor delectus nesciunt ipsam quaerat.
          Architecto fugiat libero, similique quas magni explicabo quo in velit
          sapiente. Laudantium illum vero dicta officia commodi nisi nulla ipsa?
          Dolores quos, voluptate soluta quasi praesentium necessitatibus animi
          fugit nulla veniam, sed eveniet ab numquam nesciunt harum ea laborum
          quisquam! Voluptate! Natus reprehenderit itaque molestias voluptatem
          rerum aut qui voluptatibus minus impedit magni? Quam non aliquid
          consequuntur tempore totam quod dolorum, minus assumenda blanditiis,
          eaque, rem atque dolorem iste. Autem, praesentium.
          <div className="d-flex gap-3 mt-3">
            <Button
              variant="secondary"
              onClick={() => navigate("/")} // Quay lại trang chủ
            >
              Quay lại
            </Button>

            <Button
              variant="primary"
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Xem Thêm
            </Button>
          </div>
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
      <Row className="gx-0 mt-4">
        <Col
          md={12}
          style={{ backgroundColor: "#ffeb00", color: "#000", padding: "2rem" }}
        >
          <h4 className="fw-bold">📰 Tin liên quan</h4>

          {isLoading && (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          )}

          {error && <p className="text-danger">Lỗi khi tải tin liên quan!</p>}

          {data?.articles && randomArticles.length > 0 ? (
            <Row className="d-flex flex-wrap justify-content-start">
              {randomArticles.map((relatedArticle, index) => (
                <Col key={index} md={3} sm={6} xs={12} className="mb-3">
                  <NewsItem
                    article={relatedArticle}
                    onAddFavorite={() => {}}
                    onClick={() =>
                      navigate("/news-detail", {
                        state: { article: relatedArticle },
                      })
                    }
                  />
                </Col>
              ))}
            </Row>
          ) : (
            !isLoading && <p>Không có tin liên quan</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default NewsDetail;
